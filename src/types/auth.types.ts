export type UserRoleKey = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER' | string;

export interface RoleSummary {
  key: UserRoleKey;
  name: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  fullName?: string; // alias for name
  uiLocale?: string;
  role: RoleSummary | string;
  permissions: string[];
  isActive?: boolean;
  twoFactorEnabled?: boolean;
  mustChangePassword?: boolean;
  accessToken?: string;
  token?: string;
  expiresAt?: string;
  lastLoginAt?: string | null;
  createdAt?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: AdminUser;
  requiresTwoFactor?: boolean;
  twoFactorRequired?: boolean;
  twoFactorTicket?: string;
  message?: string;
}

export interface VerifyTwoFactorInput {
  twoFactorTicket?: string;
  ticket?: string;
  code: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface TwoFactorStatusResponse {
  enabled: boolean;
}

export interface TwoFactorSetupResponse {
  secret: string;
  uri: string;
  otpauthUrl?: string;
  qrCodeDataUrl?: string;
}

export interface TwoFactorEnableResponse {
  message?: string;
  recoveryCodes: string[];
  backupCodes?: string[];
}

export interface DisableTwoFactorInput {
  password: string;
  code?: string;
}

export interface DashboardCountItem {
  total: number;
  published?: number;
  new?: number;
  active?: number;
}

export interface DashboardMetrics {
  generatedAt: string;
  leads: {
    total: number;
    new: number;
    newCount?: number;
  };
  products: {
    total: number;
    published: number;
  };
  blogPosts?: {
    total: number;
    published: number;
  };
  posts?: {
    total: number;
    published: number;
  };
  services: {
    total: number;
    published: number;
  };
  projects: {
    total: number;
    published: number;
  };
  teamMembers?: {
    total: number;
  };
  team?: {
    total: number;
  };
  faqs?: {
    total: number;
    published: number;
  };
  testimonials?: {
    total: number;
    published: number;
  };
  media?: {
    total: number;
  };
  users?: {
    total: number;
    active: number;
  };
}

