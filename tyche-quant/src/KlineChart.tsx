import { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

interface Props {
  klines: any[];
  indicators: any;
  signals: any[];
}

export default function KlineChart({ klines, indicators, signals }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const candleRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;

    const chart = createChart(containerRef.current, {
      layout: { background: { type: ColorType.Solid, color: '#0f0f0f' }, textColor: '#888' },
      grid: { vertLines: { color: '#1a1a2e' }, horzLines: { color: '#1a1a2e' } },
      timeScale: { timeVisible: true, secondsVisible: false, borderColor: '#333' },
      rightPriceScale: { borderColor: '#333' },
      width: w,
      height: 500,
    });

    const candle = chart.addCandlestickSeries({
      upColor: '#22c55e', downColor: '#ef4444',
      borderUpColor: '#22c55e', borderDownColor: '#ef4444',
      wickUpColor: '#22c55e', wickDownColor: '#ef4444',
    });

    chartRef.current = chart;
    candleRef.current = candle;
    chart.timeScale().fitContent();

    const resize = () => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth });
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      chart.remove();
      chartRef.current = null;
      candleRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!candleRef.current || !klines?.length) return;
    candleRef.current.setData(klines.map((k: any) => ({
      time: Math.floor(k.timestamp / 1000),
      open: k.open, high: k.high, low: k.low, close: k.close,
    })));
    chartRef.current?.timeScale().fitContent();
  }, [klines]);

  useEffect(() => {
    if (!chartRef.current || !indicators) return;
    const chart = chartRef.current;
    const overlays: { data: any[]; color: string; width?: number; style?: number }[] = [];

    if (indicators.sma20?.length) overlays.push({ data: indicators.sma20, color: '#3b82f6' });
    if (indicators.sma50?.length) overlays.push({ data: indicators.sma50, color: '#f59e0b' });
    if (indicators.bb?.length) {
      const bb = indicators.bb.filter(Boolean);
      if (bb.length) {
        overlays.push({ data: bb.map((d: any) => ({ time: d.time, value: d.upper })), color: '#6b7280', width: 1, style: 2 });
        overlays.push({ data: bb.map((d: any) => ({ time: d.time, value: d.lower })), color: '#6b7280', width: 1, style: 2 });
      }
    }

    for (const o of overlays) {
      const data = o.data.map((d: any) => ({ time: Math.floor(d.time / 1000), value: d.value })).filter((d: any) => d.value != null);
      if (data.length) chart.addLineSeries({ color: o.color, lineWidth: o.width || 1, lineStyle: (o.style as any) || 0 }).setData(data);
    }
  }, [indicators]);

  useEffect(() => {
    if (!candleRef.current || !signals?.length) return;
    const markers = signals.map((s: any) => {
      const a = s.signal?.action;
      if (a === 'buy') return { time: Math.floor(s.timestamp / 1000), position: 'belowBar' as const, color: '#22c55e', shape: 'arrowUp' as const, text: 'B' };
      if (a === 'sell') return { time: Math.floor(s.timestamp / 1000), position: 'aboveBar' as const, color: '#ef4444', shape: 'arrowDown' as const, text: 'S' };
      return null;
    }).filter(Boolean);
    if (markers.length) candleRef.current.setMarkers(markers);
  }, [signals]);

  return <div ref={containerRef} style={{ width: '100%', height: 500, borderRadius: 8, overflow: 'hidden' }} />;
}
