const BASE = '/api';

async function get(path: string) {
  const r = await fetch(`${BASE}${path}`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function post(path: string, body?: any) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export const api = {
  status: () => get('/status'),
  getKlines: (symbol?: string, timeframe?: string, limit?: number) =>
    get(`/klines?symbol=${symbol || 'BTC/USDT:USDT'}&timeframe=${timeframe || '1h'}&limit=${limit || 300}`),
  sync: (symbol?: string, timeframe?: string) => post('/sync', { symbol, timeframe }),
  getStrategies: () => get('/strategies'),
  saveStrategies: (strategies: any[]) => post('/strategies', strategies),
  runBacktest: (strategyId: string) => post('/backtest', { strategyId }),
  getSignals: () => get('/signals'),
  getIndicators: (symbol?: string, timeframe?: string) =>
    get(`/indicators?symbol=${symbol || 'BTC/USDT:USDT'}&timeframe=${timeframe || '1h'}`),
  traderStart: () => post('/trader/start'),
  traderStop: () => post('/trader/stop'),
  traderStatus: () => get('/trader/status'),
  traderConfig: (cfg: any) => post('/trader/config', cfg),
  tick: () => post('/tick'),
  getPrice: (symbol?: string) => get(`/price?symbol=${symbol || 'BTC/USDT:USDT'}`),
  getBalance: () => get('/balance'),
  getOrders: (strategy?: string) => get(`/orders${strategy ? `?strategy=${strategy}` : ''}`),
  getPositions: () => get('/positions'),
};
