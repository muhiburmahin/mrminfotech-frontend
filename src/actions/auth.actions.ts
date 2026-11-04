'use server';

import { cookies } from 'next/headers';
import {
  AuthApiService,
  ApiClientError,
  type ApiResponse,
} from '@/lib/api/auth.service';
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

export interface ActionState<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
  requiresTwoFactor?: boolean;
  twoFactorTicket?: string;
  mustChangePassword?: boolean;
}

const SESSION_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'mrm_session';

/**
 * Extracts and sets all Set-Cookie headers returned by the NestJS backend
 * into the Next.js server response cookies.
 */
async function syncCookiesFromBackend(response: ApiResponse<unknown>) {
  const cookieStore = await cookies();
  const rawHeaders = response.rawResponse.headers;

  // In Node/Undici/fetch, getSetCookie() returns an array of Set-Cookie strings
  const setCookies: string[] =
    typeof (rawHeaders as unknown as { getSetCookie?: () => string[] }).getSetCookie === 'function'
      ? (rawHeaders as unknown as { getSetCookie: () => string[] }).getSetCookie()
      : [rawHeaders.get('set-cookie')].filter((c): c is string => Boolean(c));

  for (const cookieStr of setCookies) {
    if (!cookieStr) continue;
    const parts = cookieStr.split(';').map((p) => p.trim());
    const [nameVal, ...attrs] = parts;
    const eqIdx = nameVal.indexOf('=');
    if (eqIdx === -1) continue;

    const name = nameVal.substring(0, eqIdx).trim();
    const value = nameVal.substring(eqIdx + 1).trim();

    let path = '/';
    let httpOnly = true;
    let sameSite: 'lax' | 'strict' | 'none' = 'lax';
    let maxAge: number | undefined;
    let secure = process.env.NODE_ENV === 'production';

    for (const attr of attrs) {
      const lower = attr.toLowerCase();
      if (lower.startsWith('path=')) {
        path = attr.substring(5).trim();
      } else if (lower === 'httponly') {
        httpOnly = true;
      } else if (lower.startsWith('samesite=')) {
        const ss = attr.substring(9).trim().toLowerCase();
        if (ss === 'strict') sameSite = 'strict';
        else if (ss === 'none') sameSite = 'none';
        else sameSite = 'lax';
      } else if (lower.startsWith('max-age=')) {
        const parsed = parseInt(attr.substring(8).trim(), 10);
        if (!isNaN(parsed)) maxAge = parsed;
      } else if (lower === 'secure') {
        secure = true;
      }
    }

    try {
      cookieStore.set({
        name,
        value,
        path,
        httpOnly,
        sameSite,
        maxAge: maxAge ?? 60 * 60 * 12, // default 12 hours
        secure,
      });
    } catch {
      // In SSR render contexts where cookie mutations are disallowed, fail gracefully
    }
  }
}

/**
 * Builds incoming Cookie header to forward to backend.
 */
async function getForwardCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies.map((c) => `${c.name}=${c.value}`).join('; ');
}

export async function loginAdminAction(input: LoginInput): Promise<ActionState<AdminUser>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    const result = await AuthApiService.login(input, { cookieHeader });

    if ('requiresTwoFactor' in result.data && result.data.requiresTwoFactor) {
      return {
        success: false,
        requiresTwoFactor: true,
        twoFactorTicket: result.data.twoFactorTicket,
      };
    }

    await syncCookiesFromBackend(result);

    const user = result.data as AdminUser;
    return {
      success: true,
      data: user,
      mustChangePassword: user.mustChangePassword,
    };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Invalid credentials or login failed',
    };
  }
}

export async function verifyTwoFactorAction(
  input: VerifyTwoFactorInput
): Promise<ActionState<AdminUser>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    const result = await AuthApiService.verifyTwoFactor(input, { cookieHeader });

    await syncCookiesFromBackend(result);

    const user = result.data;
    return {
      success: true,
      data: user,
      mustChangePassword: user.mustChangePassword,
    };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Invalid or expired two-factor verification code',
    };
  }
}

export async function getCurrentAdminAction(): Promise<ActionState<AdminUser>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    if (!cookieHeader) {
      return { success: false, error: 'Unauthenticated' };
    }

    const result = await AuthApiService.getMe({ cookieHeader });
    return {
      success: true,
      data: result.data,
      mustChangePassword: result.data.mustChangePassword,
    };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Session expired or invalid',
    };
  }
}

export async function logoutAdminAction(): Promise<ActionState<void>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    try {
      await AuthApiService.logout({ cookieHeader });
    } catch {
      // Backend logout might fail if cookie was already dead; proceed to clear local cookie
    }

    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
    cookieStore.delete('mrm_session');
    cookieStore.delete('mrm_refresh_token');

    return { success: true };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Logout failed',
    };
  }
}

export async function changePasswordAction(
  input: ChangePasswordInput
): Promise<ActionState<void>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    await AuthApiService.changePassword(input, { cookieHeader });
    return { success: true };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Failed to change password. Ensure it meets complexity rules.',
    };
  }
}

export async function forgotPasswordAction(
  input: ForgotPasswordInput
): Promise<ActionState<{ message: string }>> {
  try {
    const result = await AuthApiService.forgotPassword(input);
    return {
      success: true,
      data: result.data,
    };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Failed to request password reset link',
    };
  }
}

export async function resetPasswordAction(
  input: ResetPasswordInput
): Promise<ActionState<void>> {
  try {
    await AuthApiService.resetPassword(input);
    return { success: true };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Password reset token is invalid or has expired',
    };
  }
}

export async function getTwoFactorStatusAction(): Promise<ActionState<TwoFactorStatusResponse>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    const result = await AuthApiService.getTwoFactorStatus({ cookieHeader });
    return { success: true, data: result.data };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Failed to load two-factor status',
    };
  }
}

export async function generate2faSecretAction(): Promise<ActionState<TwoFactorSetupResponse>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    const result = await AuthApiService.generateTwoFactorSecret({ cookieHeader });
    return { success: true, data: result.data };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Failed to generate two-factor authentication secret',
    };
  }
}

export async function enable2faAction(
  code: string
): Promise<ActionState<TwoFactorEnableResponse>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    const result = await AuthApiService.enableTwoFactor(code, { cookieHeader });
    return { success: true, data: result.data };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Verification code failed. Please check the 6-digit code.',
    };
  }
}

export async function disable2faAction(
  input: DisableTwoFactorInput
): Promise<ActionState<void>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    await AuthApiService.disableTwoFactor(input, { cookieHeader });
    return { success: true };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Failed to disable 2FA. Verify your current password.',
    };
  }
}

export async function regenerateRecoveryCodesAction(
  password: string
): Promise<ActionState<TwoFactorEnableResponse>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    const result = await AuthApiService.regenerateRecoveryCodes(password, { cookieHeader });
    return { success: true, data: result.data };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Failed to regenerate backup codes',
    };
  }
}

export async function getDashboardMetricsAction(): Promise<ActionState<DashboardMetrics>> {
  try {
    const cookieHeader = await getForwardCookieHeader();
    const result = await AuthApiService.getDashboardMetrics({ cookieHeader });
    return { success: true, data: result.data };
  } catch (error: unknown) {
    const err = error as ApiClientError;
    return {
      success: false,
      error: err.message || 'Failed to load dashboard metrics',
    };
  }
}

