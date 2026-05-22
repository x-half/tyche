import { SMA, EMA, RSI, MACD, BollingerBands, ATR, ADX } from './indicators.js';
import type { KlineInput } from './indicators.js';

export interface Signal {
  action: 'buy' | 'sell' | 'close' | 'hold';
  confidence: number;
  reason: string;
  price: number;
}

export interface StrategyConfig {
  id: string;
  name: string;
  enabled: boolean;
  symbol: string;
  timeframe: string;
  params: Record<string, any>;
}

export function getDefaultStrategies(): StrategyConfig[] {
  return [
    { id: 'ma_cross', name: '双均线交叉', enabled: false, symbol: 'BTC/USDT:USDT', timeframe: '1h', params: { fastPeriod: 9, slowPeriod: 21 } },
    { id: 'bb_reversion', name: '布林带均值回归', enabled: false, symbol: 'BTC/USDT:USDT', timeframe: '1h', params: { bbPeriod: 20, bbMultiplier: 2, rsiPeriod: 14, rsiOversold: 30, rsiOverbought: 70 } },
    { id: 'grid', name: '网格交易', enabled: false, symbol: 'BTC/USDT:USDT', timeframe: '15m', params: { gridCount: 10, upperPrice: 0, lowerPrice: 0, totalAmount: 0.01 } },
    { id: 'adx_trend', name: 'ADX趋势跟踪', enabled: false, symbol: 'BTC/USDT:USDT', timeframe: '1h', params: { adxPeriod: 14, adxThreshold: 25 } },
  ];
}

type PositionInfo = { size: number; entryPrice: number } | null;

export function evaluateStrategy(config: StrategyConfig, klines: KlineInput, position: PositionInfo): Signal {
  const close = klines.map(k => k.close);
  const last = klines[klines.length - 1];
  const prev = klines.length > 1 ? klines[klines.length - 2] : last;

  switch (config.id) {
    case 'ma_cross': return evaluateMaCross(close, last, config.params);
    case 'bb_reversion': return evaluateBBReversion(klines, last, config.params);
    case 'grid': return evaluateGrid(last, config.params, position);
    case 'adx_trend': return evaluateAdxTrend(klines, last, config.params);
    default: return { action: 'hold', confidence: 0, reason: '未知策略', price: last.close };
  }
}

function evaluateMaCross(close: number[], last: KlineInput[0], params: any): Signal {
  const fast = params.fastPeriod || 9;
  const slow = params.slowPeriod || 21;
  const maFast = SMA(close, fast);
  const maSlow = SMA(close, slow);
  const fv = maFast[maFast.length - 1];
  const sv = maSlow[maSlow.length - 1];
  const fv_1 = maFast[maFast.length - 2];
  const sv_1 = maSlow[maSlow.length - 2];
  if (fv === null || sv === null || fv_1 === null || sv_1 === null) return { action: 'hold', confidence: 0, reason: '等待数据', price: last.close };
  if (fv_1 <= sv_1 && fv > sv) return { action: 'buy', confidence: 75, reason: `快线(${fast})上穿慢线(${slow})`, price: last.close };
  if (fv_1 >= sv_1 && fv < sv) return { action: 'sell', confidence: 75, reason: `快线(${fast})下穿慢线(${slow})`, price: last.close };
  if (fv > sv) return { action: 'hold', confidence: 50, reason: `多头趋势中 MA${fast}:${fv!.toFixed(1)} MA${slow}:${sv!.toFixed(1)}`, price: last.close };
  return { action: 'hold', confidence: 30, reason: `空头趋势中 MA${fast}:${fv!.toFixed(1)} MA${slow}:${sv!.toFixed(1)}`, price: last.close };
}

