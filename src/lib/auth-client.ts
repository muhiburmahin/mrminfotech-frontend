import { AuthApiService, authService } from './api/auth.service';

export const authClient = {
  baseURL: typeof window !== 'undefined' ? window.location.origin : '',
  fetchOptions: {
    credentials: 'include' as RequestCredentials,
  },
  ...AuthApiService,
};

export { AuthApiService, authService };
export default authClient;

