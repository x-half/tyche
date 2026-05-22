import { useState, useEffect, useCallback } from 'react';
import { api } from './api.js';
import KlineChart from './KlineChart.js';

type Tab = 'chart' | 'account' | 'strategies' | 'backtest' | 'trader';

export default function App() {
  const [tab, setTab] = useState<Tab>('chart');
  const [strategies, setStrategies] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [klines, setKlines] = useState<any[]>([]);
  const [indicators, setIndicators] = useState<any>(null);
  const [backtestResult, setBacktestResult] = useState<any>(null);
  const [trader, setTrader] = useState<any>(null);
  const [price, setPrice] = useState(0);
  const [balance, setBalance] = useState<any>(null);
  const [positions, setPositions] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const refresh = useCallback(async () => {
    try {
      const [sig, strat, ts, p, b, pos, ord] = await Promise.all([
        api.getSignals(), api.getStrategies(), api.traderStatus(), api.getPrice(),
        api.getBalance(), api.getPositions(), api.getOrders(),
      ]);
      setSignals(sig); setStrategies(strat); setTrader(ts); setPrice(p.price || 0);
      setBalance(b); setPositions(pos); setOrders(ord);
    } catch {}
  }, []);

  useEffect(() => { api.getKlines().then(setKlines).catch(() => {}); api.getIndicators().then(setIndicators).catch(() => {}); refresh(); const iv = setInterval(refresh, 10000); return () => clearInterval(iv); }, []);

  const num = (v: any, d?: number) => {
    const n = Number(v) || 0;
    if (d !== undefined) return n.toFixed(d);
    if (n === 0) return '0';
    if (Math.abs(n) >= 1000) return n.toFixed(0);
    if (Math.abs(n) >= 1) return n.toFixed(2);
    if (Math.abs(n) >= 0.01) return n.toFixed(4);
    return n.toFixed(6);
  };
  const totalPnl = positions.reduce((s, p) => s + (p.unrealizedPnl || 0), 0);
  const totalMargin = positions.reduce((s, p) => s + (p.margin || 0), 0);
  const activeSignals = signals.filter(s => s.signal?.action !== 'hold');

  const theme = { bg: '#0b0b0f', card: '#12121a', border: '#1e1e2e', bl: '#2a2a3e', text: '#e0e0e8', dim: '#6b6b80', accent: '#3b82f6', a2: '#6366f1', up: '#22c55e', down: '#ef4444', gold: '#f59e0b' };

  function C({ title, children, style, ...rest }: any) {
    return <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 16, ...style }} {...rest}>
      {title && <div style={{ fontSize: 11, fontWeight: 600, color: theme.dim, letterSpacing: '0.3px', marginBottom: 10 }}>{title}</div>}
      {children}
    </div>;
  }

  function Table({ cols, rows }: { cols: string[]; rows: any[][] }) {
    return <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
        <thead><tr style={{ color: theme.dim, borderBottom: `1px solid ${theme.border}` }}>
          {cols.map(c => <th key={c} style={{ textAlign: 'left', padding: '6px 8px', fontWeight: 500, whiteSpace: 'nowrap' }}>{c}</th>)}
        </tr></thead>
        <tbody>
          {rows.length === 0 ? <tr><td colSpan={cols.length} style={{ padding: 20, textAlign: 'center', color: theme.dim }}>无数据</td></tr> :
            rows.map((r, i) => <tr key={i} style={{ borderBottom: `1px solid ${theme.border}` }}>
              {r.map((v, j) => <td key={j} style={{ padding: '6px 8px', whiteSpace: 'nowrap', color: typeof v === 'number' && v > 0 ? theme.up : typeof v === 'number' && v < 0 ? theme.down : theme.text }}>{v}</td>)}
            </tr>)
          }
        </tbody>
      </table>
    </div>;
  }

  const tabs = [
    { key: 'chart', label: '行情' },
    { key: 'account', label: '账户' },
    { key: 'strategies', label: '策略' },
    { key: 'backtest', label: '回测' },
    { key: 'trader', label: '交易' },
  ];

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '10px 14px', minHeight: '100vh', color: theme.text, fontSize: 13, background: theme.bg }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 700, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tyche Quant</span>
          <span style={{ fontSize: 10, color: theme.dim, background: theme.card, padding: '1px 6px', borderRadius: 3 }}>v0.1</span>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 11 }}>
          <span style={{ color: theme.dim }}>权益 <b style={{ color: theme.up }}>${num(balance?.totalEquity)}</b></span>
          <span style={{ color: theme.dim }}>持仓 <b style={{ color: theme.text }}>{positions.length}</b></span>
          <span style={{ color: totalPnl >= 0 ? theme.up : theme.down }}>浮动 <b>${num(totalPnl, 4)}</b></span>
          <span style={{ color: theme.dim }}>BTC <b style={{ color: theme.text }}>${price.toFixed(0)}</b></span>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key as Tab)}
            style={{ padding: '6px 14px', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 500,
              background: tab === t.key ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : theme.card,
              color: tab === t.key ? '#fff' : theme.dim, border: tab === t.key ? 'none' : `1px solid ${theme.border}` }}>{t.label}</button>
        ))}
        <button onClick={async () => { await api.sync(); const [k, ind] = await Promise.all([api.getKlines(), api.getIndicators()]); setKlines(k); setIndicators(ind); }}
          style={{ marginLeft: 'auto', padding: '6px 12px', border: `1px solid ${theme.border}`, borderRadius: 6, cursor: 'pointer', background: theme.card, color: theme.dim, fontSize: 11 }}>⟳ 同步</button>
      </div>

      {/* Active Signals */}
      {activeSignals.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          {activeSignals.map((sig, i) => (
            <div key={i} style={{ background: `${sig.signal?.action === 'buy' ? theme.up : theme.down}12`, border: `1px solid ${sig.signal?.action === 'buy' ? theme.up : theme.down}25`, borderRadius: 6, padding: '3px 8px', fontSize: 10 }}>
              <b>{sig.name}</b> <span style={{ color: sig.signal?.action === 'buy' ? theme.up : theme.down, fontWeight: 700 }}>{sig.signal?.action?.toUpperCase()}</span>
              <span style={{ color: theme.dim }}> {sig.signal?.reason}</span>
            </div>
          ))}
        </div>
      )}

      {/* === CHART === */}
      {tab === 'chart' && <C style={{ padding: 0, border: `1px solid ${theme.bl}` }}><KlineChart klines={klines} indicators={indicators} signals={signals} /></C>}

      {/* === ACCOUNT === */}
      {tab === 'account' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <C title="资产概览">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px,1fr))', gap: 8 }}>
              {[
                ['总权益', `$${num(balance?.totalEquity)}`, theme.up],
                ['BTC价格', `$${price.toFixed(0)}`],
                ['持仓数', positions.length],
                ['占用保证金', `$${num(totalMargin)}`],
                ['浮动盈亏', `$${num(totalPnl, 4)}`, totalPnl >= 0 ? theme.up : theme.down],
                ['交易状态', trader?.running ? '运行中' : '已停止', trader?.running ? theme.up : theme.dim],
                ['日盈亏', `$${num(trader?.dailyPnL)}`, (trader?.dailyPnL || 0) >= 0 ? theme.up : theme.down],
                ['连续亏损', `${trader?.consecutiveLosses || 0}次`, (trader?.consecutiveLosses || 0) > 0 ? theme.down : theme.dim],
              ].map(([label, value, color], i) => (
                <div key={i} style={{ background: theme.bg, borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ color: theme.dim, fontSize: 10, marginBottom: 2 }}>{label}</div>
                  <div style={{ color: color || theme.text, fontSize: 15, fontWeight: 700 }}>{value}</div>
                </div>
              ))}
            </div>
          </C>

          <C title={`币种余额 (${balance?.details?.length || 0})`}>
            <Table cols={['币种', '总余额', '可用', '冻结', '权益']}
              rows={(balance?.details || []).map((d: any) => [d.ccy, num(d.cashBal), num(d.availEq), num(d.frozenBal), num(d.eq)])} />
          </C>

          <C title={`当前持仓 (${positions.length})`}>
            <Table cols={['标的', '方向', '数量', '开仓价', '标记价', '浮动盈亏', '盈亏%', '保证金', '杠杆']}
              rows={positions.map(p => [
                p.symbol?.replace('-SWAP', ''), p.size > 0 ? '多' : '空', Math.abs(p.size).toFixed(4),
                `$${num(p.entryPrice, 4)}`, `$${num(p.markPrice, 4)}`,
                p.unrealizedPnl >= 0 ? `+${num(p.unrealizedPnl, 4)}` : num(p.unrealizedPnl, 4),
                p.entryPrice ? `${((p.markPrice - p.entryPrice) / p.entryPrice * 100 * (p.size > 0 ? 1 : -1)).toFixed(2)}%` : '—',
                `$${num(p.margin)}`, `${p.leverage}x`,
              ])} />
          </C>

          <C title={`最近订单 (${orders.length})`}>
            <Table cols={['时间', '标的', '方向', '价格', '数量', '成交', '状态', '盈亏', '手续费']}
              rows={orders.slice(0, 30).map((o: any) => [
                new Date(o.timestamp).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                o.symbol?.replace('-SWAP', ''), o.side === 'buy' ? '买入' : '卖出',
                o.price ? `$${num(o.price)}` : '市价', num(o.amount, 4), num(o.filled, 4),
                o.status === 'filled' ? '已成交' : o.status === 'canceled' ? '已撤单' : o.status,
                o.pnl ? `$${num(o.pnl)}` : '—', o.fee ? `$${num(o.fee)}` : '—',
              ])} />
          </C>
        </div>
      )}

      {/* === STRATEGIES === */}
      {tab === 'strategies' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {strategies.map((s, i) => (
            <C key={s.id} title={s.name}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, cursor: 'pointer', marginBottom: 8 }}>
                <input type="checkbox" checked={s.enabled} onChange={e => { const n = [...strategies]; n[i] = { ...n[i], enabled: e.target.checked }; setStrategies(n); }} /> 启用
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(s.params).map(([k, v]) => (
                  <label key={k} style={{ fontSize: 10, color: theme.dim }}>
                    {k} <input value={v as string} onChange={e => { const n = [...strategies]; n[i] = { ...n[i], params: { ...n[i].params, [k]: e.target.value } }; setStrategies(n); }}
                      style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 4, color: theme.text, padding: '3px 6px', fontSize: 11, width: 70, marginLeft: 3 }} />
                  </label>
                ))}
              </div>
            </C>
          ))}
          <button onClick={() => api.saveStrategies(strategies)} style={{ padding: '7px 0', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: 6, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>保存配置</button>
        </div>
      )}

      {/* === BACKTEST === */}
      {tab === 'backtest' && (
        <div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {strategies.map(s => <button key={s.id} onClick={async () => { try { setBacktestResult(await api.runBacktest(s.id)); } catch {} }} style={{ padding: '6px 14px', border: `1px solid ${theme.border}`, borderRadius: 6, cursor: 'pointer', background: theme.card, color: theme.text, fontSize: 11 }}>▶ {s.name}</button>)}
          </div>
          {backtestResult && (
            <C title={`${backtestResult.strategy} 回测结果`}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 10 }}>
                {[['总收益率', `${(backtestResult.totalReturn * 100).toFixed(2)}%`, backtestResult.totalReturn >= 0 ? theme.up : theme.down],
                  ['年化', `${(backtestResult.annualizedReturn * 100).toFixed(2)}%`],
                  ['最大回撤', `${(backtestResult.maxDrawdown * 100).toFixed(2)}%`, theme.down],
                  ['夏普', backtestResult.sharpeRatio?.toFixed(2)],
                  ['交易', backtestResult.totalTrades],
                  ['胜率', `${(backtestResult.winRate * 100).toFixed(1)}%`, backtestResult.winRate > 0.5 ? theme.up : theme.down],
                ].map(([label, value, color]) => (
                  <div key={label as string} style={{ background: theme.bg, borderRadius: 6, padding: '8px 10px' }}>
                    <div style={{ color: theme.dim, fontSize: 10 }}>{label}</div>
                    <div style={{ color: color || theme.text, fontSize: 16, fontWeight: 700 }}>{value}</div>
                  </div>
                ))}
              </div>
              {backtestResult.equity?.length > 20 && (
                <div style={{ height: 70, display: 'flex', alignItems: 'flex-end', gap: 1, background: theme.bg, borderRadius: 6, padding: '4px 6px' }}>
                  {backtestResult.equity.filter((_: any, i: number) => i % Math.max(1, Math.floor(backtestResult.equity.length / 80)) === 0).map((e: any, i: number) => {
                    const h = Math.max(2, ((e.value - backtestResult.initialCapital) / backtestResult.initialCapital + 0.03) / 0.06 * 100);
                    return <div key={i} style={{ flex: 1, height: `${Math.min(h, 100)}%`, background: e.value >= backtestResult.initialCapital ? theme.up : theme.down, borderRadius: '1px 1px 0 0' }} />;
                  })}
                </div>
              )}
            </C>
          )}
        </div>
      )}

      {/* === TRADER === */}
      {tab === 'trader' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <C title="交易控制">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <button onClick={() => { api.traderStart(); refresh(); }} disabled={trader?.running}
                style={{ padding: '8px 20px', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12, background: trader?.running ? theme.card : theme.up, color: '#fff' }}>▶ 启动</button>
              <button onClick={() => { api.traderStop(); refresh(); }} disabled={!trader?.running}
                style={{ padding: '8px 20px', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12, background: !trader?.running ? theme.card : theme.down, color: !trader?.running ? theme.dim : '#fff' }}>■ 停止</button>
              <span style={{ fontSize: 11, color: theme.dim, marginLeft: 8 }}>状态: <b style={{ color: trader?.running ? theme.up : theme.dim }}>{trader?.running ? '运行中' : '已停止'}</b></span>
            </div>
            <div style={{ display: 'flex', gap: 10, fontSize: 11, color: theme.dim, flexWrap: 'wrap', alignItems: 'center' }}>
              <label>日亏损限额 <input id="r-loss" defaultValue={Math.abs(trader?.dailyLossLimit || 200)} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 4, color: theme.text, padding: '3px 6px', width: 60, marginLeft: 4, fontSize: 11 }} /></label>
              <label>最大连续亏损 <input id="r-consec" defaultValue={trader?.maxConsecutiveLosses || 3} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 4, color: theme.text, padding: '3px 6px', width: 50, marginLeft: 4, fontSize: 11 }} /></label>
              <button onClick={() => {
                const loss = Math.abs(Number((document.getElementById('r-loss') as HTMLInputElement)?.value || 200));
                const consec = Number((document.getElementById('r-consec') as HTMLInputElement)?.value || 3);
                api.traderConfig({ dailyLossLimit: -loss, maxConsecutiveLosses: consec }).then(refresh);
              }}
                style={{ padding: '5px 14px', border: `1px solid ${theme.bl}`, borderRadius: 4, cursor: 'pointer', background: theme.card, color: theme.text, fontSize: 11 }}>应用</button>
            </div>
          </C>

          <C title={`持仓 (${positions.length})`}>
            <Table cols={['标的', '方向', '数量', '开仓价', '标记价', '浮动盈亏', '盈亏%', '保证金', '杠杆']}
              rows={positions.map(p => [
                p.symbol?.replace('-SWAP', ''), p.size > 0 ? '多' : '空', Math.abs(p.size).toFixed(4),
                `$${num(p.entryPrice, 4)}`, `$${num(p.markPrice, 4)}`,
                p.unrealizedPnl >= 0 ? `+${num(p.unrealizedPnl, 4)}` : num(p.unrealizedPnl, 4),
                p.entryPrice ? `${((p.markPrice - p.entryPrice) / p.entryPrice * 100 * (p.size > 0 ? 1 : -1)).toFixed(2)}%` : '—',
                `$${num(p.margin)}`, `${p.leverage}x`,
              ])} />
          </C>

          <C title={`订单记录 (${orders.length})`}>
            <Table cols={['时间', '标的', '方向', '价格', '数量', '成交', '状态', '盈亏', '手续费']}
              rows={orders.slice(0, 50).map((o: any) => [
                new Date(o.timestamp).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                o.symbol?.replace('-SWAP', ''), o.side === 'buy' ? '买入' : '卖出',
                o.price ? `$${num(o.price)}` : '市价', num(o.amount, 4), num(o.filled, 4),
                o.status === 'filled' ? '已成交' : o.status === 'canceled' ? '已撤单' : o.status || '—',
                o.pnl ? `$${num(o.pnl)}` : '—', o.fee ? `$${num(o.fee)}` : '—',
              ])} />
          </C>

          {signals.length > 0 && (
            <C title="策略信号">
              {signals.map((sig, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${theme.border}`, fontSize: 11 }}>
                  <span><b>{sig.name}</b> <span style={{ color: theme.dim }}>{sig.symbol}</span></span>
                  <span><span style={{ color: sig.signal?.action === 'buy' ? theme.up : sig.signal?.action === 'sell' ? theme.down : theme.dim, fontWeight: 700 }}>{sig.signal?.action?.toUpperCase()}</span>
                    <span style={{ color: theme.dim, marginLeft: 4 }}>{sig.signal?.reason} ({sig.signal?.confidence}%)</span></span>
                </div>
              ))}
            </C>
          )}
        </div>
      )}
    </div>
  );
}
