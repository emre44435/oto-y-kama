import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const base='https://darendeyikama.com/';
const pages=JSON.parse(await readFile(resolve(root,'scripts/pages.json'),'utf8'));
assert.equal((await readFile(resolve(root,'CNAME'),'utf8')).trim(),'darendeyikama.com');
assert.equal(new URL(base).hostname,'darendeyikama.com');
assert.match(new URL(base).hostname,/^[a-z0-9.-]+$/);
const all=[...pages,{file:'gizlilik/index.html'},{file:'404.html'}];
let metaCount=0;
for(const page of all){
  const path=resolve(root,page.file);
  const bytes=await readFile(path), html=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
  if(page.file!=='404.html'){
    const canonical=[...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
    assert.equal(canonical.length,1,page.file+' tek canonical');
    const expected=new URL(page.file.replace(/index\.html$/,''),base).href;
    assert.equal(canonical[0][1],expected,page.file+' canonical');
    assert.ok(html.includes(`<meta property="og:url" content="${expected}">`),page.file+' og:url');
    const graph=JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const business=graph['@graph'].find(x=>Array.isArray(x['@type'])&&x['@type'].includes('AutomotiveBusiness'));
    assert.equal(business.url,base);
    assert.equal(business['@id'],base+'#isletme');
    for(const node of graph['@graph']){
      if(node.url)assert.ok(node.url.startsWith(base));
      if(node['@type']==='Service')assert.equal(node.provider['@id'],base+'#isletme');
    }
    metaCount++;
  }
  const icons=[...html.matchAll(/<link rel="icon"[^>]+href="([^"]+)"[^>]*>/g)];
  assert.ok(icons.length>=2,page.file+' favicon');
  for(const m of icons){
    const u=new URL(m[1],new URL(page.file,base));assert.equal(u.origin,new URL(base).origin);
    await stat(resolve(root,u.pathname.slice(1)));
  }
  for(const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
    const val=m[1].replaceAll('&amp;','&');
    if(/^(data:|tel:|mailto:)/.test(val))continue;
    const u=new URL(val,new URL(page.file,base));
    if(u.origin!==new URL(base).origin)continue;
    let local=resolve(root,decodeURIComponent(u.pathname).slice(1));
    if(u.pathname.endsWith('/'))local=resolve(local,'index.html');
    await stat(local);
  }
}
const xml=await readFile(resolve(root,'sitemap.xml'),'utf8');
const locations=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.deepEqual(locations,pages.map(p=>new URL(p.file.replace(/index\.html$/,''),base).href));
assert.equal(new Set(locations).size,pages.length);
assert.ok(!locations.some(v=>/gizlilik|404/.test(v)));
assert.ok((await readFile(resolve(root,'robots.txt'),'utf8')).includes('Sitemap: '+base+'sitemap.xml'));
const manifest=JSON.parse(await readFile(resolve(root,'site.webmanifest'),'utf8'));
for(const icon of manifest.icons){
 const bytes=await readFile(resolve(root,icon.src));
 assert.equal(bytes.toString('hex',1,4),'504e47');
 const size=Number(icon.sizes.split('x')[0]);
 assert.equal(bytes.readUInt32BE(16),size);assert.equal(bytes.readUInt32BE(20),size);
}
const ico=await readFile(resolve(root,'favicon.ico'));
assert.equal(ico.readUInt16LE(0),0);assert.equal(ico.readUInt16LE(2),1);assert.ok(ico.readUInt16LE(4)>=3);
assert.ok((await readFile(resolve(root,'favicon.svg'),'utf8')).includes('Gürbüz Oto'));
console.log(`${all.length} HTML, ${metaCount} canonical / OG / JSON-LD, ${locations.length} sitemap URL’si, CNAME, UTF-8 ve favicon dosyaları doğrulandı.`);
