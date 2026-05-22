import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { saveKlines, getLatestKlineTime } from './db.js';
import type { Kline } from '../src/types.js';
import crypto from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const PROXY_URL = 'socks5h://127.0.0.1:1080';
const SOCKS_AGENT = new SocksProxyAgent(PROXY_URL);

const ax = axios.create({
  httpsAgent: SOCKS_AGENT,
  proxy: false,
  timeout: 15000,
});

function loadConfig() {
  const envPath = join(import.meta.dirname, '..', '.env');
  if (!existsSync(envPath)) return {};
  const lines = readFileSync(envPath, 'utf-8').split('\n').filter(Boolean);
  const cfg: Record<string, string> = {};
  for (const l of lines) {
    const [k, ...v] = l.split('=');
    if (k && !k.startsWith('#')) cfg[k.trim()] = v.join('=').trim();
  }
  return cfg;
}

async function okxGet(path: string): Promise<any> {
  const cfg = loadConfig();
  if (!cfg.OKX_API_KEY) return [];
  const ts = new Date().toISOString();
  const sign = crypto.createHmac('sha256', cfg.OKX_SECRET_KEY || '').update(ts + 'GET' + path + '').digest('base64');
  try {
    const resp = await ax.get(`https://www.okx.com${path}`, {
      headers: { 'OK-ACCESS-KEY': cfg.OKX_API_KEY, 'OK-ACCESS-SIGN': sign, 'OK-ACCESS-TIMESTAMP': ts, 'OK-ACCESS-PASSPHRASE': cfg.OKX_PASSPHRASE || '' },
    });
    return resp.data?.data || [];
  } catch { return []; }
}

function toOkxSymbol(symbol: string): string {
  return symbol.replace('/', '-').replace(':USDT', '-SWAP');
}

function validateKline(k: any): boolean {
  if (!Array.isArray(k) || k.length < 6) return false;
  const [, o, h, l, c, v] = k.map(Number);
  if (isNaN(o) || isNaN(h) || isNaN(l) || isNaN(c) || isNaN(v)) return false;
  if (h < o || h < c || l > o || l > c || v < 0) return false;
  if (h === l && o === c && v === 0) return false;
  return true;
}

function ohlcvToKlines(raw: any[], symbol: string, timeframe: string): Kline[] {
  return raw.filter(validateKline).map(k => ({
    symbol,
    timeframe,
    timestamp: k[0],
    open: k[1],
    high: k[2],
    low: k[3],
    close: k[4],
    volume: k[5],
  }));
}

function toOkxBar(timeframe: string): string {
  const map: Record<string, string> = { '1m': '1m', '5m': '5m', '15m': '15m', '30m': '30m', '1h': '1H', '4h': '4H', '1d': '1D', '1w': '1W' };
  return map[timeframe] || '1H';
}

export async function syncKlines(symbol: string, timeframe: string, force = false): Promise<Kline[]> {
  const okxSymbol = toOkxSymbol(symbol);
  const bar = toOkxBar(timeframe);
  const since = force ? undefined : getLatestKlineTime(symbol, timeframe);
  const limit = force ? 300 : 100;

  let url = `https://www.okx.com/api/v5/market/candles?instId=${okxSymbol}&bar=${bar}&limit=${limit}`;
  if (since > 0) url += `&after=${since}`;

  try {
    const resp = await ax.get(url);
    const data = resp.data?.data;
    if (!Array.isArray(data)) return [];

    const klines = ohlcvToKlines(data, symbol, timeframe);
    if (klines.length > 0) saveKlines(klines);
    return klines;
  } catch (e: any) {
    console.error(`[Exchange] fetchOHLCV failed: ${e.message}`);
    return [];
  }
}

export async function fetchLatestPrice(symbol: string): Promise<number> {
  const okxSymbol = toOkxSymbol(symbol);
  try {
    const resp = await ax.get(`https://www.okx.com/api/v5/market/ticker?instId=${okxSymbol}`);
    return parseFloat(resp.data?.data?.[0]?.last || '0');
  } catch {
    return 0;
  }
}

