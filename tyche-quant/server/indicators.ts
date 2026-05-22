export interface IndicatorValue {
  time: number;
  value: number;
}

export interface BBValue {
  time: number;
  upper: number;
  middle: number;
  lower: number;
}

export interface MACDValue {
  time: number;
  macd: number;
  signal: number;
  histogram: number;
}

export type KlineInput = { timestamp: number; open: number; high: number; low: number; close: number; volume: number }[];

export function SMA(data: number[], period: number): (number | null)[] {
  const result: (number | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) { result.push(null); continue; }
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) sum += data[j];
    result.push(sum / period);
  }
  return result;
}

export function EMA(data: number[], period: number): (number | null)[] {
  const result: (number | null)[] = [];
  const k = 2 / (period + 1);
  let ema = data[0];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) { ema = data[0]; result.push(ema); continue; }
    ema = data[i] * k + ema * (1 - k);
    result.push(ema);
  }
  return result;
}

export function RSI(data: number[], period = 14): (number | null)[] {
  const result: (number | null)[] = [null];
  let avgGain = 0, avgLoss = 0;
  for (let i = 1; i <= period; i++) {
    const diff = data[i] - data[i - 1];
    if (diff >= 0) avgGain += diff; else avgLoss -= diff;
  }
  avgGain /= period; avgLoss /= period;
  result.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));
  for (let i = period + 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];
    const gain = diff >= 0 ? diff : 0;
    const loss = diff < 0 ? -diff : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    result.push(avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss));
  }
  return result;
}

export function MACD(data: number[], fast = 12, slow = 26, signal = 9): ({ macd: number; signal: number; histogram: number } | null)[] {
  const emaFast = EMA(data, fast);
  const emaSlow = EMA(data, slow);
  const macdLine = emaFast.map((f, i) => f !== null && emaSlow[i] !== null ? f - emaSlow[i]! : null);
  const signalLine = EMA(macdLine.filter((v): v is number => v !== null), signal);
  let sigIdx = 0;
  return macdLine.map((m, i) => {
    if (m === null) return null;
    const sig = signalLine[sigIdx] ?? 0;
    sigIdx++;
    return { macd: m, signal: sig, histogram: m - sig };
  });
}

export function BollingerBands(data: number[], period = 20, multiplier = 2): ({ upper: number; middle: number; lower: number } | null)[] {
  const ma = SMA(data, period);
  const result: ({ upper: number; middle: number; lower: number } | null)[] = [];
  for (let i = 0; i < data.length; i++) {
    if (ma[i] === null) { result.push(null); continue; }
    let sumSq = 0;
    for (let j = i - period + 1; j <= i; j++) sumSq += (data[j] - ma[i]!) ** 2;
    const std = Math.sqrt(sumSq / period);
    result.push({ upper: ma[i]! + multiplier * std, middle: ma[i]!, lower: ma[i]! - multiplier * std });
  }
  return result;
}

export function ATR(klines: KlineInput, period = 14): (number | null)[] {
  const result: (number | null)[] = [null];
  for (let i = 1; i < klines.length; i++) {
    const h = klines[i].high, l = klines[i].low, pc = klines[i - 1].close;
    const tr = Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc));
    if (i < period) { result.push(null); continue; }
    let sum = tr;
    for (let j = i - period + 1; j < i; j++) {
      const ph = klines[j].high, pl = klines[j].low, ppc = klines[j - 1].close;
      sum += Math.max(ph - pl, Math.abs(ph - ppc), Math.abs(pl - ppc));
    }
    result.push(sum / period);
  }
  return result;
}

export function ADX(klines: KlineInput, period = 14): (number | null)[] {
  const result: (number | null)[] = [];
  const plusDI: number[] = [], minusDI: number[] = [];
  for (let i = 0; i < klines.length; i++) {
    if (i === 0) { result.push(null); continue; }
    const h = klines[i].high, l = klines[i].low;
    const ph = klines[i - 1].high, pl = klines[i - 1].low;
    const up = h - ph, down = pl - l;
    const tr = Math.max(h - l, Math.abs(h - klines[i - 1].close), Math.abs(l - klines[i - 1].close));
    const pdm = up > down && up > 0 ? up : 0;
    const mdm = down > up && down > 0 ? down : 0;
    plusDI.push(tr > 0 ? 100 * pdm / tr : 0);
    minusDI.push(tr > 0 ? 100 * mdm / tr : 0);
    if (i < period) { result.push(null); continue; }
    let avgPDM = 0, avgMDM = 0, avgTR = 0;
    for (let j = i - period + 1; j <= i; j++) {
      const jtr = Math.max(klines[j].high - klines[j].low, Math.abs(klines[j].high - klines[j - 1].close), Math.abs(klines[j].low - klines[j - 1].close));
      const jup = klines[j].high - klines[j - 1].high, jdown = klines[j - 1].low - klines[j].low;
      avgTR += jtr;
      avgPDM += (jup > jdown && jup > 0) ? jup : 0;
      avgMDM += (jdown > jup && jdown > 0) ? jdown : 0;
    }
    const pDI = 100 * avgPDM / avgTR;
    const mDI = 100 * avgMDM / avgTR;
    const dx = Math.abs(pDI - mDI) / (pDI + mDI) * 100;
    result.push(dx);
  }
  return result;
}

export function computeIndicators(klines: KlineInput) {
  const close = klines.map(k => k.close);
  const high = klines.map(k => k.high);
  const low = klines.map(k => k.low);
  return {
    sma20: SMA(close, 20).map((v, i) => v !== null ? { time: klines[i].timestamp, value: v } : null).filter(Boolean),
    sma50: SMA(close, 50).map((v, i) => v !== null ? { time: klines[i].timestamp, value: v } : null).filter(Boolean),
    sma200: SMA(close, 200).map((v, i) => v !== null ? { time: klines[i].timestamp, value: v } : null).filter(Boolean),
    ema12: EMA(close, 12).map((v, i) => v !== null ? { time: klines[i].timestamp, value: v } : null).filter(Boolean),
    ema26: EMA(close, 26).map((v, i) => v !== null ? { time: klines[i].timestamp, value: v } : null).filter(Boolean),
    rsi: RSI(close, 14).map((v, i) => v !== null ? { time: klines[i].timestamp, value: v } : null).filter(Boolean),
    macd: MACD(close, 12, 26, 9).map((v, i) => v ? { time: klines[i].timestamp, ...v } : null).filter(Boolean),
    bb: BollingerBands(close, 20, 2).map((v, i) => v ? { time: klines[i].timestamp, ...v } : null).filter(Boolean),
    atr: ATR(klines, 14).map((v, i) => v !== null ? { time: klines[i].timestamp, value: v } : null).filter(Boolean),
    adx: ADX(klines, 14).map((v, i) => v !== null ? { time: klines[i].timestamp, value: v } : null).filter(Boolean),
  };
}
