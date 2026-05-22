import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import routes from './server/routes.js';

const PORT = parseInt(process.env.PORT || '3100');
const isDev = process.env.NODE_ENV !== 'production';

const app = express();
app.use(express.json());

app.use('/api', routes);

async function start() {
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(import.meta.dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
    }
  }

  app.listen(PORT, () => {
    console.log(`[Tyche Quant] http://localhost:${PORT} (${isDev ? 'dev' : 'prod'})`);
  });
}

start().catch(console.error);