function evaluateBBReversion(klines: KlineInput, last: KlineInput[0], params: any): Signal {
  const close = klines.map(k => k.close);
  const period = params.bbPeriod || 20;
  const mult = params.bbMultiplier || 2;
  const rsiPeriod = params.rsiPeriod || 14;
  const oversold = params.rsiOversold || 30;
  const overbought = params.rsiOverbought || 70;
  const bb = BollingerBands(close, period, mult);
  const rsiVals = RSI(close, rsiPeriod);
  const lastBB = bb[bb.length - 1];
  const lastRSI = rsiVals[rsiVals.length - 1];
  if (!lastBB || lastRSI === null) return { action: 'hold', confidence: 0, reason: '等待数据', price: last.close };
  if (last.close <= lastBB.lower && lastRSI <= oversold) return { action: 'buy', confidence: 80, reason: `触下轨(RSI ${lastRSI.toFixed(1)})`, price: last.close };
  if (last.close >= lastBB.upper && lastRSI >= overbought) return { action: 'sell', confidence: 80, reason: `触上轨(RSI ${lastRSI.toFixed(1)})`, price: last.close };
  return { action: 'hold', confidence: 40, reason: `BB中轨 ${lastBB.middle.toFixed(1)}`, price: last.close };
}

function evaluateGrid(last: KlineInput[0], params: any, position: PositionInfo): Signal {
  const upper = params.upperPrice;
  const lower = params.lowerPrice;
  const count = params.gridCount || 10;
  if (!upper || !lower || upper <= lower) return { action: 'hold', confidence: 0, reason: '请设置网格上下限', price: last.close };
  const gridSize = (upper - lower) / count;
  const price = last.close;
  if (position && position.size > 0) {
    const gridIndex = Math.floor((price - lower) / gridSize);
    const entryGrid = Math.floor((position.entryPrice - lower) / gridSize);
    if (gridIndex > entryGrid) return { action: 'sell', confidence: 70, reason: `网格获利, 区间 ${gridIndex + 1}`, price };
  } else {
    if (price >= lower && price <= upper) return { action: 'buy', confidence: 60, reason: `进入网格区间 ${Math.floor((price - lower) / gridSize) + 1}/${count}`, price };
  }
  return { action: 'hold', confidence: 20, reason: price > upper ? '价格超出网格上限' : '价格低于网格下限', price };
}

function evaluateAdxTrend(klines: KlineInput, last: KlineInput[0], params: any): Signal {
  const period = params.adxPeriod || 14;
  const threshold = params.adxThreshold || 25;
  const adxVals = ADX(klines, period);
  const lastADX = adxVals[adxVals.length - 1];
  if (lastADX === null) return { action: 'hold', confidence: 0, reason: '等待数据', price: last.close };
  const close = klines.map(k => k.close);
  const emaShort = EMA(close, 9);
  const emaLong = EMA(close, 21);
  const es = emaShort[emaShort.length - 1];
  const el = emaLong[emaLong.length - 1];
  if (es === null || el === null) return { action: 'hold', confidence: 0, reason: '等待数据', price: last.close };
  if (lastADX > threshold && es > el) return { action: 'buy', confidence: 70, reason: `ADX ${lastADX.toFixed(1)} 强趋势+多头`, price: last.close };
  if (lastADX > threshold && es < el) return { action: 'sell', confidence: 70, reason: `ADX ${lastADX.toFixed(1)} 强趋势+空头`, price: last.close };
  return { action: 'hold', confidence: 25, reason: `ADX ${lastADX.toFixed(1)} 趋势不明`, price: last.close };
}

export function generateSignals(strategies: StrategyConfig[], klinesMap: Record<string, KlineInput[]>, positions: Record<string, PositionInfo>): Record<string, Signal[]> {
  const result: Record<string, Signal[]> = {};
  for (const s of strategies) {
    if (!s.enabled) continue;
    const key = `${s.symbol}_${s.timeframe}`;
    const data = klinesMap[key];
    if (!data || data.length < 50) continue;
    const pos = positions[s.symbol] || null;
    if (!result[s.symbol]) result[s.symbol] = [];
    result[s.symbol].push(evaluateStrategy(s, data, pos));
  }
  return result;
}
