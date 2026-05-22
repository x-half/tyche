import { DatabaseSync } from 'node:sqlite';
import { join } from 'path';

const DATA_DIR = join(import.meta.dirname, '..', 'data');
const db = new DatabaseSync(join(DATA_DIR, 'tyche-quant.db'));

db.exec(`CREATE TABLE IF NOT EXISTS klines (
  symbol TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  open REAL NOT NULL,
  high REAL NOT NULL,
  low REAL NOT NULL,
  close REAL NOT NULL,
  volume REAL NOT NULL,
  PRIMARY KEY (symbol, timeframe, timestamp)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  symbol TEXT NOT NULL,
  side TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'market',
  price REAL NOT NULL,
  amount REAL NOT NULL,
  filled REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'open',
  strategy TEXT NOT NULL DEFAULT '',
  pnl REAL NOT NULL DEFAULT 0,
  timestamp INTEGER NOT NULL
)`);

export function saveKlines(klines: { symbol: string; timeframe: string; timestamp: number; open: number; high: number; low: number; close: number; volume: number }[]) {
  const stmt = db.prepare(`INSERT OR REPLACE INTO klines (symbol, timeframe, timestamp, open, high, low, close, volume) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  db.exec('BEGIN');
  try {
    for (const k of klines) stmt.run(k.symbol, k.timeframe, k.timestamp, k.open, k.high, k.low, k.close, k.volume);
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
}

export function getKlines(symbol: string, timeframe: string, limit = 500): any[] {
  return db.prepare(`SELECT * FROM klines WHERE symbol = ? AND timeframe = ? ORDER BY timestamp DESC LIMIT ?`).all(symbol, timeframe, limit).reverse();
}

export function getLastKline(symbol: string, timeframe: string): any | undefined {
  return db.prepare(`SELECT * FROM klines WHERE symbol = ? AND timeframe = ? ORDER BY timestamp DESC LIMIT 1`).get(symbol, timeframe) || undefined;
}

export function saveOrder(order: any) {
  db.prepare(`INSERT OR REPLACE INTO orders (id, symbol, side, type, price, amount, filled, status, strategy, pnl, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(order.id, order.symbol, order.side, order.type, order.price, order.amount, order.filled, order.status, order.strategy, order.pnl, order.timestamp);
}

export function getOrders(strategy?: string, limit = 100): any[] {
  if (strategy) return db.prepare(`SELECT * FROM orders WHERE strategy = ? ORDER BY timestamp DESC LIMIT ?`).all(strategy, limit);
  return db.prepare(`SELECT * FROM orders ORDER BY timestamp DESC LIMIT ?`).all(limit);
}

export function getLatestKlineTime(symbol: string, timeframe: string): number {
  const row: any = db.prepare(`SELECT MAX(timestamp) as t FROM klines WHERE symbol = ? AND timeframe = ?`).get(symbol, timeframe);
  return row?.t || 0;
}

export default db;
