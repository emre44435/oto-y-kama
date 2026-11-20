import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../',import.meta.url));
const args = process.argv.slice(2);
const at = args.indexOf('--url');
let value = at >= 0 ? args[at+1] : process.env.SITE_URL;
if (args.includes('--prompt')) {
  const { createInterface } = await import('node:readline/promises');
  const rl = createInterface({input:process.stdin,output:process.stdout});
  value = await rl.question('Gerçek yayın adresiniz (https://.../): ');
  rl.close();
}
if (!value) throw new Error('Gerçek yayın adresini girin: node scripts/configure-site.mjs --url https://SIZIN-GERCEK-ADRESINIZ/');
const input = new URL(value);
if (!['https:','http:'].includes(input.protocol) || input.username || input.password || input.search || input.hash) throw new Error('Adres http(s) olmalı; kullanıcı bilgisi, sorgu ve fragment içermemeli.');
const base = input.href.replace(/\/+$/,'')+'/';
const esc = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const pages = JSON.parse(await readFile(resolve(root,'scripts/pages.json'),'utf8'));
const additional = [{file:'gizlilik/index.html',title:'Gizlilik ve İletişim Bilgisi | Gürbüz Oto Darende'}];
const homeUrl = new URL('./',base).href;
for (const page of [...pages,...additional]) {
  const path = resolve(root,page.file);
  let html = await readFile(path,'utf8');
  const url = new URL(page.file.replace(/index\.html$/,''),base).href;
  const image = new URL('assets/images/darende-gurbuz-oto-yikama-1080.webp',base).href;
  const tags = `<link rel="canonical" href="${esc(url)}"><meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(image)}"><meta property="og:image:width" content="1080"><meta property="og:image:height" content="1440"><meta property="og:image:alt" content="Gürbüz Oto Darende işletme dış cephesi"><meta name="twitter:image" content="${esc(image)}">`;
  html = html.replace(/<!-- SITE_URL_META_START -->[\s\S]*?<!-- SITE_URL_META_END -->/,`<!-- SITE_URL_META_START -->${tags}<!-- SITE_URL_META_END -->`);
  html = html.replace(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/,(_, raw) => {
    let data = JSON.parse(raw);
    if (data['@graph']) {
      const service = data['@graph'].find(x=>x['@type']==='Service');
      data = service || data['@graph'].find(x=>Array.isArray(x['@type']) && x['@type'].includes('AutomotiveBusiness'));
    }
    const isService = data['@type']==='Service';
    let business = structuredClone(isService ? (data.provider['@id'] ? JSON.parse(JSON.stringify(globalThis.savedBusiness)) : data.provider) : data);
    if (!business) throw new Error('İşletme yapılandırması okunamadı.');
    delete business['@context'];
    business['@id'] = homeUrl+'#isletme'; business.url=homeUrl;
    business.logo=new URL('assets/images/gurbuz-logo-seffaf.png',base).href;
    business.image=image;
    globalThis.savedBusiness=business;
    const graph=[business, {'@type':'WebSite','@id':homeUrl+'#website','url':homeUrl,'name':'Gürbüz Oto Kuaför & Oto Lastik','inLanguage':'tr-TR','publisher':{'@id':business['@id']}}, {'@type':'WebPage','@id':url+'#webpage','url':url,'name':page.title,'inLanguage':'tr-TR','isPartOf':{'@id':homeUrl+'#website'},'about':{'@id':business['@id']}}];
    if (isService) { delete data['@context']; data.provider={'@id':business['@id']}; data['@id']=url+'#hizmet'; data.url=url;graph.push(data); }
    if (url!==homeUrl) graph.push({'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Ana sayfa','item':homeUrl},{'@type':'ListItem','position':2,'name':page.title.split('|')[0].trim(),'item':url}]});
    return '<script id="structured-data" type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':graph})+'</script>';
  });
  await writeFile(path,html);
}
const urls = pages.map(p=>new URL(p.file.replace(/index\.html$/,''),base).href);
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(url=>'  <url><loc>'+esc(url)+'</loc></url>').join('\n')+'\n</urlset>\n';
await writeFile(resolve(root,'sitemap.xml'),xml);
await writeFile(resolve(root,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml',base).href}\n`);
await writeFile(resolve(root,'site-config.json'),JSON.stringify({siteUrl:base,configuredAt:new Date().toISOString(),pages:urls.length},null,2));
let notfound = await readFile(resolve(root,'404.html'),'utf8');
// Relative assets must work even when GitHub serves 404.html at a nested URL.
notfound=notfound.replace(/(href|src)="(?!https?:|tel:|#|data:)([^"]*)"/g,(_,attr,val)=>`${attr}="${esc(new URL(val,base).href)}"`);
notfound=notfound.replace(/srcset="[^"]*"/g,'');
await writeFile(resolve(root,'404.html'),notfound);
console.log(`Yayın adresi yapılandırıldı: ${base} (${urls.length} sitemap adresi)`);
