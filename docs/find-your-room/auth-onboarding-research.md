# Research Brief: Authentication & Onboarding

## Executive Summary

Research task: FIN-12 - Research new feature opportunities with authentication as the first concrete example.

This brief addresses authentication and onboarding for the find-your-room shared housing marketplace, with focus on trust-first principles and Saudi Arabia regulatory context.

---

## Source Evidence

### 1. Roommate/Rental App Best Practices (2025-2026)

| Platform | Verification Approach | Key Insight |
|----------|----------------------|-------------|
| Roomies | Government ID + selfie, Stripe Verify | ID verification increases trust signals |
| SnapTrust | 10-second biometric liveness check | Real-time verification for roommate mutual trust |
| MyRoomy | Government ID + AI photo comparison | 94% reduction in fake profiles |
| iROOMit | Triple-layer: ID + criminal + credit | Verified users receive 300% more inquiries |
| Shreek Sakn (Saudi) | Active moderation + flagging | Community-driven trust |

### 2. Saudi Arabia Regulatory Context

| Requirement | Source | Implication |
|-------------|--------|------------|
| Ejar rental contract registration | Mandatory (REGA 2025) | All leases must be documented |
| Ejar identity verification | Nafath/Absher integration | Landlord/tenant identity confirmed digitally |
| SAMA registration controls | Rulebook 3.1-3.9 | Phone number + National ID linkage required |
| KYC for financial services | SAMA + AML/CFT | Not mandatory for non-financial platforms |
| Rental broker licensing | REGA regulation | Required for commercial property management |

### 3. Expo/React Native Authentication Patterns

- **Secure storage**: expo-secure-store (iOS Keychain, Android Keystore)
- **Session restoration**: Token check at app boot with biometric prompt
- **Token strategy**: Short-lived access tokens + refresh token rotation
- ** MFA**: Push-based preferred, TOTP fallback, avoid SMS-only

---

## Findings: Trust-First Framework

### What Matters Most for This Product

1. **Mutual verification** - Both room seeker and master tenant verify identity before communication
2. **Government ID baseline** - National ID or Iqama verification (not just phone/email)
3. **Ejar integration awareness** - Property verification through Ejar registration status
4. **Reputation continuity** - Profile verification badge increases match rates significantly
5. **Safety-first communication** - In-app messaging until both parties verify

### Risk Factors to Address

- Ghost landlord scams (most common rental fraud)
- Fake listings from unverified accounts
- Account takeover after credential compromise
- Identity theft in shared-living context

---

## MVP Scope Recommendation

### Phase 1: Core Authentication (MVP)

| Feature | Included in MVP? | Deferred |
|---------|------------------|----------|
| Phone + Email verification | ✅ Yes | - |
| Password-based sign-up/sign-in | ✅ Yes | - |
| Secure token storage (expo-secure-store) | ✅ Yes | - |
| Session restoration with biometrics | ✅ Yes | - |
| Forgot password flow | ✅ Yes | - |
| Government ID verification | ❌ Later | Phase 2 |
| Biometric liveness check | ❌ Later | Phase 2 |
| Ejar integration | ❌ Later | Phase 2 |
| Background/criminal checks | ❌ Later | Phase 3 |
| Social OAuth (Google/Apple) | ❌ Later | Phase 2 |

### Phase 2: Trust Enhancement

- Government ID upload + selfie comparison
- OAuth sign-in (Google, Apple)
- Verification badge display on profiles
- Ejar contract verification status

### Phase 3: Trust Premium

- Full background verification
- Credit/reputation scoring
- Ejar property verification sync

---

## Saudi Arabia Specific Considerations

### Must-Need for MVP

1. **Bilingual support** - Arabic and English from the start (already in i18n structure)
2. **Iqama acceptance** - National ID alternative for expat residents
3. **Phone verification** - LocalSaudi carrier compatibility
4. **Ejar reference** - Display "Ejar registered" status as trust signal (without backend integration)

### Regulatory Watch

- SAMA authentication rules apply primarily to fintech
- REGA/Ejar requirements focus on lease documentation, not identity
- No mandatory KYC for marketplace platforms (non-financial)

---

## Open Risks and Specialist Handoff Map

| Area | Owner Needed | Priority |
|------|-------------|----------|
| Auth architecture design | @Architect | High |
| Security review | @Security | High |
| Auth UI/flow design | @Design | Medium |
| Implementation planning | @Pilot | High |
| Product spec | @Product | High |

---

## Recommendation

**Start with phone + email + password authentication** using Expo best practices:

1. Use `expo-secure-store` for token storage
2. Implement session restoration with biometrics option
3. Build forgot password with email OTP
4. Skip government ID for MVP (defer to Phase 2)
5. Add "verification pending" badge on user profiles

This gives a functional auth system while building toward trust signals that matter.

---

## Research Confidence

- **Confirmed**: Expo secure storage and session patterns
- **Confirmed**: Saudi Ejar registration requirements
- **Confirmed**: Industry verification approaches (Roomies, SnapTrust, MyRoomy)
- **Inferred**: MVP auth scope recommendation based on patterns across platforms
- **Open**: Final backend architecture depends on @Architect