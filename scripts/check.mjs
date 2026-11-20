import { readFile, stat, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const pages=JSON.parse(await readFile(resolve(root,'scripts/pages.json'),'utf8'));
let count=0;
for(const page of [...pages,{file:'gizlilik/index.html'},{file:'404.html'}]){
  const path=resolve(root,page.file),html=await readFile(path,'utf8');
  if((html.match(/<h1\b/g)||[]).length!==1)throw new Error(page.file+': tek H1 gerekli');
  for(const part of ['lang="tr"','name="description"','name="viewport"']) if(!html.includes(part))throw new Error(page.file+': '+part+' eksik');
  for(const m of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
  for(const m of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)){
    const value=m[1]; if(/^(https?:|tel:|data:|mailto:)/.test(value))continue;
    const target=resolve(dirname(path),value);
    try{await stat(target)}catch{throw new Error(page.file+': bulunamayan bağlantı '+value)}
    count++;
  }
  for(const m of html.matchAll(/<a[^>]+href="(https:\/\/wa\.me\/[^\"]+)"/g)){
    const u=new URL(m[1].replaceAll('&amp;','&'));if(u.pathname!='/905443054144'||!u.searchParams.get('text'))throw new Error('WhatsApp bağlantısı hatalı: '+page.file);
  }
}
console.log(`${pages.length+2} sayfa, ${count} yerel dosya bağlantısı, JSON-LD ve WhatsApp adresleri doğrulandı.`);
