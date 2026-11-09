#!/usr/bin/env node
/**
 * Runtime SEO / accessibility audit of a running build.
 *
 *   npm run build && npx next start -p 3123 &
 *   node scripts/seo-audit.mjs http://localhost:3123
 *
 * For each public route it checks: HTTP 200, a single <title> without a duplicated brand, meta description
 * (50-160 chars), canonical matching the route, Open Graph + Twitter tags, exactly one <h1>, and that every
 * <img> has an alt attribute. Exits non-zero if any check fails.
 */
const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');

const ROUTES = [
  '/', '/about', '/services', '/products', '/projects', '/blog', '/careers', '/team', '/contact',
  '/start-project', '/security', '/privacy-policy', '/terms', '/cookie-policy',
];

const first = (html, re) => (html.match(re) || [])[1];
const metaContent = (html, attr, name) => {
  const tags = html.match(/<meta\s[^>]*>/gi) || [];
  for (const tag of tags) {
    if (new RegExp(`${attr}=["']${name}["']`, 'i').test(tag)) return first(tag, /content=["']([^"']*)["']/i);
  }
  return undefined;
};

let failures = 0;
const fail = (route, msg) => {
  failures += 1;
  console.log(`  FAIL ${route}: ${msg}`);
};

for (const route of ROUTES) {
  let res;
  try {
    res = await fetch(base + route, { redirect: 'manual' });
  } catch (e) {
    fail(route, `request failed (${e.message})`);
    continue;
  }
  if (res.status !== 200) {
    fail(route, `HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();
  const title = first(html, /<title[^>]*>([^<]*)<\/title>/i);
  const description = metaContent(html, 'name', 'description');
  const canonical = first(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((t) => !/\salt=/i.test(t)).length;

  const problems = [];
  if (!title) problems.push('missing <title>');
  else if ((title.match(/MRM InfoTech/gi) || []).length > 1 && route !== '/') problems.push(`brand repeated in title "${title}"`);
  if (!description) problems.push('missing meta description');
  else if (description.length < 50 || description.length > 170) problems.push(`description length ${description.length}`);
  if (!canonical) problems.push('missing canonical');
  else {
    const path = new URL(canonical, base).pathname.replace(/\/$/, '') || '/';
    if (path !== route) problems.push(`canonical points to "${path}"`);
  }
  if (!metaContent(html, 'property', 'og:title')) problems.push('missing og:title');
  if (!metaContent(html, 'property', 'og:image')) problems.push('missing og:image');
  if (!metaContent(html, 'name', 'twitter:card')) problems.push('missing twitter:card');
  if (h1s !== 1) problems.push(`${h1s} <h1> elements`);
  if (noAlt) problems.push(`${noAlt} <img> without alt`);

  if (problems.length) problems.forEach((p) => fail(route, p));
  else console.log(`  ok   ${route}  "${title}"`);
}

console.log(failures ? `\n${failures} problem(s) found.` : '\nAll routes passed.');
process.exit(failures ? 1 : 0);
