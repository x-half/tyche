import type { StrategyConfig } from './strategies.js';
import { evaluateStrategy } from './strategies.js';
import type { KlineInput } from './indicators.js';

const INITIAL_CAPITAL = 10000;
const FEE_RATE = 0.0005;

export interface BacktestTrade {
  time: number;
  side: 'buy' | 'sell';
  price: number;
  size: number;
  pnl: number;
  reason: string;
}

export interface BacktestResult {
  strategy: string;
  symbol: string;
  timeframe: string;
  startTime: number;
  endTime: number;
  initialCapital: number;
  finalCapital: number;
  totalReturn: number;
  annualizedReturn: number;
  totalTrades: number;
  winCount: number;
  winRate: number;
  maxDrawdown: number;
  sharpeRatio: number;
  trades: BacktestTrade[];
  equity: { time: number; value: number }[];
}

export function runBacktest(config: StrategyConfig, klines: KlineInput): BacktestResult {
  let cash = INITIAL_CAPITAL;
  let position = 0;
  let entryPrice = 0;
  let peak = INITIAL_CAPITAL;
  let maxDrawdown = 0;
  let totalPnl = 0;
  let winCount = 0;
  let lossCount = 0;
  const trades: BacktestTrade[] = [];
  const equity: { time: number; value: number }[] = [];
  const dailyReturns: number[] = [];
  let prevEquity = INITIAL_CAPITAL;

  for (let i = 50; i < klines.length; i++) {
    const slice = klines.slice(0, i + 1);
    const k = klines[i];
    const posInfo = position > 0 ? { size: position, entryPrice } : null;

    const signal = evaluateStrategy(config, slice, posInfo);

    if (signal.action === 'buy' && position === 0) {
      const cost = cash * (1 - FEE_RATE);
      position = cost / k.close;
      entryPrice = k.close;
      cash = 0;
      trades.push({ time: k.timestamp, side: 'buy', price: k.close, size: position, pnl: 0, reason: signal.reason });
    } else if (signal.action === 'sell' && position > 0) {
      const proceeds = position * k.close * (1 - FEE_RATE);
      const pnl = proceeds - (position * entryPrice);
      cash = proceeds;
      position = 0;
      totalPnl += pnl;
      trades.push({ time: k.timestamp, side: 'sell', price: k.close, size: 0, pnl, reason: signal.reason });
      if (pnl > 0) winCount++; else lossCount++;
    }

    const currentEquity = cash + position * k.close;
    equity.push({ time: k.timestamp, value: currentEquity });

    const dailyReturn = (currentEquity - prevEquity) / prevEquity;
    if (i > 50) dailyReturns.push(dailyReturn);
    prevEquity = currentEquity;

    if (currentEquity > peak) peak = currentEquity;
    const dd = (peak - currentEquity) / peak;
    if (dd > maxDrawdown) maxDrawdown = dd;
  }

  const finalEquity = cash + position * klines[klines.length - 1].close;
  const totalReturn = (finalEquity - INITIAL_CAPITAL) / INITIAL_CAPITAL;
  const totalDays = (klines[klines.length - 1].timestamp - klines[50].timestamp) / (1000 * 60 * 60 * 24);
  const annualizedReturn = totalDays > 0 ? Math.pow(1 + totalReturn, 365 / totalDays) - 1 : 0;

  const avgReturn = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
  const variance = dailyReturns.reduce((a, b) => a + (b - avgReturn) ** 2, 0) / dailyReturns.length;
  const stdDev = Math.sqrt(variance);
  const sharpeRatio = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(365) : 0;

  return {
    strategy: config.name,
    symbol: config.symbol,
    timeframe: config.timeframe,
    startTime: klines[0].timestamp,
    endTime: klines[klines.length - 1].timestamp,
    initialCapital: INITIAL_CAPITAL,
    finalCapital: finalEquity,
    totalReturn,
    annualizedReturn,
    totalTrades: trades.length,
    winCount,
    winRate: trades.length > 0 ? winCount / (winCount + lossCount) : 0,
    maxDrawdown,
    sharpeRatio,
    trades,
    equity,
  };
}
