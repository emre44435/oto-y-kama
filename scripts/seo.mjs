export function siteBase(value) {
  if (!value?.trim()) throw Error('Sitenizin tam yayın adresini girin.');
  const url = new URL(value.trim());
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw Error('Site adresi http veya https ile başlamalı ve yalnızca alan adı ile varsa site klasörünü içermelidir.');
  }
  // Encode reserved HTML/JSON characters consistently in links, markup and the sitemap.
  url.pathname = url.pathname.replace(/['"&<>]/g, char => '%' + char.charCodeAt(0).toString(16)).replace(/\/index\.html$/, '/').replace(/\/*$/, '/');
  return url.href;
}

export const escapeMarkup = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export function addReleaseDetails(html, details = {}) {
  const email = (details.email || '').trim();
  const name = (details.provider || '').trim();
  const link = (details.providerUrl || '').trim();
  if (email && (!/^[^\s<>"'@?:]+@[^\s<>"'@?:]+\.[^\s<>"'@?:]+$/.test(email) || email.length > 254)) {
    throw Error('İşletme e-posta adresini kontrol edin.');
  }
  if (link) {
    const url = new URL(link);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw Error('Yer sağlayıcı bağlantısını kontrol edin.');
  }
  if (email) {
    const safe = escapeMarkup(email);
    html = html.replace('<!-- BUSINESS_EMAIL_ROW -->', () => '<div><dt>E-posta</dt><dd><a href="mailto:'+safe+'">'+safe+'</a></dd></div>');
  }
  if (name || link) {
    const label = escapeMarkup(name || new URL(link).hostname);
    const supplier = link ? '<a href="'+escapeMarkup(link)+'" rel="noreferrer">'+label+'</a>' : label;
    html = html.replace('<!-- HOSTING_IDENTITY -->', () => '<p class="hosting-info">Yer sağlayıcı · '+supplier+'</p>');
  }
  return html;
}

const publicPath = file => file.replace(/index\.html$/, '');
const entityPattern = /<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/;
const metaPattern = /<!-- SITE_URL_META_START -->[\s\S]*?<!-- SITE_URL_META_END -->/;

export function createSitemap(pages, base, template) {
  const nodes = pages.filter(page => page.index !== false).map(page => '  <url><loc>' + escapeMarkup(new URL(publicPath(page.file), base).href) + '</loc></url>');
  return template.replace('{{SAYFA_ADRESLERI}}', () => nodes.join('\n'));
}

function pageLinks(markup, base, is404) {
  return markup.replace(/\b(href|src)="([^"]+)"/g, (all, attr, path) => {
    if (/^(?:[a-z]+:|#|\/\/)/i.test(path)) return all;
    const [file, suffix = ''] = path.split(/(?=[?#])(.+)/);
    let result = file.replace(/(^|\/)index\.html$/, '$1') || './';
    if (is404) result = new URL(result, base).href;
    return attr + '="' + result + suffix + '"';
  });
}

export function configurePage(source, page, base) {
  const is404 = page.file === '404.html';
  const html = pageLinks(source, base, is404);
  if (is404) {
    return html.replace(entityPattern, '').replace(metaPattern, '').replace(/\bsrcset="([^"]+)"/g, (_, values) => 'srcset="' + values.split(',').map(value => {
      const [file, width] = value.trim().split(/\s+/);
      return new URL(file, base).href + (width ? ' ' + width : '');
    }).join(', ') + '"');
  }
  const url = new URL(publicPath(page.file), base).href;
  const raw = html.match(entityPattern);
  if (!raw || !metaPattern.test(html)) throw new Error('SEO kaynak etiketleri eksik: ' + page.file);
  const sourceData = JSON.parse(raw[1]);
  const service = sourceData['@type'] === 'Service' ? sourceData : null;
  const business = structuredClone(service ? service.provider : sourceData);
  delete business['@context'];
  business['@id'] = base + '#isletme';
  business.url = base;
  business.logo = new URL('assets/images/gurbuz-logo.webp', base).href;
  business.image = new URL('assets/images/darende-gurbuz-oto-yikama-1080.webp', base).href;
  const website = {'@type':'WebSite', '@id':base+'#website', url:base, name:business.name, inLanguage:'tr-TR', publisher:{'@id':business['@id']}};
  const type = page.file.startsWith('iletisim/') ? 'ContactPage' : page.file.startsWith('hakkimizda/') ? 'AboutPage' : 'WebPage';
  const webpage = {'@type':type, '@id':url+'#webpage', url, name:page.title, description:page.description, inLanguage:'tr-TR', isPartOf:{'@id':website['@id']}, about:{'@id':business['@id']}};
  const graph = [business, website, webpage];
  if (service) {
    delete service['@context'];
    service['@id'] = url + '#hizmet';
    service.url = url;
    service.provider = {'@id':business['@id']};
    webpage.mainEntity = {'@id':service['@id']};
    graph.push(service);
  }
  if (url !== base) {
    const path = [{name:'Ana sayfa', item:base}];
    if (service) path.push({name:'Hizmetler', item:new URL('hizmetler/', base).href});
    const name = source.match(/class="breadcrumb"[\s\S]*?<span>([^<>]*)<\/span><\/nav>/)?.[1]?.replaceAll('&amp;', '&');
    path.push({name:service?.serviceType || name || page.title.split('|')[0].trim(), item:url});
    const crumbId = url+'#sayfa-yolu';
    graph.push({'@type':'BreadcrumbList','@id':crumbId,itemListElement:path.map((item,i)=>({'@type':'ListItem',position:i+1,...item}))});
    webpage.breadcrumb = {'@id':crumbId};
  }
  const image = new URL('assets/images/hero-desktop-1280.webp', base).href;
  const tags = '<link rel="canonical" href="' + escapeMarkup(url) + '"><meta property="og:url" content="' + escapeMarkup(url) + '"><meta property="og:image" content="' + escapeMarkup(image) + '"><meta property="og:image:width" content="1280"><meta property="og:image:height" content="440"><meta property="og:image:alt" content="Darende’deki Gürbüz Oto atölyesi"><meta name="twitter:image" content="' + escapeMarkup(image) + '">';
  const schema = JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c');
  return html.replace(metaPattern, () => tags).replace(entityPattern, () => '<script id="structured-data" type="application/ld+json">'+schema+'</script>');
}
