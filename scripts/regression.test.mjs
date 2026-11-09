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

// ───────────── Projects showcase / SEO ─────────────
test('projects: no stock photos or invented metrics are presented as client evidence', () => {
  const list = read('src/components/public/projects/ProjectsShowcaseClient.tsx');
  const detail = read('src/app/(public)/projects/[slug]/page.tsx');
  for (const src of [list, detail]) {
    assert.doesNotMatch(src, /images\.unsplash\.com/);
    assert.doesNotMatch(src, /99\.95%/);
    assert.doesNotMatch(src, /< 100ms/);
  }
  assert.doesNotMatch(detail, /DEFAULT_PROJECT_GALLERIES/);
  assert.doesNotMatch(detail, /'Next\.js 16'/);
});

test('projects: cards expose Case Study + Live Preview, accessible filters, and a single h1', () => {
  const list = read('src/components/public/projects/ProjectsShowcaseClient.tsx');
  assert.match(list, /View Case Study/);
  assert.match(list, /Live Preview/);
  assert.match(list, /aria-pressed=\{active\}/);
  assert.match(list, /aria-live="polite"/);
  assert.equal((list.match(/<h1\b/g) || []).length, 1);
  // The API returns cover as an object; the client must read cover.url.
  assert.match(list, /p\.cover\.url/);
});

test('seo: project pages ship JSON-LD with escaped "<", canonical, OG and Twitter metadata', () => {
  const detail = read('src/app/(public)/projects/[slug]/page.tsx');
  const list = read('src/app/(public)/projects/page.tsx');
  for (const src of [detail, list]) {
    assert.match(src, /application\/ld\+json/);
    assert.ok(src.includes('\\u003c'), 'JSON-LD must escape "<" with a double-backslash sequence');
  }
  assert.match(detail, /SoftwareApplication/);
  assert.match(detail, /BreadcrumbList/);
  assert.match(detail, /twitter:/);
  assert.match(list, /canonical: '\/projects'/);
});

test('seo: sitemap is generated from the API and has no hardcoded project/blog slugs', () => {
  const sitemap = read('src/app/sitemap.ts');
  assert.match(sitemap, /PublicApiService\.getProjects/);
  assert.doesNotMatch(sitemap, /medisheba-bd-hospital-core/);
  assert.doesNotMatch(sitemap, /architecting-multi-tenant-cloud-saas/);
});

// ───────────── Strict form validation ─────────────
import { findEmailProblem } from '../src/lib/validation/email.ts';
import { validateEmail, validateMessage, validateName, validatePhone } from '../src/lib/validation/fields.ts';

test('email: accepts real business and plus-addressed emails', () => {
  for (const e of ['name@company.com', 'First.Last@Sub.Acme-Industries.co.uk', 'zoe+quote@acme.io', "o'brien@acme.org"]) {
    assert.equal(findEmailProblem(e), null, e);
  }
});

test('email: rejects malformed, fake-domain and disposable addresses with a clear message', () => {
  const cases = {
    '': 'required',
    plainaddress: 'format',
    'name@': 'format',
    '@company.com': 'format',
    'a@b@company.com': 'format',
    'na..me@company.com': 'format',
    'name@company': 'domain',
    'name@company.c': 'domain',
    'name@192.168.0.1': 'domain',
    'name@-company.com': 'domain',
    'name@example.com': 'fake_domain',
    'name@company.test': 'fake_domain',
    'name@mailinator.com': 'disposable',
    'name@box.yopmail.com': 'disposable',
  };
  for (const [email, problem] of Object.entries(cases)) {
    assert.equal(findEmailProblem(email), problem, email);
    assert.ok(validateEmail(email), `a message must be shown for ${email}`);
  }
});

test('fields: names, phones and messages are validated', () => {
  assert.equal(validateName("Zoë O'Brien-Müller"), null);
  assert.ok(validateName('R4him'));
  assert.ok(validateName('x'));
  assert.ok(validateName('http://spam.biz'));
  assert.equal(validatePhone(''), null);
  assert.equal(validatePhone('+1 415 555 0132'), null);
  assert.ok(validatePhone('abc'));
  assert.ok(validatePhone('12345'));
  assert.equal(validateMessage('We need a logistics platform.', 10, 2000), null);
  assert.ok(validateMessage('short', 10, 2000));
  assert.ok(validateMessage('Hello <script>alert(1)</script> there', 10, 2000));
  assert.ok(validateMessage('see http://a.io http://b.io http://c.io for deals', 10, 2000));
  assert.ok(validateMessage('x'.repeat(2001), 10, 2000));
});

test('forms: contact, start-project and job-application validate before any network request', () => {
  const forms = {
    'src/components/public/contact/ContactInquiryForm.tsx': 'submitContactInquiryAction(',
    'src/components/public/contact/StartProjectForm.tsx': 'submitStartProjectAction(',
    'src/components/public/careers/JobApplicationForm.tsx': 'submitJobApplicationAction(',
  };
  for (const [file, action] of Object.entries(forms)) {
    const src = read(file);
    const validateAt = src.indexOf('validateEmail(email)');
    const callAt = src.indexOf('await ' + action);
    assert.ok(validateAt > 0 && callAt > validateAt, `${file}: validation must precede the request`);
    assert.match(src, /noValidate/);
    assert.match(src, /aria-invalid=\{Boolean\(fieldErrors\.email\)\}/);
    assert.match(src, /<FieldError id="[a-z]+-email-error"/);
  }
});
