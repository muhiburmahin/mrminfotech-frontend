import { authService } from './api/auth.service';

export const authClient = {
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
  fetchOptions: {
    credentials: 'include' as RequestCredentials,
  },
  ...authService,
};

export default authClient;
