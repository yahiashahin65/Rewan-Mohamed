import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const domain = (process.env.SITE_URL || 'https://rewan-mohamed.vercel.app').replace(/\/$/, '');
const dist = path.resolve('dist');
const slugs = ['speech-therapy', 'speech-delay', 'behavior-modification', 'learning-difficulties', 'child-development', 'attention-and-focus', 'family-guidance'];
const paths = ['/', '/en/', ...slugs.flatMap(slug => [`/services/${slug}/`, `/en/services/${slug}/`])];
for (const route of paths) {
  const file = path.join(dist, route, 'index.html');
  assert.ok(fs.existsSync(file), `Missing page: ${route}`);
  const html = fs.readFileSync(file, 'utf8');
  assert.ok(html.includes(`<link rel="canonical" href="${domain}${route}"`), `Missing canonical: ${route}`);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /hreflang="ar"/);
  assert.match(html, /hreflang="en"/);
  assert.ok(html.includes('روان محمد') || html.includes('Rewan Mohamed'));
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.ok(!html.includes('your-real-domain.com'));
}
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
for (const route of paths) assert.ok(sitemap.includes(`<loc>${domain}${route}</loc>`), `Sitemap missing ${route}`);
assert.equal((sitemap.match(/<url>/g) || []).length, paths.length);
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${domain}/sitemap.xml`));
assert.ok(fs.existsSync(path.join(dist, 'assets', 'portrait.webp')));
console.log(`OK: ${paths.length} localized pages, canonical URLs, hreflang, sitemap and robots.txt for ${domain}`);
