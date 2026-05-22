export interface Kline {
  symbol: string;
  timeframe: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Order {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  price: number;
  amount: number;
  filled: number;
  status: 'open' | 'filled' | 'canceled' | 'failed';
  strategy: string;
  timestamp: number;
}

export interface StrategyParams {
  enabled: boolean;
  symbol: string;
  timeframe: string;
  [key: string]: any;
}

export interface Signal {
  action: 'buy' | 'sell' | 'close' | 'hold';
  price: number;
  confidence: number;
  reason: string;
  meta?: Record<string, any>;
}

export interface BacktestResult {
  strategy: string;
  symbol: string;
  timeframe: string;
  startTime: number;
  endTime: number;
  totalTrades: number;
  winRate: number;
  totalReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  trades: { time: number; side: string; price: number; pnl: number }[];
  equity: { time: number; value: number }[];
}

export interface RiskConfig {
  maxPositionSize: number;
  maxDailyLoss: number;
  maxLeverage: number;
  stopLossPct: number;
  takeProfitPct: number;
}

export interface Position {
  symbol: string;
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPct: number;
  strategy: string;
  timestamp: number;
}
