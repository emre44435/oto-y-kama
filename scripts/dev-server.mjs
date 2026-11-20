import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const mime = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.ico':'image/x-icon','.woff2':'font/woff2','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8' };
const cli = process.argv.slice(2);
const portArg = cli.indexOf('--port');
const hostArg = cli.indexOf('--host');
const port = Number(portArg >= 0 ? cli[portArg+1] : (process.env.PORT || 3000));
const host = hostArg >= 0 ? cli[hostArg+1] : '0.0.0.0';
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let path = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    const data = await readFile(path);
    res.setHeader('Content-Type', mime[extname(path)] || 'application/octet-stream');
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Cache-Control', /\.(webp|png|woff2|svg|ico)$/.test(path) ? 'public, max-age=86400' : 'no-cache');
    res.end(data);
  } catch {
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(resolve(root,'404.html')).catch(() => 'Sayfa bulunamadı.'));
  }
}).listen(port, host, () => console.log(`Local: http://localhost:${port}`));
