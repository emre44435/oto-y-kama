import { readFile, writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';
import { siteBase } from './seo.mjs';

const args = process.argv.slice(2);
const i = args.indexOf('--url');
let value = i >= 0 ? args[i+1] : process.env.SITE_URL;
if (args.includes('--prompt')) {
  const terminal = createInterface({input:process.stdin,output:process.stdout});
  try { value = await terminal.question('Sitenizin tam yayın adresi: '); }
  finally { terminal.close(); }
}
const siteUrl = siteBase(value);
const configFile = new URL('../site-config.json',import.meta.url);
let prev = {};
try { prev=JSON.parse(await readFile(configFile,'utf8')); }
catch(error) { if(error.code!=='ENOENT') throw error; }
await writeFile(configFile,JSON.stringify({...prev,siteUrl},null,2)+'\n');
console.log('Yayın adresi kaydedildi: ' + siteUrl);