export async function fetchPositions(): Promise<any[]> {
  return (await okxGet('/api/v5/account/positions')).map((p: any) => ({
    symbol: p.instId || '',
    size: parseFloat(p.pos || '0'),
    entryPrice: parseFloat(p.avgPx || '0'),
    markPrice: parseFloat(p.markPx || '0'),
    unrealizedPnl: parseFloat(p.upl || '0'),
    margin: parseFloat(p.margin || '0'),
    leverage: parseFloat(p.lever || '1'),
  }));
}

export async function fetchBalance(): Promise<{ totalEquity: number; currency: string; details: { ccy: string; eq: number; availEq: number; cashBal: number; frozenBal: number }[] }> {
  const data = await okxGet('/api/v5/account/balance');
  const acct = data?.[0];
  if (!acct) return { totalEquity: 0, currency: 'USDT', details: [] };
  const details = (acct.details || []).map((d: any) => ({
    ccy: d.ccy || '',
    eq: parseFloat(d.eq || '0'),
    availEq: parseFloat(d.availEq || '0'),
    cashBal: parseFloat(d.cashBal || '0'),
    frozenBal: parseFloat(d.frozenBal || '0'),
  }));
  const total = details.reduce((s: number, d: any) => s + d.cashBal, 0);
  return { totalEquity: total, currency: 'USDT', details };
}

export async function fetchOrders(limit = 20): Promise<any[]> {
  return (await okxGet(`/api/v5/trade/orders-history?instType=SWAP&limit=${limit}`)).map((o: any) => ({
    id: o.ordId || '',
    symbol: o.instId || '',
    side: o.side || '',
    price: parseFloat(o.px || '0'),
    amount: parseFloat(o.sz || '0'),
    filled: parseFloat(o.accFillSz || '0'),
    status: o.state || '',
    pnl: parseFloat(o.pnl || '0'),
    fee: parseFloat(o.fee || '0'),
    strategy: '',
    timestamp: parseFloat(o.cTime || '0'),
  }));
}

export async function fetchDailyPnl(): Promise<number> {
  const [orders, positions] = await Promise.all([fetchOrders(100), fetchPositions()]);
  const todayStart = new Date(); todayStart.setUTCHours(0,0,0,0);
  const realized = orders.filter((o: any) => o.timestamp >= todayStart.getTime() && o.status === 'filled').reduce((s: number, o: any) => s + (o.pnl || 0), 0);
  const unrealized = positions.reduce((s: number, p: any) => s + (p.unrealizedPnl || 0), 0);
  return realized + unrealized;
}

export async function placeOrder(symbol: string, side: 'buy' | 'sell', amount: number): Promise<any> {
  const cfg = loadConfig();
  const okxSymbol = toOkxSymbol(symbol);
  const timestamp = new Date().toISOString();
  const body = JSON.stringify({ instId: okxSymbol, tdMode: 'cross', side, ordType: 'market', sz: String(amount) });
  const sign = createSign(timestamp, 'POST', '/api/v5/trade/order', body, cfg.OKX_SECRET_KEY || '');
  try {
    const resp = await ax.post('https://www.okx.com/api/v5/trade/order', body, {
      headers: {
        'OK-ACCESS-KEY': cfg.OKX_API_KEY,
        'OK-ACCESS-SIGN': sign,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': cfg.OKX_PASSPHRASE || '',
        'Content-Type': 'application/json',
      },
    });
    return resp.data?.data?.[0] || resp.data;
  } catch (e: any) {
    console.error(`[Exchange] Order failed: ${e.response?.data || e.message}`);
    throw e;
  }
}

export function validateKlineData(klines: Kline[]): { valid: boolean; gaps: number; anomalies: number } {
  let gaps = 0, anomalies = 0;
  for (let i = 1; i < klines.length; i++) {
    const expected = klines[i - 1].timestamp + 60000 * barMs(klines[i - 1].timeframe);
    if (klines[i].timestamp > expected + 1000) gaps++;
  }
  return { valid: gaps === 0 && anomalies === 0, gaps, anomalies };
}

function barMs(timeframe: string): number {
  const map: Record<string, number> = { '1m': 1, '5m': 5, '15m': 15, '30m': 30, '1h': 60, '4h': 240, '1d': 1440 };
  return map[timeframe] || 60;
}
