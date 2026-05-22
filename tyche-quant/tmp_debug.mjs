import crypto from 'crypto';
import { SocksProxyAgent } from 'socks-proxy-agent';
import axios from 'axios';

const agent = new SocksProxyAgent('socks5h://127.0.0.1:1080');
const ax = axios.create({ httpsAgent: agent, proxy: false, timeout: 10000 });

const key = '215bd3a1-f80b-4b03-ade7-bc469cc0f427';
const secret = '36D945F0CCB1EFE08E372912620BA889';
const pass = 'XJKxujinke@123';

async function get(path) {
  const ts = new Date().toISOString();
  const sign = crypto.createHmac('sha256', secret).update(ts + 'GET' + path + '').digest('base64');
  const r = await ax.get(`https://www.okx.com${path}`, {
    headers: { 'OK-ACCESS-KEY': key, 'OK-ACCESS-SIGN': sign, 'OK-ACCESS-TIMESTAMP': ts, 'OK-ACCESS-PASSPHRASE': pass },
  });
  return r.data;
}

console.log('=== BALANCE ===');
console.log(JSON.stringify(await get('/api/v5/account/balance'), null, 2).slice(0, 1000));
console.log('\n=== POSITIONS ===');
console.log(JSON.stringify(await get('/api/v5/account/positions'), null, 2).slice(0, 1000));
console.log('\n=== ORDERS PENDING ===');
console.log(JSON.stringify(await get('/api/v5/trade/orders-pending'), null, 2).slice(0, 500));
console.log('\n=== ORDERS HISTORY ===');
console.log(JSON.stringify(await get('/api/v5/trade/orders-history?instType=SWAP&limit=3'), null, 2).slice(0, 500));
