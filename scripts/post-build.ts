import fs from 'fs';
import { fileURLToPath } from 'url'
import { PATHS_DATA } from '../src/constants';

PATHS_DATA.forEach(({ path, title, social, lang = 'en' }) => {
  let html = fs.readFileSync('./dist/index.html', 'utf-8');

  html = html.replace('lang="en"', `lang="${lang}"`);
  html = html.replace('<title>Shoukai - personalized search</title>', `<title>${title}</title>`);
  html = html.replace('<!-- SOCIAL -->', social);

  fs.writeFileSync(`./dist/${path}.html`, html);
});
