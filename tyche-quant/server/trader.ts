import { placeOrder, fetchPositions, fetchLatestPrice, syncKlines } from './exchange.js';
import { saveOrder, getOrders } from './db.js';
import type { Signal, StrategyConfig } from './strategies.js';
import { evaluateStrategy } from './strategies.js';
import { getKlines } from './db.js';
import type { KlineInput } from './indicators.js';

export interface TraderState {
  running: boolean;
  dailyPnL: number;
  consecutiveLosses: number;
  dailyLossLimit: number;
  maxConsecutiveLosses: number;
  positions: Record<string, { size: number; entryPrice: number }>;
  lastPrices: Record<string, number>;
  intervalId?: ReturnType<typeof setInterval>;
}

let state: TraderState = {
  running: false,
  dailyPnL: 0,
  consecutiveLosses: 0,
  dailyLossLimit: -200,
  maxConsecutiveLosses: 3,
  positions: {},
  lastPrices: {},
};

export function getTraderState() { return state; }

export function updateTraderConfig(config: Partial<Pick<TraderState, 'dailyLossLimit' | 'maxConsecutiveLosses'>>) {
  Object.assign(state, config);
}

async function refreshPositions() {
  try {
    const pos = await fetchPositions();
    state.positions = {};
    for (const p of pos) {
      const size = parseFloat(p.contracts || p.size || 0);
      if (size !== 0) {
        state.positions[p.symbol] = { size, entryPrice: parseFloat(p.entryPrice || p.price || 0) };
      }
    }
  } catch {
    // positions refresh failed, keep cached
  }
}

async function checkExistingPositions(strategies: StrategyConfig[]) {
  for (const s of strategies) {
    if (!s.enabled) continue;
    const pos = state.positions[s.symbol];
    if (pos && pos.size !== 0) continue;
    const lastOrders = getOrders(s.id, 5);
    const recentBuy = lastOrders.find((o: any) => o.side === 'buy' && o.status === 'filled' && o.strategy === s.id);
    if (recentBuy) {
      state.positions[s.symbol] = { size: recentBuy.amount, entryPrice: recentBuy.price };
    }
  }
}

export async function executeTick(strategies: StrategyConfig[]) {
  if (!state.running) return;
  await refreshPositions();
  await checkExistingPositions(strategies);

  for (const s of strategies) {
    if (!s.enabled) continue;

    const klines: KlineInput = getKlines(s.symbol, s.timeframe, 200) as any;
    if (klines.length < 50) {
      console.log(`[Trader] ${s.id}: 数据不足 ${klines.length}`);
      continue;
    }

    const pos = state.positions[s.symbol] || null;
    const signal = evaluateStrategy(s, klines, pos ? { size: pos.size, entryPrice: pos.entryPrice } : null);

    if (signal.action === 'hold') continue;

    const currentPrice = await fetchLatestPrice(s.symbol);
    if (!currentPrice) continue;

    const riskCheck = riskCheckSignal(s.symbol, signal, currentPrice, pos);
    if (!riskCheck.allowed) {
      console.log(`[Trader] ${s.id}: 风控拒绝 - ${riskCheck.reason}`);
      continue;
    }

    if (signal.action === 'close' && pos && pos.size !== 0) {
      const side = pos.size > 0 ? 'sell' : 'buy';
      try {
        const order = await placeOrder(s.symbol, side, Math.abs(pos.size));
        const pnl = (currentPrice - pos.entryPrice) * pos.size;
        state.dailyPnL += pnl;
        saveOrder({ id: order.id, symbol: s.symbol, side: order.side, type: 'market', price: currentPrice, amount: Math.abs(pos.size), filled: Math.abs(pos.size), status: 'filled', strategy: s.id, pnl, timestamp: Date.now() });
        delete state.positions[s.symbol];
        if (pnl < 0) state.consecutiveLosses++; else state.consecutiveLosses = 0;
        console.log(`[Trader] ${s.id}: 平仓 ${signal.action} ${Math.abs(pos.size)} @ ${currentPrice} PnL: ${pnl.toFixed(2)}`);
      } catch (e: any) {
        console.error(`[Trader] ${s.id}: 平仓失败 ${e.message}`);
      }
      continue;
    }

    if ((signal.action === 'buy' || signal.action === 'sell') && (!pos || pos.size === 0)) {
      const amount = riskCheck.amount;
      if (amount <= 0) continue;
      try {
        const order = await placeOrder(s.symbol, signal.action, amount);
        saveOrder({ id: order.id, symbol: s.symbol, side: order.side, type: 'market', price: currentPrice, amount, filled: amount, status: 'filled', strategy: s.id, pnl: 0, timestamp: Date.now() });
        state.positions[s.symbol] = { size: signal.action === 'buy' ? amount : -amount, entryPrice: currentPrice };
        console.log(`[Trader] ${s.id}: 开仓 ${signal.action} ${amount} @ ${currentPrice}`);
      } catch (e: any) {
        console.error(`[Trader] ${s.id}: 开仓失败 ${e.message}`);
      }
    }
  }
}

function riskCheckSignal(symbol: string, signal: Signal, price: number, pos: { size: number; entryPrice: number } | null): { allowed: boolean; reason: string; amount: number } {
  if (state.dailyPnL <= state.dailyLossLimit) return { allowed: false, reason: `达到日亏限制 ${state.dailyPnL.toFixed(2)}`, amount: 0 };
  if (state.consecutiveLosses >= state.maxConsecutiveLosses) return { allowed: false, reason: `连续亏损${state.consecutiveLosses}次`, amount: 0 };
  if (signal.action === 'close' && pos) return { allowed: true, reason: '', amount: Math.abs(pos.size) };
  if (signal.action === 'buy' || signal.action === 'sell') {
    const amount = 0.001;
    return { allowed: true, reason: '', amount };
  }
  return { allowed: false, reason: '无操作', amount: 0 };
}

export function startTrader(strategies: StrategyConfig[]) {
  if (state.running) return;
  state.running = true;
  console.log('[Trader] 启动');
  executeTick(strategies);
  state.intervalId = setInterval(() => executeTick(strategies), 60 * 1000);
}

export function stopTrader() {
  state.running = false;
  if (state.intervalId) clearInterval(state.intervalId);
  state.intervalId = undefined;
  console.log('[Trader] 停止');
}
