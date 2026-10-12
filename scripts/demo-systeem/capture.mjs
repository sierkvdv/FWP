// Laadt het uren-systeem (demo-database) in headless Edge en bewaart elke pagina als statische HTML.
// Gebruik: node capture.mjs <uitmap>     (server op http://localhost:3005, cookie uit uren/.env)
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import crypto from 'node:crypto';

const UIT = process.argv[2];
const BASIS = 'http://localhost:3005';
mkdirSync(UIT, { recursive: true });
const env = readFileSync('C:/Users/Herstel/Desktop/Claude/uren/.env', 'utf8');
const secret = env.split(/\r?\n/).find((l) => l.startsWith('SESSION_SECRET=')).slice(15).replace(/^"|"$/g, '');
const exp = Date.now() + 3600000;
const cookie = `${exp}.${crypto.createHmac('sha256', secret).update(String(exp)).digest('hex')}`;

const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const profiel = mkdtempSync(join(tmpdir(), 'cap-'));
const slaap = (ms) => new Promise((r) => setTimeout(r, ms));
const proc = spawn(edge, ['--headless=new', '--no-first-run', '--disable-extensions', `--user-data-dir=${profiel}`, '--remote-debugging-port=0', 'about:blank'], { stdio: 'ignore' });
let regels; const t0 = Date.now();
while (!regels) { const f = join(profiel, 'DevToolsActivePort'); if (existsSync(f) && readFileSync(f, 'utf8').includes('\n')) regels = readFileSync(f, 'utf8').split('\n'); else if (Date.now() - t0 > 30000) throw new Error('Edge'); else await slaap(100); }
let doel; while (!doel) { try { doel = (await (await fetch(`http://127.0.0.1:${regels[0].trim()}/json/list`)).json()).find((t) => t.type === 'page'); } catch {} if (!doel) await slaap(100); }
const ws = new WebSocket(doel.webSocketDebuggerUrl); await new Promise((ok) => { ws.onopen = ok; });
let id = 0; const wacht = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && wacht.has(m.id)) { wacht.get(m.id)(m); wacht.delete(m.id); } };
const zend = (method, params = {}, ms = 60000) => new Promise((ok) => { const i = ++id; wacht.set(i, ok); ws.send(JSON.stringify({ id: i, method, params })); setTimeout(() => { if (wacht.has(i)) { wacht.delete(i); ok({ timeout: method }); } }, ms); });
const evalJs = async (expression) => { const r = await zend('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); return r.result && r.result.result && r.result.result.value; };

await zend('Page.enable'); await zend('Network.enable');
await zend('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await zend('Network.setCookie', { name: 'uren_session', value: cookie, domain: 'localhost', path: '/' });

const bezocht = new Map(); // pad -> bestandsnaam
const wachtrij = ['/admin'];
const naamVoor = (pad) => {
  if (bezocht.has(pad)) return bezocht.get(pad);
  const n = pad === '/admin' ? 'index.html' : pad.replace(/^\/admin\/?/, '').replace(/^\/p\//, 'portaal-').replace(/[^a-z0-9-]+/gi, '-').replace(/^-|-$/g, '') + '.html';
  return n;
};
const toegestaan = (pad) => /^\/admin(\/(uren|klanten|facturen|bestanden|projecten|boekhouding|geld|kosten|instellingen)(\/[A-Za-z0-9]+)?)?$/.test(pad) || /^\/p\/[A-Za-z0-9]+$/.test(pad);

while (wachtrij.length) {
  const pad = wachtrij.shift();
  if (bezocht.has(pad)) continue;
  bezocht.set(pad, naamVoor(pad));
  await zend('Page.navigate', { url: BASIS + pad });
  await slaap(pad === '/admin' ? 9000 : 5000);
  const links = await evalJs(`[...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'))`);
  for (const h of links || []) {
    let p = (h || '').split('#')[0];
    if (/^\/admin\/(uren|kosten)\/[A-Za-z0-9]+\?/.test(p)) p = p.split('?')[0];
    if (p.startsWith('/') && !p.includes('?') && toegestaan(p) && !bezocht.has(p) && !wachtrij.includes(p)) wachtrij.push(p);
  }
  const html = await evalJs(`document.documentElement.outerHTML`);
  writeFileSync(join(UIT, bezocht.get(pad) + '.raw'), html || '');
  console.log(pad, '->', bezocht.get(pad), (html || '').length);
}
writeFileSync(join(UIT, 'routes.json'), JSON.stringify(Object.fromEntries(bezocht), null, 1));
await zend('Browser.close', {}, 3000).catch(() => {});
spawnSync('taskkill', ['/PID', String(proc.pid), '/T', '/F'], { stdio: 'ignore' });
process.exit(0);
