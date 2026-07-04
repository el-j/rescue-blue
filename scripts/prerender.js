/* global process */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  const distPath = path.resolve(__dirname, '../dist');
  const ssrPath = path.resolve(__dirname, '../dist-ssr/entry-server.js');
  const templatePath = path.join(distPath, 'index.html');

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found at: ${templatePath}`);
  }
  if (!fs.existsSync(ssrPath)) {
    throw new Error(`SSR bundle not found at: ${ssrPath}`);
  }

  console.log('Loading SSR entry point...');
  const { render } = await import(`file://${ssrPath}`);

  console.log('Reading index.html template...');
  const template = fs.readFileSync(templatePath, 'utf-8');

  const locales = ['de', 'en', 'fr', 'es', 'tr', 'uk', 'pl', 'it', 'ru'];

  for (const lang of locales) {
    console.log(`Rendering application to static HTML for locale: ${lang}...`);
    const appHtml = render(lang);

    console.log(`Injecting pre-rendered HTML for ${lang} into template...`);
    let localizedHtml = template
      .replace('<html lang="de">', `<html lang="${lang}">`)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    if (lang === 'de') {
      const targetPath = path.join(distPath, 'index.html');
      console.log(`Writing static index.html for default locale 'de'...`);
      fs.writeFileSync(targetPath, localizedHtml, 'utf-8');
    } else {
      const targetDir = path.join(distPath, lang);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const targetPath = path.join(targetDir, 'index.html');
      console.log(`Writing static index.html for locale '${lang}' at ${targetPath}...`);
      fs.writeFileSync(targetPath, localizedHtml, 'utf-8');
    }
  }

  console.log('Cleaning up temporary SSR artifacts...');
  fs.rmSync(path.resolve(__dirname, '../dist-ssr'), { recursive: true, force: true });

  console.log('Static pre-rendering complete!');
}

prerender().catch(err => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
