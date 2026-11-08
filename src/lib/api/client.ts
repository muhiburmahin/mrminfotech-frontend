const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return '/api/v1';
  }
  return (
    process.env.INTERNAL_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:5000/api/v1'
  ).replace(/\/$/, '');
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  timeoutMs?: number;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = cleanEndpoint.startsWith('/api/v1')
    ? (typeof window !== 'undefined' ? cleanEndpoint : `${baseUrl.replace(/\/api\/v1\/?$/, '')}${cleanEndpoint}`)
    : `${baseUrl}${cleanEndpoint}`;
  const { timeoutMs = 6000, ...customConfig } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const headers = new Headers(customConfig.headers || {});
  if (!headers.has('Content-Type') && !(customConfig.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...customConfig,
    headers,
    credentials: 'include',
    signal: controller.signal,
    // By default, revalidate every 60s for Next.js ISR unless explicitly overridden
    next: customConfig.next ?? { revalidate: 60 },
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      throw new ApiError(
        response.status,
        `API request failed with status ${response.status} for ${endpoint}`,
        errorBody
      );
    }

    // Some endpoints may return 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) {
      throw error;
    }
    const err = error as Error;
    if (err.name === 'AbortError') {
      throw new ApiError(408, `API request timed out after ${timeoutMs}ms for ${endpoint}`);
    }
    throw new ApiError(500, err.message || 'An unexpected network error occurred');
  }
}

