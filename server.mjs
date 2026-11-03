import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const routes = new Map([['/', ['index.html', 'text/html']], ['/app.js', ['app.js', 'text/javascript']]]);
createServer(async (request, response) => {
  const route = routes.get(request.url);
  if (!route) { response.writeHead(404); response.end('Not found'); return; }
  try { response.writeHead(200, { 'content-type': route[1] + '; charset=utf-8' }); response.end(await readFile(new URL(route[0], import.meta.url))); }
  catch { response.writeHead(500); response.end('Read error'); }
}).listen(Number(process.env.PORT || 3000), '0.0.0.0');
