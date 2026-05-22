import { Router } from 'express';
import { getKlines, saveKlines, getOrders } from './db.js';
import { syncKlines, fetchLatestPrice, validateKlineData, fetchBalance, fetchPositions, fetchOrders, fetchDailyPnl } from './exchange.js';
import { computeIndicators } from './indicators.js';
import { getDefaultStrategies, evaluateStrategy, generateSignals } from './strategies.js';
import type { StrategyConfig } from './strategies.js';
import { runBacktest } from './backtest.js';
import { startTrader, stopTrader, getTraderState, updateTraderConfig, executeTick } from './trader.js';

const router = Router();
let strategies = getDefaultStrategies();

router.get('/status', async (req, res) => {
  const trader = getTraderState();
  const dailyPnl = await fetchDailyPnl();
  res.json({ ok: true, trader: { running: trader.running, dailyPnL: dailyPnl, consecutiveLosses: trader.consecutiveLosses } });
});

router.get('/klines', (req, res) => {
  const { symbol = 'BTC/USDT:USDT', timeframe = '1h', limit = '200' } = req.query as any;
  const data = getKlines(symbol, timeframe, parseInt(limit));
  res.json(data);
});

router.post('/sync', async (req, res) => {
  const { symbol = 'BTC/USDT:USDT', timeframe = '1h' } = req.body || {};
  try {
    const klines = await syncKlines(symbol, timeframe);
    const data = getKlines(symbol, timeframe, 500);
    const validation = validateKlineData(data);
    res.json({ synced: klines.length, total: data.length, validation });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/strategies', (req, res) => {
  res.json(strategies);
});

router.post('/strategies', (req, res) => {
  strategies = req.body;
  res.json({ ok: true, count: strategies.length });
});

router.post('/backtest', (req, res) => {
  const { strategyId } = req.body || {};
  const config = strategies.find(s => s.id === strategyId);
  if (!config) return res.status(400).json({ error: '策略未找到' });
  const klines = getKlines(config.symbol, config.timeframe, 1000) as any;
  if (klines.length < 100) return res.status(400).json({ error: `数据不足, 当前${klines.length}根, 需要100根` });
  const result = runBacktest(config, klines);
  res.json(result);
});

router.get('/signals', (req, res) => {
  const signals: any[] = [];
  const klinesMap: Record<string, any[]> = {};
  const positions: Record<string, any> = {};
  for (const s of strategies) {
    if (!s.enabled) continue;
    const key = `${s.symbol}_${s.timeframe}`;
    if (!klinesMap[key]) klinesMap[key] = getKlines(s.symbol, s.timeframe, 200) as any;
    const data = klinesMap[key];
    if (!data || data.length < 50) continue;
    const pos = { size: 0, entryPrice: 0 };
    const signal = evaluateStrategy(s, data, null);
    signals.push({ strategy: s.id, name: s.name, symbol: s.symbol, signal, timestamp: Date.now() });
  }
  res.json(signals);
});

router.get('/indicators', (req, res) => {
  const { symbol = 'BTC/USDT:USDT', timeframe = '1h', limit = '300' } = req.query as any;
  const klines = getKlines(symbol, timeframe, parseInt(limit)) as any;
  if (klines.length < 30) return res.json({ error: '数据不足' });
  const indicators = computeIndicators(klines);
  res.json(indicators);
});

router.post('/trader/start', (req, res) => {
  const enabled = strategies.filter(s => s.enabled);
  if (enabled.length === 0) return res.status(400).json({ error: '没有启用的策略' });
  startTrader(strategies);
  res.json({ ok: true, strategies: enabled.length });
});

router.post('/trader/stop', (req, res) => {
  stopTrader();
  res.json({ ok: true });
});

router.get('/trader/status', (req, res) => {
  const state = getTraderState();
  res.json(state);
});

router.post('/trader/config', (req, res) => {
  updateTraderConfig(req.body);
  res.json({ ok: true });
});

router.post('/tick', async (req, res) => {
  await executeTick(strategies);
  res.json({ ok: true });
});

router.get('/price', async (req, res) => {
  const { symbol = 'BTC/USDT:USDT' } = req.query as any;
  try {
    const price = await fetchLatestPrice(symbol);
    res.json({ symbol, price });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/balance', async (req, res) => {
  try {
    const balance = await fetchBalance();
    res.json(balance);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/orders', async (req, res) => {
  const { limit = '20' } = req.query as any;
  const orders = await fetchOrders(parseInt(limit));
  res.json(orders);
});

router.get('/positions', async (req, res) => {
  try {
    const pos = await fetchPositions();
    res.json(pos.map((p: any) => ({
      symbol: p.instId || p.symbol,
      size: parseFloat(p.pos || p.size || '0'),
      entryPrice: parseFloat(p.avgPx || p.entryPrice || '0'),
      markPrice: parseFloat(p.markPx || '0'),
      unrealizedPnl: parseFloat(p.upl || '0'),
      margin: parseFloat(p.margin || '0'),
      leverage: parseFloat(p.lever || '1'),
    })));
  } catch {
    res.json([]);
  }
});

export default router;
