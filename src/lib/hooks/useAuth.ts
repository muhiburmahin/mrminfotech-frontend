'use client';

import { useState } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  permissions?: string[];
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mrm_admin_user');
      if (stored) {
        try {
          return JSON.parse(stored) as AuthUser;
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const login = (userData: AuthUser) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mrm_admin_user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mrm_admin_user');
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: false,
    login,
    logout,
  };
}
