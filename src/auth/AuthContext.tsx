import { createContext, useCallback, useEffect, useReducer, useRef, type PropsWithChildren } from "react";

import type { AuthState, AuthActions, AuthUser, AuthTokens, LoginCredentials, SignupCredentials, ForgotPasswordRequest, ResetPasswordRequest, AuthError } from "./types";
import { authService } from "./authService";
import { sessionManager } from "./session";

const TOKEN_REFRESH_BUFFER_MS = 60 * 1000; // Refresh 1 minute before expiry

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: AuthUser | null }
  | { type: "SET_ERROR"; payload: AuthError | null }
  | { type: "LOGIN_SUCCESS"; payload: { user: AuthUser; tokens: AuthTokens } }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case "LOGOUT":
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

export type AuthContextValue = AuthState & AuthActions;

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  const scheduleTokenRefresh = useCallback(async (expiresAt: number) => {
    clearRefreshTimer();
    const timeUntilExpiry = expiresAt - Date.now() - TOKEN_REFRESH_BUFFER_MS;
    if (timeUntilExpiry <= 0) {
      return;
    }
    refreshTimerRef.current = setTimeout(async () => {
      const tokens = await sessionManager.getTokens();
      if (tokens?.refreshToken) {
        try {
          const newTokens = await authService.refreshToken(tokens.refreshToken);
          const user = await sessionManager.getUser();
          if (user) {
            await sessionManager.saveSession(newTokens, user);
            dispatch({ type: "LOGIN_SUCCESS", payload: { user, tokens: newTokens } });
            scheduleTokenRefresh(newTokens.expiresAt);
          }
        } catch {
          dispatch({ type: "LOGOUT" });
        }
      }
    }, timeUntilExpiry);
  }, [clearRefreshTimer]);

  const restoreSession = useCallback(async (): Promise<boolean> => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const session = await authService.restoreSession();
      if (session) {
        dispatch({ type: "LOGIN_SUCCESS", payload: session });
        scheduleTokenRefresh(session.tokens.expiresAt);
        return true;
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
        return false;
      }
    } catch {
      dispatch({ type: "SET_LOADING", payload: false });
      return false;
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const result = await authService.login(credentials);
      await sessionManager.saveSession(result.tokens, result.user);
      dispatch({ type: "LOGIN_SUCCESS", payload: result });
      scheduleTokenRefresh(result.tokens.expiresAt);
    } catch (error) {
      const authError: AuthError = {
        code: "LOGIN_ERROR",
        message: error instanceof Error ? error.message : "An unknown error occurred"
      };
      dispatch({ type: "SET_ERROR", payload: authError });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const result = await authService.signup(credentials);
      await sessionManager.saveSession(result.tokens, result.user);
      dispatch({ type: "LOGIN_SUCCESS", payload: result });
      scheduleTokenRefresh(result.tokens.expiresAt);
    } catch (error) {
      const authError: AuthError = {
        code: "SIGNUP_ERROR",
        message: error instanceof Error ? error.message : "An unknown error occurred"
      };
      dispatch({ type: "SET_ERROR", payload: authError });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const logout = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    clearRefreshTimer();
    try {
      await authService.logout();
    } finally {
      dispatch({ type: "LOGOUT" });
    }
  }, [clearRefreshTimer]);

  const forgotPassword = useCallback(async (request: ForgotPasswordRequest) => {
    dispatch({ type: "SET_ERROR", payload: null });
    try {
      await authService.forgotPassword(request);
    } catch (error) {
      const authError: AuthError = {
        code: "FORGOT_PASSWORD_ERROR",
        message: error instanceof Error ? error.message : "An unknown error occurred"
      };
      dispatch({ type: "SET_ERROR", payload: authError });
    }
  }, []);

  const resetPassword = useCallback(async (request: ResetPasswordRequest) => {
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await authService.resetPassword(request);
    } catch (error) {
      const authError: AuthError = {
        code: "RESET_PASSWORD_ERROR",
        message: error instanceof Error ? error.message : "An unknown error occurred"
      };
      dispatch({ type: "SET_ERROR", payload: authError });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    restoreSession,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}