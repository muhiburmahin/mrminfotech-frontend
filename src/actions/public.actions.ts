'use server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  process.env.INTERNAL_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000/api/v1';

const APP_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'http://localhost:3000';

export interface PublicActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
}

async function postToPublicBackend<T>(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<PublicActionResponse<T>> {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${normalizedEndpoint}`;

  // Clean payload: strip undefined or null values
  const cleanPayload: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null && value !== '') {
      cleanPayload[key] = value;
    }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: APP_ORIGIN,
      },
      body: JSON.stringify(cleanPayload),
      cache: 'no-store',
    });

    const body = await res.json().catch(() => null);

    if (!res.ok) {
      let errorMsg = `Submission failed (${res.status})`;

      if (body && typeof body === 'object') {
        const errorBody = body as {
          message?: string | string[];
          error?: string;
          details?: Array<{ field?: string; message?: string }>;
        };

        if (Array.isArray(errorBody.details) && errorBody.details.length > 0) {
          errorMsg = errorBody.details
            .map((d) => (d.field ? `${d.field}: ${d.message}` : d.message))
            .join(', ');
        } else if (Array.isArray(errorBody.message)) {
          errorMsg = errorBody.message.join(', ');
        } else if (typeof errorBody.message === 'string') {
          errorMsg = errorBody.message;
        } else if (errorBody.error) {
          errorMsg = errorBody.error;
        }
      }

      return { success: false, error: errorMsg };
    }

    const data =
      body && typeof body === 'object' && 'success' in body && 'data' in body
        ? (body as { data: T }).data
        : (body as T);

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unable to connect to the server.',
    };
  }
}

export interface ContactInquiryInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  consentGiven: boolean;
}

export async function submitContactInquiryAction(
  input: ContactInquiryInput
): Promise<PublicActionResponse<{ id?: string; referenceNumber?: string; message?: string }>> {
  const payload: Record<string, unknown> = {
    name: input.name?.trim(),
    email: input.email?.trim().toLowerCase(),
    message: input.message?.trim(),
    consentGiven: Boolean(input.consentGiven),
  };

  if (input.phone?.trim()) payload.phone = input.phone.trim();
  if (input.subject?.trim()) payload.subject = input.subject.trim();

  return postToPublicBackend<{ id?: string; referenceNumber?: string; message?: string }>(
    '/contact',
    payload
  );
}

export interface StartProjectInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterested?: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
  consentGiven: boolean;
}

export async function submitStartProjectAction(
  input: StartProjectInput
): Promise<PublicActionResponse<{ id?: string; referenceNumber?: string; message?: string }>> {
  const payload: Record<string, unknown> = {
    name: input.name?.trim(),
    email: input.email?.trim().toLowerCase(),
    message: input.message?.trim(),
    consentGiven: Boolean(input.consentGiven),
  };

  if (input.phone?.trim()) payload.phone = input.phone.trim();
  if (input.company?.trim()) payload.company = input.company.trim();
  if (input.serviceInterested?.trim()) payload.serviceInterested = input.serviceInterested.trim();
  if (input.budgetRange?.trim()) payload.budgetRange = input.budgetRange.trim();
  if (input.timeline?.trim()) payload.timeline = input.timeline.trim();

  return postToPublicBackend<{ id?: string; referenceNumber?: string; message?: string }>(
    '/contact/start-project',
    payload
  );
}

export interface JobApplicationInput {
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  consentGiven: boolean;
}

export async function submitJobApplicationAction(
  slug: string,
  input: JobApplicationInput
): Promise<PublicActionResponse<{ id?: string; message?: string }>> {
  const payload: Record<string, unknown> = {
    name: input.name?.trim(),
    email: input.email?.trim().toLowerCase(),
    consentGiven: Boolean(input.consentGiven),
  };

  if (input.phone?.trim()) payload.phone = input.phone.trim();
  if (input.resumeUrl?.trim()) payload.resumeUrl = input.resumeUrl.trim();
  if (input.coverLetter?.trim()) payload.coverLetter = input.coverLetter.trim();

  return postToPublicBackend<{ id?: string; message?: string }>(
    `/careers/${encodeURIComponent(slug)}/apply`,
    payload
  );
}

