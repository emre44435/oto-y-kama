import { mkdir, cp, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=resolve(root,'_site');
await rm(out,{recursive:true,force:true}); await mkdir(out);
const entries=await readdir(root,{withFileTypes:true});
for(const e of entries){
  const selected=['assets','hizmetler','hakkimizda','iletisim','bolgeler','gizlilik'].includes(e.name) || /\.(html|css|js|xml|webmanifest)$/.test(e.name) || /^favicon\.(ico|svg|png)$/.test(e.name) || ['robots.txt','.nojekyll','_headers','CNAME'].includes(e.name);
  if(selected) await cp(resolve(root,e.name),resolve(out,e.name),{recursive:true});
}
console.log('Statik yayın dosyaları _site klasörüne hazırlandı.');
