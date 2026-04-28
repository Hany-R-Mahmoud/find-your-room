import type { AuthUser, AuthTokens, LoginCredentials, SignupCredentials, ForgotPasswordRequest, ResetPasswordRequest, AuthError } from "./types";
import { sessionManager } from "./session";
import { isPasswordValid } from "./passwordPolicy";

const MOCK_USER: AuthUser = {
  id: "user_001",
  displayName: "Demo User",
  email: "demo@findyourroom.com",
  createdAt: new Date().toISOString()
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export class AuthServiceError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "AuthServiceError";
  }
}

function createError(code: string, message: string): AuthError {
  return { code, message };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!credentials.email || !credentials.password) {
      throw new AuthServiceError("INVALID_CREDENTIALS", "Invalid credentials");
    }

    if (credentials.email === "demo@findyourroom.com" && credentials.password === "demo123") {
      const tokens = sessionManager.generateMockTokens();
      return { user: MOCK_USER, tokens };
    }

    if (credentials.password.length >= 6) {
      const tokens = sessionManager.generateMockTokens();
      const user: AuthUser = {
        id: `user_${Date.now()}`,
        email: credentials.email,
        displayName: credentials.email.split("@")[0],
        createdAt: new Date().toISOString()
      };
      return { user, tokens };
    }

    throw new AuthServiceError("INVALID_CREDENTIALS", "Invalid credentials");
  },

  async signup(credentials: SignupCredentials): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!credentials.email || !credentials.password || !credentials.displayName) {
      throw new AuthServiceError("MISSING_FIELDS", "Please fill in all required fields");
    }

    if (!isValidEmail(credentials.email)) {
      throw new AuthServiceError("INVALID_EMAIL", "Please enter a valid email address");
    }

    if (!isPasswordValid(credentials.password)) {
      throw new AuthServiceError(
        "WEAK_PASSWORD",
        "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters"
      );
    }

    const tokens = sessionManager.generateMockTokens();
    const user: AuthUser = {
      id: `user_${Date.now()}`,
      email: credentials.email,
      phone: credentials.phone,
      displayName: credentials.displayName,
      createdAt: new Date().toISOString()
    };

    return { user, tokens };
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    await sessionManager.clearSession();
  },

  async forgotPassword(request: ForgotPasswordRequest): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!request.email || !isValidEmail(request.email)) {
      throw new AuthServiceError("MISSING_EMAIL", "Please enter a valid email address");
    }
  },

  async resetPassword(request: ResetPasswordRequest): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!request.resetToken) {
      throw new AuthServiceError("INVALID_TOKEN", "Invalid reset token");
    }

    if (!request.newPassword || !isPasswordValid(request.newPassword)) {
      throw new AuthServiceError(
        "WEAK_PASSWORD",
        "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters"
      );
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!refreshToken.startsWith("mock_refresh_")) {
      throw new AuthServiceError("INVALID_TOKEN", "Invalid refresh token");
    }

    return sessionManager.generateMockTokens();
  },

  async restoreSession(): Promise<{ user: AuthUser; tokens: AuthTokens } | null> {
    const tokens = await sessionManager.getTokens();
    const user = await sessionManager.getUser();

    if (!tokens || !user) {
      return null;
    }

    return { user, tokens };
  }
};