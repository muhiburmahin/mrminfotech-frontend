import { EMAIL_MESSAGES, findEmailProblem } from './email.ts';

/** Each validator returns an error message, or `null` when the value is acceptable. */

export function validateEmail(value: string): string | null {
  const problem = findEmailProblem(value);
  return problem ? EMAIL_MESSAGES[problem] : null;
}

const NAME = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u;
export function validateName(value: string): string | null {
  const v = value.trim();
  if (v.length < 2) return 'Please enter your full name';
  if (v.length > 100) return 'Name is too long';
  if (!NAME.test(v)) return 'Name may only contain letters, spaces, apostrophes, dots and hyphens';
  return null;
}

/** Phone is optional; when present it must look like a real number. */
export function validatePhone(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  if (!/^\+?[0-9\s\-()]{6,20}$/.test(v) || (v.match(/[0-9]/g) ?? []).length < 6) {
    return 'Enter a valid phone number, for example +1 415 555 0132';
  }
  return null;
}

const URL_PATTERN = /(?:https?:\/\/|www\.)\S+/gi;
export function validateMessage(value: string, min: number, max: number, maxLinks = 2): string | null {
  const v = value.trim();
  if (v.length < min) return `Please provide at least ${min} characters`;
  if (v.length > max) return `Message must be ${max} characters or fewer`;
  if (/<\s*\/?\s*[a-z][^>]*>/i.test(v)) return 'HTML is not allowed in the message';
  if ((v.match(URL_PATTERN) ?? []).length > maxLinks) return `Please include no more than ${maxLinks} links`;
  return null;
}

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

/** Drops empty entries so callers can test `Object.keys(errors).length`. */
export function compactErrors<K extends string>(errors: Record<K, string | null>): FieldErrors<K> {
  const out: FieldErrors<K> = {};
  (Object.keys(errors) as K[]).forEach((k) => {
    const e = errors[k];
    if (e) out[k] = e;
  });
  return out;
}
