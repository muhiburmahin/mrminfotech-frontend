/**
 * Pure helpers for the admin company-profile form. Kept dependency-free so they can be
 * unit-tested with `node --test` (see scripts/regression.test.mjs).
 */

export const COMPANY_PROFILE_KEYS = [
  'name',
  'legalName',
  'tagline',
  'description',
  'email',
  'supportEmail',
  'phone',
  'whatsapp',
  'address',
  'headquarters',
  'website',
  'facebookUrl',
  'linkedinUrl',
  'twitterUrl',
  'instagramUrl',
  'githubUrl',
  'youtubeUrl',
  'copyrightText',
  'foundedYear',
] as const;

export type CompanyProfileKey = (typeof COMPANY_PROFILE_KEYS)[number];
export type CompanyProfileFormState = Record<CompanyProfileKey, string>;

/** Fields the backend refuses to clear (`null`). */
export const REQUIRED_COMPANY_KEYS: CompanyProfileKey[] = ['name', 'email'];

export function emptyCompanyForm(): CompanyProfileFormState {
  return Object.fromEntries(COMPANY_PROFILE_KEYS.map((k) => [k, ''])) as CompanyProfileFormState;
}

/**
 * Builds the form state from the server record. Absent/null values become '' so that
 * nothing from a demo fallback can leak into the form (and then be saved back).
 */
export function formFromServer(server: Record<string, unknown> | null | undefined): CompanyProfileFormState {
  const form = emptyCompanyForm();
  if (!server) return form;
  for (const key of COMPANY_PROFILE_KEYS) {
    const v = server[key];
    if (v !== null && v !== undefined) form[key] = String(v);
  }
  return form;
}

/**
 * Builds the PATCH payload. Every editable field is sent explicitly:
 * a non-empty value replaces the old one, an empty value is sent as `null` (clears it).
 * Keys without a form control (e.g. logoUrl) are omitted so the server retains them.
 * Throws for blank required fields rather than silently substituting a default.
 */
export function buildCompanyPatch(form: CompanyProfileFormState): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const key of COMPANY_PROFILE_KEYS) {
    const raw = (form[key] ?? '').toString().trim();
    if (raw === '') {
      if (REQUIRED_COMPANY_KEYS.includes(key)) {
        throw new Error(`${key === 'name' ? 'Company brand name' : 'Primary public email'} is required.`);
      }
      payload[key] = null;
    } else if (key === 'foundedYear') {
      const year = Number(raw);
      if (!Number.isInteger(year)) throw new Error('Founded year must be a whole number.');
      payload[key] = year;
    } else {
      payload[key] = raw;
    }
  }
  return payload;
}
