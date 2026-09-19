const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(String(err)));

  await page.goto('http://localhost:5173/', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  const section = page.locator('section', { hasText: /Extremis/i }).first();
  const count = await section.count();
  console.log('section count:', count);

  if (count > 0) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await section.screenshot({ path: '/private/tmp/claude-501/-Users-rex-fab-alt-Documents-private-rescue-blue/2b1b88e1-d7d5-4497-aec7-f66d40dce10d/scratchpad/news-slide-1.png' });

    for (let i = 0; i < 3; i++) {
      const buttons = section.locator('button');
      const btnCount = await buttons.count();
      if (btnCount >= 2) {
        await buttons.nth(1).click();
      }
      await page.waitForTimeout(500);
      await section.screenshot({ path: `/private/tmp/claude-501/-Users-rex-fab-alt-Documents-private-rescue-blue/2b1b88e1-d7d5-4497-aec7-f66d40dce10d/scratchpad/news-slide-${i + 2}.png` });
    }
  } else {
    const body = await page.content();
    require('fs').writeFileSync('/private/tmp/claude-501/-Users-rex-fab-alt-Documents-private-rescue-blue/2b1b88e1-d7d5-4497-aec7-f66d40dce10d/scratchpad/page.html', body);
    await page.screenshot({ path: '/private/tmp/claude-501/-Users-rex-fab-alt-Documents-private-rescue-blue/2b1b88e1-d7d5-4497-aec7-f66d40dce10d/scratchpad/full-page.png', fullPage: true });
  }

  console.log('console errors:', errors);
  await browser.close();
})();
