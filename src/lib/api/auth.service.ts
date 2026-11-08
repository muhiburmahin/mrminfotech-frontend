import type {
  AdminUser,
  ChangePasswordInput,
  DashboardMetrics,
  DisableTwoFactorInput,
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
  TwoFactorEnableResponse,
  TwoFactorSetupResponse,
  TwoFactorStatusResponse,
  VerifyTwoFactorInput,
} from '@/types/auth.types';

export class ApiClientError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

const getApiBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.INTERNAL_API_URL ||
    'http://localhost:5000/api/v1'
  ).replace(/\/$/, '');
};

const getOrigin = (): string => {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
};

interface RequestOptions extends RequestInit {
  cookieHeader?: string;
  timeoutMs?: number;
}

export interface ApiResponse<T> {
  data: T;
  rawResponse: Response;
  setCookieHeader?: string | null;
}

export async function authRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { cookieHeader, timeoutMs = 8000, ...customConfig } = options;
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(customConfig.headers || {});
  if (!headers.has('Content-Type') && !(customConfig.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Always send Origin to pass NestJS OriginGuard CSRF defense
  if (!headers.has('Origin')) {
    headers.set('Origin', getOrigin());
  }

  // Server-side forwarding of session cookie
  if (cookieHeader && !headers.has('Cookie')) {
    headers.set('Cookie', cookieHeader);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers,
      credentials: 'include',
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      let errorBody: unknown;

      try {
        errorBody = await response.json();
        if (errorBody && typeof errorBody === 'object') {
          const body = errorBody as { message?: string | string[]; error?: string };
          if (Array.isArray(body.message)) {
            errorMessage = body.message.join(', ');
          } else if (typeof body.message === 'string') {
            errorMessage = body.message;
          } else if (body.error) {
            errorMessage = body.error;
          }
        }
      } catch {
        try {
          errorMessage = await response.text();
        } catch {
          // ignore
        }
      }

      throw new ApiClientError(response.status, errorMessage, errorBody);
    }

    const setCookieHeader = response.headers.get('set-cookie');

    if (response.status === 204) {
      return { data: {} as T, rawResponse: response, setCookieHeader };
    }

    const data = (await response.json()) as T;
    return { data, rawResponse: response, setCookieHeader };
  } catch (error: unknown) {
    clearTimeout(timer);
    if (error instanceof ApiClientError) {
      throw error;
    }
    const err = error as Error;
    if (err.name === 'AbortError') {
      throw new ApiClientError(408, 'Authentication request timed out. Please try again.');
    }
    throw new ApiClientError(500, err.message || 'Unable to connect to authentication server');
  }
}

export const AuthApiService = {
  async login(
    input: LoginInput,
    options?: RequestOptions
  ): Promise<ApiResponse<AdminUser | { requiresTwoFactor: true; twoFactorTicket: string }>> {
    return authRequest<AdminUser | { requiresTwoFactor: true; twoFactorTicket: string }>(
      '/auth/login',
      {
        ...options,
        method: 'POST',
        body: JSON.stringify(input),
      }
    );
  },

  async verifyTwoFactor(
    input: VerifyTwoFactorInput,
    options?: RequestOptions
  ): Promise<ApiResponse<AdminUser>> {
    const ticket = input.twoFactorTicket || input.ticket;
    return authRequest<AdminUser>('/auth/2fa/verify', {
      ...options,
      method: 'POST',
      body: JSON.stringify({
        twoFactorTicket: ticket,
        code: input.code,
      }),
    });
  },

  async getMe(options?: RequestOptions): Promise<ApiResponse<AdminUser>> {
    return authRequest<AdminUser>('/auth/me', {
      ...options,
      method: 'GET',
    });
  },

  async logout(options?: RequestOptions): Promise<ApiResponse<void>> {
    return authRequest<void>('/auth/logout', {
      ...options,
      method: 'POST',
    });
  },

  async getTwoFactorStatus(
    options?: RequestOptions
  ): Promise<ApiResponse<TwoFactorStatusResponse>> {
    return authRequest<TwoFactorStatusResponse>('/auth/2fa/status', {
      ...options,
      method: 'GET',
    });
  },

  async generateTwoFactorSecret(
    options?: RequestOptions
  ): Promise<ApiResponse<TwoFactorSetupResponse>> {
    return authRequest<TwoFactorSetupResponse>('/auth/2fa/generate', {
      ...options,
      method: 'POST',
    });
  },

  async enableTwoFactor(
    code: string,
    options?: RequestOptions
  ): Promise<ApiResponse<TwoFactorEnableResponse>> {
    return authRequest<TwoFactorEnableResponse>('/auth/2fa/enable', {
      ...options,
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  async disableTwoFactor(
    input: DisableTwoFactorInput,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    return authRequest<void>('/auth/2fa/disable', {
      ...options,
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  async regenerateRecoveryCodes(
    password: string,
    options?: RequestOptions
  ): Promise<ApiResponse<TwoFactorEnableResponse>> {
    return authRequest<TwoFactorEnableResponse>('/auth/2fa/recovery-codes', {
      ...options,
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  async changePassword(
    input: ChangePasswordInput,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    return authRequest<void>('/auth/change-password', {
      ...options,
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  async forgotPassword(
    input: ForgotPasswordInput,
    options?: RequestOptions
  ): Promise<ApiResponse<{ message: string }>> {
    return authRequest<{ message: string }>('/auth/forgot-password', {
      ...options,
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  async resetPassword(
    input: ResetPasswordInput,
    options?: RequestOptions
  ): Promise<ApiResponse<void>> {
    return authRequest<void>('/auth/reset-password', {
      ...options,
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  async getDashboardMetrics(options?: RequestOptions): Promise<ApiResponse<DashboardMetrics>> {
    return authRequest<DashboardMetrics>('/admin/dashboard', {
      ...options,
      method: 'GET',
    });
  },
};

export const authService = AuthApiService;

