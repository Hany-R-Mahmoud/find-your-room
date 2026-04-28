import * as SecureStore from "expo-secure-store";

import type { AuthTokens, AuthUser } from "./types";

const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const TOKEN_EXPIRY_KEY = "auth_token_expiry";
const USER_KEY = "auth_user";

const ACCESS_TOKEN_EXPIRY_MS = 15 * 60 * 1000;
const REFRESH_TOKEN_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;

export class SessionManager {
  async saveSession(tokens: AuthTokens, user: AuthUser): Promise<void> {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
    await SecureStore.setItemAsync(TOKEN_EXPIRY_KEY, String(tokens.expiresAt));
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  }

  async getTokens(): Promise<AuthTokens | null> {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    const expiresAtStr = await SecureStore.getItemAsync(TOKEN_EXPIRY_KEY);

    if (!accessToken || !refreshToken || !expiresAtStr) {
      return null;
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    if (Date.now() > expiresAt) {
      await this.clearSession();
      return null;
    }

    return { accessToken, refreshToken, expiresAt };
  }

  async getUser(): Promise<AuthUser | null> {
    const userJson = await SecureStore.getItemAsync(USER_KEY);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as AuthUser;
    } catch {
      return null;
    }
  }

  async isSessionValid(): Promise<boolean> {
    const tokens = await this.getTokens();
    return tokens !== null;
  }

  async clearSession(): Promise<void> {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(TOKEN_EXPIRY_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  }

  generateMockTokens(): AuthTokens {
    const now = Date.now();
    return {
      accessToken: `mock_access_${now}`,
      refreshToken: `mock_refresh_${now}`,
      expiresAt: now + ACCESS_TOKEN_EXPIRY_MS
    };
  }
}

export const sessionManager = new SessionManager();