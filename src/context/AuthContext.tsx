'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { AdminUser, LoginInput, VerifyTwoFactorInput, UserRoleKey } from '@/types/auth.types';
import {
  getCurrentAdminAction,
  loginAdminAction,
  logoutAdminAction,
  verifyTwoFactorAction,
  type ActionState,
} from '@/actions/auth.actions';

export interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  mustChangePassword: boolean;
  login: (input: LoginInput) => Promise<ActionState<AdminUser>>;
  verifyTwoFactor: (input: VerifyTwoFactorInput) => Promise<ActionState<AdminUser>>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AdminUser | null>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRoleKey) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('mrm_admin_user');
        if (cached) return JSON.parse(cached);
      } catch {
        // ignore
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  const getRoleKey = useCallback((role: AdminUser['role']): string => {
    if (!role) return '';
    if (typeof role === 'string') return role.toUpperCase();
    return (role.key || '').toUpperCase();
  }, []);

  const refreshUser = useCallback(async (): Promise<AdminUser | null> => {
    try {
      const res = await getCurrentAdminAction();
      if (res.success && res.data) {
        // Normalize name / fullName
        const normalized: AdminUser = {
          ...res.data,
          fullName: res.data.name || res.data.fullName || 'Admin User',
        };
        setUser(normalized);
        if (typeof window !== 'undefined') {
          localStorage.setItem('mrm_admin_user', JSON.stringify(normalized));
          const token = res.data.accessToken || res.data.token;
          if (token) {
            localStorage.setItem('mrm_access_token', token);
            sessionStorage.setItem('mrm_access_token', token);
          }
        }
        return normalized;
      } else {
        setUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('mrm_admin_user');
          localStorage.removeItem('mrm_access_token');
          sessionStorage.removeItem('mrm_access_token');
        }
        return null;
      }
    } catch {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load: rehydrate session from backend
  useEffect(() => {
    let isMounted = true;
    getCurrentAdminAction()
      .then((res) => {
        if (!isMounted) return;
        if (res.success && res.data) {
          const normalized: AdminUser = {
            ...res.data,
            fullName: res.data.name || res.data.fullName || 'Admin User',
          };
          setUser(normalized);
          if (typeof window !== 'undefined') {
            localStorage.setItem('mrm_admin_user', JSON.stringify(normalized));
            const token = res.data.accessToken || res.data.token;
            if (token) {
              localStorage.setItem('mrm_access_token', token);
              sessionStorage.setItem('mrm_access_token', token);
            }
          }
        } else {
          setUser(null);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('mrm_admin_user');
            localStorage.removeItem('mrm_access_token');
            sessionStorage.removeItem('mrm_access_token');
          }
        }
      })
      .catch(() => {
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Route enforcement when mustChangePassword is true
  useEffect(() => {
    if (user?.mustChangePassword && pathname) {
      if (
        pathname.startsWith('/admin/dashboard') &&
        !pathname.startsWith('/admin/dashboard/security')
      ) {
        router.push('/admin/dashboard/security?forceChange=1');
      }
    }
  }, [user, pathname, router]);

  const login = useCallback(
    async (input: LoginInput): Promise<ActionState<AdminUser>> => {
      setIsLoading(true);
      try {
        const res = await loginAdminAction(input);
        if (res.success && res.data) {
          const normalized: AdminUser = {
            ...res.data,
            fullName: res.data.name || res.data.fullName || 'Admin User',
          };
          setUser(normalized);
          if (typeof window !== 'undefined') {
            localStorage.setItem('mrm_admin_user', JSON.stringify(normalized));
            const token = res.data.accessToken || res.data.token;
            if (token) {
              localStorage.setItem('mrm_access_token', token);
              sessionStorage.setItem('mrm_access_token', token);
            }
          }
        }
        return res;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const verifyTwoFactor = useCallback(
    async (input: VerifyTwoFactorInput): Promise<ActionState<AdminUser>> => {
      setIsLoading(true);
      try {
        const res = await verifyTwoFactorAction(input);
        if (res.success && res.data) {
          const normalized: AdminUser = {
            ...res.data,
            fullName: res.data.name || res.data.fullName || 'Admin User',
          };
          setUser(normalized);
          if (typeof window !== 'undefined') {
            localStorage.setItem('mrm_admin_user', JSON.stringify(normalized));
            const token = res.data.accessToken || res.data.token;
            if (token) {
              localStorage.setItem('mrm_access_token', token);
              sessionStorage.setItem('mrm_access_token', token);
            }
          }
        }
        return res;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await logoutAdminAction();
    } finally {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mrm_admin_user');
        localStorage.removeItem('mrm_access_token');
        sessionStorage.removeItem('mrm_access_token');
      }
      setIsLoading(false);
      router.push('/admin/login');
    }
  }, [router]);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false;
      const roleKey = getRoleKey(user.role);
      // SUPER_ADMIN has god-mode bypass
      if (roleKey === 'SUPER_ADMIN' || roleKey === 'SUPERADMIN' || roleKey === 'OWNER') {
        return true;
      }
      if (user.permissions?.includes('*')) {
        return true;
      }
      return Boolean(user.permissions && user.permissions.includes(permission));
    },
    [user, getRoleKey]
  );

  const hasRole = useCallback(
    (role: UserRoleKey): boolean => {
      if (!user) return false;
      const currentRoleKey = getRoleKey(user.role);
      return currentRoleKey === role.toUpperCase();
    },
    [user, getRoleKey]
  );

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      mustChangePassword: Boolean(user?.mustChangePassword),
      login,
      verifyTwoFactor,
      logout,
      refreshUser,
      hasPermission,
      hasRole,
    }),
    [user, isLoading, login, verifyTwoFactor, logout, refreshUser, hasPermission, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

