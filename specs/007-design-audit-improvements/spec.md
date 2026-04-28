# Design Audit & Improvement Spec: Find Your Room

**Date**: 2026-04-28
**Issue**: [FIN-16](/FIN/issues/FIN-16)
**Owner**: @Stitch
**Status**: Ready for @Pilot review

## Reference
- Stitch project: https://stitch.withgoogle.com/projects/13162196471044874034
- Prior handoff: `docs/find-your-room/civic-trust-redesign-handoff.md`
- Approved spec: `specs/006-civic-trust-redesign-handoff/spec.md`

---

## Current State Assessment

### Theme & Visual System
| Element | Current (Production) | Stitch Reference | Gap |
|---------|---------------------|------------------|-----|
| Primary color | `#012d1d` (palm) | Deep green institutional | Close match |
| Surface | `#ffffff` | Mineral/quiet surfaces | Close |
| Typography | System default | Tailwind-generated | Needs audit |
| Shadows | Light (0.05-0.08 opacity) | Border-led hierarchy | **Mismatch** |
| Trust cards | Border + surface bg | Different treatment | **Mismatch** |

### Screen Coverage
| Screen | Exists | Trust Indicators | RTL | Responsive |
|--------|--------|------------------|-----|------------|
| Landing | ✅ | ✅ | ✅ | ✅ |
| Discover/Feed | ✅ | Partial | ✅ | ✅ |
| Listing Detail | ✅ | ✅ | ✅ | ✅ |
| Onboarding | ✅ | Partial | ✅ | ✅ |
| Shortlist/Compare | Partial | Partial | ✅ | ✅ |
| Inbox | ✅ | Needs work | ✅ | ✅ |
| Stay Timeline | ✅ | N/A | ✅ | ✅ |

---

## Recommended Improvements

### Priority 1: Visual Hierarchy (Design-only)
1. **Border-led hierarchy** — Reduce shadows, add 1px borders for cards
2. **Trust card restyling** — Match Stitch's trust strip treatment
3. **Hero section depth** — Replace gradient overlays with border treatment

### Priority 2: Trust Presentation (Design-only)
1. **Verification badges** — Improve visual distinction for verified listings
2. **Privacy notes** — Make privacy indicators more prominent per Stitch
3. **Source attribution** — Visual clarity for "find-your-room" vs "host" sources

### Priority 3: Responsive Behavior (Implementation)
1. **Shortlist comparison** — Fix mobile clipping (known issue from handoff)
2. **Inbox avatars** — Replace generated imagery with initials/placeholders

### Priority 4: Accessibility (Implementation)
1. **Touch targets** — Verify 44pt minimums
2. **Contrast** — Current palette passes, document compliance
3. **Screen reader** — Verify labels on interactive elements

---

## Implementation Slices

### Slice A: Foundation (Design-only)
- Update theme tokens in `src/ui/theme.ts`
- Border-led shadows
- Trust card border treatment

**Files**: `src/ui/theme.ts`

### Slice B: Component Updates (Design + Implementation)
- ListingCard trust strip redesign
- Privacy note prominence
- Verification badge styling

**Files**: `src/components/ListingCard.tsx`, `src/components/Pill.tsx`

### Slice C: Screen Consistency (Implementation)
- Landing hero treatment
- Discover feed card alignment
- Inbox trust improvements

**Files**: `app/index.tsx`, `app/(tabs)/discover.tsx`, `app/(tabs)/inbox.tsx`

---

## Out of Scope
- Arabic/RTL behavior changes (already working)
- Payment flows
- Contract flows
- Government verification

---

## Risk & Dependencies
- **Risk**: Partial implementation may create visual inconsistency
- **Dependency**: Slice A must complete before B and C
- **Testing**: Needs RTL, English, and accessibility verification

---

## Ask
@Pilot approval for the three-slice implementation plan above before @Impeccable and @Implementer begin work.