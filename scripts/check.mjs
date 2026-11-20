import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const published = process.argv.includes('--public');
const directoryOption = process.argv.indexOf('--directory');
const dir = directoryOption >= 0 ? process.argv[directoryOption + 1] : published ? join(root,'_site') : root;
const pages = JSON.parse(await readFile(join(root,'scripts/pages.json'),'utf8'));
const all = [...pages,{file:'404.html',index:false}];
const contents = new Map();
const anchorIds = new Map();
const titles = new Set();
const descriptions = new Set();
const exists = new Set();
function assert(value, message) { if(!value) throw new Error(message); }
const unescape = str => str.replaceAll('&amp;','&').replaceAll('&quot;','"');
for(const page of all) {
  const markup = await readFile(join(dir,page.file),'utf8');
  contents.set(page.file,markup);
  const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert(ids.length===new Set(ids).size,page.file+' — yinelenen kimlik');
  anchorIds.set(page.file,new Set(ids));
}
const home = contents.get('index.html');
const canonical = /<link rel="canonical" href="([^"]+)">/;
const base = published ? unescape(home.match(canonical)?.[1] || '') : 'https://yerel-kontrol.invalid/';
assert(/^https?:\/\//.test(base),'Ana sayfa yayın adresi eksik');
let count = 0;
async function checkLocal(raw, documentUrl, page) {
  const url = new URL(unescape(raw), documentUrl);
  if(url.protocol === 'tel:') { assert(url.pathname==='+905443054144',page+' — telefon'); return; }
  if(url.hostname === 'wa.me') {
    assert(url.pathname==='/905443054144' && !!url.searchParams.get('text'),page+' — WhatsApp');return;
  }
  if(url.origin!==new URL(base).origin || url.protocol==='data:') return;
  const prefix = new URL(base).pathname;
  assert(url.pathname.startsWith(prefix), page+' — site klasörü dışı '+raw);
  const relative = decodeURIComponent(url.pathname.slice(prefix.length));
  const path = !relative || relative.endsWith('/') ? relative+'index.html' : relative;
  if(!exists.has(path)) { assert((await stat(join(dir,path))).isFile(),page+' — '+path); exists.add(path); }
  if(url.hash && anchorIds.has(path)) assert(anchorIds.get(path).has(decodeURIComponent(url.hash.slice(1))),page+' — hedef yok '+raw);
  count++;
}
for(const page of all) {
  const html = contents.get(page.file);
  assert((html.match(/<h1\b/g)||[]).length===1 && html.includes('lang="tr"') && html.includes('name="viewport"'),page.file+' — sayfa yapısı');
  const title=html.match(/<title>([^<]+)<\/title>/)?.[1], desc=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert(title && desc && !titles.has(title) && !descriptions.has(desc),page.file+' — başlık veya açıklama');
  titles.add(title); descriptions.add(desc);
  const docUrl = new URL(page.file,base);
  for(const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) await checkLocal(m[1],docUrl,page.file);
  for(const m of html.matchAll(/\ssrcset="([^"]+)"/g)) for(const candidate of m[1].split(',')) await checkLocal(candidate.trim().split(/\s+/)[0],docUrl,page.file);
  assert(!/<iframe\b/.test(html),page.file+' — harita sayfa açılışında etkin');
  assert((html.match(/<nav class="legal-footer"/g)||[]).length===1,page.file+' — yasal menü');
  const schemaRaw = html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  const schema = schemaRaw ? JSON.parse(schemaRaw) : null;
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  assert(noindex === (page.index===false),page.file+' — dizin tercihi');
  if(published && page.file!=='404.html') {
    const target = new URL(page.file.replace(/index\.html$/,''),base).href;
    assert(unescape(html.match(canonical)?.[1]||'')===target,page.file+' — canonical');
    assert(schema?.['@graph']?.some(n=>n.url===target),page.file+' — sayfa şeması');
    if(page.file.split('/').length===3) assert(schema['@graph'].some(n=>n['@type']==='Service'&&n.provider['@id']===base+'#isletme'),page.file+' — hizmet şeması');
  }
}
for(const m of (await readFile(join(dir,'style.css'),'utf8')).matchAll(/url\(['"]?(assets\/[^)'"]+)/g)) await checkLocal(m[1],base,'style.css');
const manifest = JSON.parse(await readFile(join(dir,'site.webmanifest'),'utf8'));
for(const icon of manifest.icons) await checkLocal(icon.src,base,'site.webmanifest');
if(published) {
  const expected=pages.filter(p=>p.index!==false).map(p=>new URL(p.file.replace(/index\.html$/,''),base).href).sort();
  const xml=await readFile(join(dir,'sitemap.xml'),'utf8');
  const actual=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>unescape(m[1])).sort();
  assert(JSON.stringify(expected)===JSON.stringify(actual),'Sitemap ve dizine açık sayfalar uyuşmuyor.');
  const robots=await readFile(join(dir,'robots.txt'),'utf8');
  assert(robots.includes('Sitemap: '+new URL('sitemap.xml',base).href+'\n'),'robots.txt');
}
console.log(all.length+' sayfa, '+count+' yerel bağlantı ve kaynak, tüm sayfa içi hedefler, telefon, WhatsApp ve JSON-LD doğrulandı.');
