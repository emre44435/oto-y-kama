import { cp, mkdir, readFile, rename, rm, stat, writeFile, mkdtemp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteBase, configurePage, createSitemap, addReleaseDetails } from './seo.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const pages = JSON.parse(await readFile(join(root, 'scripts/pages.json'), 'utf8'));
let saved = {};
try { saved = JSON.parse(await readFile(join(root, 'site-config.json'), 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const option = process.argv.indexOf('--url');
const base = siteBase(option >= 0 ? process.argv[option + 1] : process.env.SITE_URL || saved.siteUrl);
const details = {
  email: process.env.BUSINESS_EMAIL || saved.email,
  provider: process.env.HOSTING_NAME || saved.provider,
  providerUrl: process.env.HOSTING_INFO_URL || saved.providerUrl,
};
const sitemapTemplate = await readFile(join(root, 'scripts/sablonlar/sitemap.xml'), 'utf8');
const output = join(root, '_site');
const temp = await mkdtemp(join(root, '.build-'));
try {
  const referencedImages = new Set();
  const rememberImages = markup => {
    for (const match of markup.matchAll(/assets\/images\/[a-zA-Z0-9_-]+\.(?:webp|png|jpe?g)/g)) referencedImages.add(match[0]);
  };
  rememberImages(await readFile(join(root, 'style.css'), 'utf8'));
  for (const name of ['assets/fonts', 'assets/icons', 'style.css', 'script.js', 'site.webmanifest', '_headers', '.nojekyll']) {
    await mkdir(dirname(join(temp,name)), {recursive:true});
    await cp(join(root, name), join(temp, name), {recursive:true});
  }
  for (const page of [...pages, {file:'404.html'}]) {
    const source = await readFile(join(root, page.file), 'utf8');
    const path = join(temp, page.file);
    await mkdir(dirname(path), {recursive:true});
    const pageHtml = addReleaseDetails(configurePage(source, page, base), details);
    rememberImages(pageHtml);
    await writeFile(path, pageHtml);
  }
  await mkdir(join(temp, 'assets/images'), {recursive:true});
  for (const name of referencedImages) await cp(join(root, name), join(temp, name));
  await writeFile(join(temp, 'sitemap.xml'), createSitemap(pages, base, sitemapTemplate));
  await writeFile(join(temp, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + new URL('sitemap.xml', base).href + '\n');
  await writeFile(join(temp, '.htaccess'), 'ErrorDocument 404 ' + new URL('404.html', base).pathname + '\n');
  try { await stat(join(root, 'CNAME')); await cp(join(root, 'CNAME'), join(temp, 'CNAME')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  await rm(output, {recursive:true,force:true});
  await rename(temp, output);
  console.log('_site hazır. ' + pages.filter(p => p.index !== false).length + ' sitemap adresi, ' + (pages.length+1) + ' HTML sayfası.');
} finally {
  await rm(temp,{recursive:true,force:true});
}
