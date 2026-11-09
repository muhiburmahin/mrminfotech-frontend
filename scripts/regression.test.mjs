// Regression tests for the login, company-profile and testimonials fixes.
// Run with: npm test   (uses Node's built-in test runner; no extra dependencies)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  buildCompanyPatch,
  emptyCompanyForm,
  formFromServer,
  COMPANY_PROFILE_KEYS,
} from '../src/lib/company-profile.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(path.join(root, rel), 'utf8');

// ───────────── Task 1: login ─────────────
test('login: email and password state start empty, with the required placeholders', () => {
  const src = read('src/app/admin/login/page.tsx');
  assert.match(src, /const \[emailInput, setEmailInput\] = useState\(""\)/);
  assert.match(src, /const \[password, setPassword\] = useState\(""\)/);
  assert.match(src, /placeholder="Enter your email"/);
  assert.match(src, /placeholder="Enter your password"/);
});

test('login: no hardcoded email address exists in the login page', () => {
  const src = read('src/app/admin/login/page.tsx');
  // No email-shaped text anywhere in the file, including comments.
  assert.doesNotMatch(src, /[\w.+-]+@[\w-]+\.[\w.-]+/);
  assert.doesNotMatch(src, /defaultValue=/);
});

test('login: password-manager support is preserved (autocomplete hints kept)', () => {
  const src = read('src/app/admin/login/page.tsx');
  assert.match(src, /autoComplete="username"/);
  assert.match(src, /autoComplete="current-password"/);
});

test('login: no plaintext password or fake admin session is stored client-side', () => {
  const src = read('src/app/admin/login/page.tsx');
  assert.doesNotMatch(src, /mrm_override_admin_pass/);
  assert.doesNotMatch(src, /mrm_admin_session/);
  assert.doesNotMatch(src, /mrm_admin_email/);
});

// ───────────── Task 2: company profile ─────────────
test('profile form: absent server values never fall back to demo text', () => {
  const form = formFromServer({ name: 'Real Co', tagline: null });
  assert.equal(form.name, 'Real Co');
  assert.equal(form.tagline, '');
  assert.equal(form.description, '');
  assert.equal(form.phone, '');
  assert.deepEqual(formFromServer(null), emptyCompanyForm());
});

test('profile patch: cleared optional fields are sent as null, edited fields as their new text', () => {
  const form = formFromServer({ name: 'Real Co', email: 'a@b.co', tagline: 'Old', description: 'Old demo text' });
  form.tagline = '';
  form.description = '   ';
  form.phone = '+8801711111111';
  const patch = buildCompanyPatch(form);
  assert.equal(patch.tagline, null);
  assert.equal(patch.description, null);
  assert.equal(patch.phone, '+8801711111111');
  assert.equal(patch.name, 'Real Co');
});

test('profile patch: founded year can be cleared and must be a whole number', () => {
  const form = formFromServer({ name: 'Real Co', email: 'a@b.co', foundedYear: 2020 });
  assert.equal(buildCompanyPatch(form).foundedYear, 2020);
  form.foundedYear = '';
  assert.equal(buildCompanyPatch(form).foundedYear, null);
  form.foundedYear = '20.5';
  assert.throws(() => buildCompanyPatch(form), /whole number/);
});

test('profile patch: required name and email are validated, not silently replaced by a default', () => {
  const form = formFromServer({ name: 'Real Co', email: 'a@b.co' });
  form.name = '';
  assert.throws(() => buildCompanyPatch(form), /brand name is required/);
  form.name = 'Real Co';
  form.email = '';
  assert.throws(() => buildCompanyPatch(form), /email is required/);
});

test('profile patch: fields without a form control (logoUrl) are omitted so the server keeps them', () => {
  assert.ok(!COMPANY_PROFILE_KEYS.includes('logoUrl'));
  const patch = buildCompanyPatch(formFromServer({ name: 'Real Co', email: 'a@b.co' }));
  assert.ok(!('logoUrl' in patch));
  assert.ok(!('isPublic' in patch));
});

test('profile: the public footer no longer resurrects deleted text from fallback content', () => {
  const footer = read('src/components/public/shared/Footer.tsx');
  assert.doesNotMatch(footer, /company\.description \|\| FALLBACK/);
  assert.match(footer, /setCompany\(data\)/);
  const form = read('src/components/admin/forms/CompanyProfileForm.tsx');
  assert.doesNotMatch(form, /FALLBACK_COMPANY_PROFILE/);
  assert.doesNotMatch(form, /\|\| 2024/);
  const api = read('src/lib/api/admin.ts');
  assert.doesNotMatch(api, /profile\.name \|\| 'MRM InfoTech'/);
});

// ───────────── Task 3: testimonials ─────────────
test('testimonials: no fabricated fallback reviews ship in the frontend', () => {
  assert.doesNotMatch(read('src/lib/api/public.ts'), /FALLBACK_TESTIMONIALS/);
  const component = read('src/components/home/ClientTestimonials.tsx');
  assert.doesNotMatch(component, /5\.0 Client Satisfaction/);
});

test('testimonials: public API client builds a valid query string (regression for TS1161)', () => {
  assert.match(read('src/lib/api/public.ts'), /`\/testimonials\?\$\{params\.toString\(\)\}`/);
});

test('testimonials: homepage section is gated by the CMS flag and uses theme tokens', () => {
  const home = read('src/app/(public)/page.tsx');
  assert.match(home, /homepageConfig\.testimonials\.enabled/);
  const component = read('src/components/home/ClientTestimonials.tsx');
  assert.match(component, /var\(--theme-accent\)/);
  assert.match(component, /aria-label="Next testimonials"/);
  assert.match(component, /aria-label="Previous testimonials"/);
  assert.match(read('src/types/homepage.ts'), /testimonials: \{\s*\n\s*eyebrow:[\s\S]*?enabled: true/);
});

test('testimonials: related testimonials are requested by slug on service, project and case-study pages', () => {
  assert.match(read('src/app/(public)/services/[slug]/page.tsx'), /serviceSlug: cleanSlug/);
  assert.match(read('src/app/(public)/projects/[slug]/page.tsx'), /projectSlug: cleanSlug/);
  assert.match(read('src/app/(public)/case-studies/[slug]/page.tsx'), /projectSlug: slug/);
});
