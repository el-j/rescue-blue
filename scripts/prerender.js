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

  console.log('Rendering application to static HTML...');
  const appHtml = render();

  console.log('Reading index.html template...');
  let template = fs.readFileSync(templatePath, 'utf-8');

  console.log('Injecting pre-rendered HTML into template...');
  template = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  console.log('Writing static index.html...');
  fs.writeFileSync(templatePath, template, 'utf-8');

  console.log('Cleaning up temporary SSR artifacts...');
  fs.rmSync(path.resolve(__dirname, '../dist-ssr'), { recursive: true, force: true });

  console.log('Static pre-rendering complete!');
}

prerender().catch(err => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
