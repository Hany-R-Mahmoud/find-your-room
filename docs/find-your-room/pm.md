# Product Manager Documentation

## Product Vision

Find-your-room helps expats and young professionals in Riyadh find a room and compatible household faster and more safely than fragmented listing channels.

## Product Principles

- **Trust before transaction** - Users should feel confident before contacting hosts
- **Explain the fit** - Don't hide matching logic behind "AI" - show users why
- **Approximate location first** - Privacy-preserving address display
- **Respectful tone** - Housing-focused, not social-discovery focused
- **Bilingual from start** - English and Arabic support

## Current Status (as of April 2026)

### What's Built

| Feature | Status | Notes |
|---------|--------|-------|
| Landing page | Done | EN/AR support |
| Onboarding flow | Done | Budget, move date, preferences |
| Discover feed | Done | Room listing cards |
| Room detail page | Done | Trust signals, household context |
| Matches | Done | Match tracking |
| Inbox | Done | Message threads |
| My Stay | Done | Move-in progress tracking |
| Profile | Done | Basic user profile |
| Host mode | Preview | Light version only |
| RTL support | Partial | Pending polish |

### In Progress

- **Phase 1: Trust-Rich Listing** - Core implementation completed, awaiting manual visual review
- **Phase 7: Civic Trust Redesign** - Design spec approved, execution in progress

## Roadmap Summary

See [frontend-roadmap.md](./frontend-roadmap.md) for detailed phase tracking.

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Trust-Rich Listing | In Progress |
| 2 | Compatibility-First Matching | Proposed |
| 3 | Better Request Flow | Proposed |
| 4 | Saved Search & Alerts | Proposed |
| 5 | Move-In Readiness | Proposed |
| 6 | Host Preview | Deferred |
| 7 | Civic Trust Redesign | In Progress |

## Key Decisions

1. **Riyadh-first** - Narrowed from city-agnostic to specific market
2. **Demanded-focused start** - Seeker-side UX priority over host-side
3. **Trust as wedge** - Differentiates from generic listing boards
4. **Shared rooms primary** - Narrowed from hotels, chalets, corporate housing
5. **Avoid social/dating framing** - Housing-only language throughout

## Technical Constraints

- Mock data only - no backend API yet
- Expo SDK 52+ for cross-platform
- No real authentication implemented
- No real payment flow
- No push notifications

## Risks & Mitigations

See [open-risks.md](./open-risks.md) for full risk register.

### Immediate Concerns

1. **Inventory quality** - Matching won't matter with weak supply
2. **Verification workflow** - Identity, listing legitimacy still manual
3. **RTL polish** - Arabic UI needs visual review before release
4. **Backend decisions** - Auth, payments, storage still open

### Deferred Scope

- City expansion beyond Riyadh
- Hotel/chalet inventory
- Corporate housing tools
- Smart lock integration
- Full payment flows

## Next Priority

After completing Phase 1 and Phase 7:

1. Complete Arabic RTL visual review
2. Begin Phase 2 (Compatibility-First Matching)
3. Identify and onboard initial host supply
4. Make backend architecture decisions

## Related Documentation

- [PRD](./prd.md) - Detailed product requirements
- [Frontend Roadmap](./frontend-roadmap.md) - Phase-by-phase tracker
- [Open Risks](./open-risks.md) - Risk register
- [Spec Kit artifacts](./specs/) - Detailed feature specifications