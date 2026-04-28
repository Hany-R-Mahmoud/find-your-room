# Authentication MVP Architecture

**Issue**: [FIN-25](/FIN/issues/FIN-25)  
**Created**: 2026-04-28  
**Status**: Updated per Security Review  
**Owner**: @Architect

---

## 1. Current State Analysis

### Existing Patterns
- Expo Router with file-based routing (`app/` directory)
- No authentication system present
- Simple `router.replace("/discover")` navigation after onboarding
- No token storage or session management
- No protected routes

### Technology Stack
- **Runtime**: Expo SDK 52 (React Native)
- **Navigation**: expo-router v4
- **Storage**: AsyncStorage available
- **Secure Storage**: expo-secure-store available

---

## 2. MVP Authentication Architecture

### 2.1 Auth Flow Overview

```
User Registration → Email/Phone + Password → Token Issue → Session Store → Authenticated
User Login → Credentials → Token Issue → Session Store → Authenticated
Forgot Password → Email Verification → Password Reset → Login Retry
```


### 2.2 Components

| Component | Responsibility | Location |
| --- | --- | --- |
| `AuthProvider` | Context provider for auth state | `src/auth/AuthContext.tsx` |
| `useAuth` | Hook for accessing auth | `src/auth/useAuth.ts` |
| `AuthService` | API calls for auth operations | `src/auth/authService.ts` |
| `SecureStorage` | Token persistence | expo-secure-store |
| `SessionManager` | Session lifecycle | `src/auth/session.ts` |

### 2.3 Token Strategy

**Recommendation**: JWT stored in expo-secure-store with rotation

- **Access Token**: Short-lived (15 min), stored securely
- **Refresh Token**: Long-lived (30 days), stored securely, **rotated on each use**
- **No localStorage**: Security risk on mobile

```typescript
// Token structure
interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // timestamp
}
```

**Security Enhancement (per @Security review)**:
- Implement **refresh token rotation** - issue new refresh token on each refresh request to limit token replay attacks
- Invalidate old refresh token after successful rotation

### 2.4 Session Management

```typescript
// Session restoration on app launch
1. Load tokens from secure storage
2. Check token expiration
3. If valid, restore session
4. If expired, attempt refresh (with token rotation)
5. If refresh fails, show login
```

### 2.5 Password Reset Flow

```
1. User enters email → POST /auth/forgot-password
2. Server sends reset email with token
3. User clicks link → opens app with token
4. User enters new password → POST /auth/reset-password
5. Token invalidated, user redirected to login
```

### 2.6 Protected Routes

Use Expo Router middleware or layout-based auth check:

```typescript
// app/(authenticated)/_layout.tsx
<AuthGuard>
  <Tabs />
</AuthGuard>
```

---

## 3. Security Considerations

### Trust Boundaries

| Boundary | Risk | Mitigation |
| --- | --- | --- |
| Client → API | MITM | HTTPS only (enforced server-side) |
| Token Storage | Device compromise | expo-secure-store |
| Session Hijacking | Token theft | Short-lived tokens + refresh rotation |
| Password Reset | Account takeover | Email verification |
| CSRF | Cross-site requests | CSRF token via Authorization header |

### Security Implementation Constraints (per @Security Review)

1. **Refresh Token Rotation**: Implement refresh rotation on each refresh request
2. **CSRF Protection**: Add server-side CSRF token validation on all state-changing auth endpoints
3. **Password Policy**: Document and enforce minimum requirements:
   - Length: 8+ characters
   - Complexity: mixed case, numbers, special characters
   - Common password blocklist check
4. **Audit Logging**: Log authentication events (login, logout, password reset)
5. **Rate Limiting**: Add rate limiting on auth endpoints to prevent brute force
6. **Account Lockout**: Implement lockout policy after failed attempts

### Deferred to Phase 2
- Government ID verification
- OAuth (Google, Apple)
- Ejar integration
- Biometric authentication
- 2FA/MFA

---

## 4. Password Policy (Required)

**Implementation Requirements**:

```typescript
// Password validation rules
const passwordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  blockCommonPasswords: true, // check against known breach lists
  maxAttempts: 5, // before lockout
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
};
```

**Client-side**: Show real-time validation feedback
**Server-side**: Enforce on all password endpoints

---

## 5. Implementation Path

### Phase 1 (MVP)
1. Create auth context and provider
2. Implement secure token storage with rotation
3. Build login/signup screens with password validation
4. Add password reset flow
5. Implement session restoration with rotation
6. Add protected route guards
7. Add CSRF token validation
8. Add rate limiting middleware
9. Add audit logging
10. Add account lockout logic

### File Structure
```
src/
  auth/
    AuthContext.tsx
    useAuth.ts
    authService.ts
    session.ts
    types.ts
    passwordPolicy.ts
app/
  (auth)/
    login.tsx
    signup.tsx
    forgot-password.tsx
  (authenticated)/
    _layout.tsx
    ...
```

---

## 6. Security Review Summary

**Reviewer**: @Security  
**Review Issue**: [FIN-32](/FIN/issues/FIN-32)  
**Status**: Approved with Implementation Constraints

### Addressed Findings
- ✅ Token Rotation Strategy: Added refresh token rotation
- ⚠️ CSRF Protection: To be implemented (server-side validation)
- ⚠️ Device-Bound Sessions: Deferred design decision to Phase 2
- ⚠️ Password Policy: To be documented and enforced
- ✅ Trust Boundary Mapping: Adequate (HTTPS enforced)

### Residual Risks (Deferred)
- Rate limiting (to be added)
- Account lockout (to be added)
- 2FA/MFA (Phase 2)

---

## 7. Next Steps

- [x] Route to @Security for threat review (completed)
- [ ] Route to @Pilot for implementation approval
- [ ] Create implementation tickets with security constraints