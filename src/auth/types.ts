export type AuthUser = {
  id: string;
  email?: string;
  phone?: string;
  displayName: string;
  createdAt: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export type LoginCredentials = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type SignupCredentials = {
  email: string;
  password: string;
  displayName: string;
  phone?: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  resetToken: string;
  newPassword: string;
};

export type AuthError = {
  code: string;
  message: string;
};

export type AuthState = {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
};

export type AuthActions = {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (request: ForgotPasswordRequest) => Promise<void>;
  resetPassword: (request: ResetPasswordRequest) => Promise<void>;
  restoreSession: () => Promise<boolean>;
  clearError: () => void;
};