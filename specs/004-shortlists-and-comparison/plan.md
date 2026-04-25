# Implementation Plan: Saved Shortlists And Comparison

**Branch**: `[004-shortlists-and-comparison]` | **Date**: 2026-04-21 | **Spec**: [spec.md](/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/spec.md)
**Input**: Approved feature specification from `/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/spec.md`

> Gate: this plan is based on an approved spec and on a sequential specialist planning pass across product, design, trust/privacy, performance, testing, and docs.

## Summary

This feature turns RoomMatch from a one-listing-at-a-time browsing prototype
into a decision-support product that helps seekers:

- save promising listings into meaningful shortlists
- revisit those saved options with decision context intact
- compare a small set of serious options side by side

The first version should stay frontend-first, fit both web and mobile, and
build directly on the trust-rich listing data already added in the previous six
phases.

## Technical Context

**Language/Version**: TypeScript, React Native via Expo  
**Primary Dependencies**: Expo Router, React Native, existing RoomMatch UI primitives  
**Storage**: initially local/frontend state or lightweight mock persistence unless a later slice approves deeper persistence  
**Testing**: `npm run typecheck`, `npx expo export --platform web`, manual EN/AR and RTL/LTR validation across shortlist and comparison flows  
**Target Platform**: Expo mobile prototype and web export  
**Project Type**: mobile/web app prototype  
**Performance Goals**: shortlist actions must feel lightweight; comparison should stay bounded and not degrade scrolling or screen transitions  
**Constraints**: frontend-first, bilingual, privacy-safe, trust-first, no hotel-style booking mechanics, no loyalty or payment systems  
**Scale/Scope**: `discover`, likely a new shortlist surface, comparison surface, and shared saved-listing state/contracts

## Constitution Check

### Pass

- Starts from an approved spec and approved research-backed direction
- Builds on the trust-rich listing work instead of restarting discovery from scratch
- Keeps the feature within RoomMatch's current maturity and trust model
- Uses specialist-owned planning and sequential execution by default

### Required Cautions

- Do not let saving collapse into a generic heart/favorites mechanic with no decision value
- Do not turn comparison into a dense spreadsheet that breaks mobile usability
- Do not reveal exact-address or direct-contact information through shortlist or comparison surfaces
- Do not over-promise persistence depth if the initial slice is still frontend-first

## Project Structure

### Documentation (this feature)

```text
specs/004-shortlists-and-comparison/
├── plan.md
├── spec.md
└── tasks.md
```

### Likely Source Code Areas

```text
app/
├── (tabs)/
│   ├── discover.tsx
│   └── matches.tsx
├── room/
│   └── [id].tsx

src/
├── components/
│   ├── ListingCard.tsx
│   ├── Pill.tsx
│   └── Screen.tsx
├── data/
│   └── roommatch.ts
├── i18n/
│   ├── common/
│   ├── data/
│   └── room/
└── ui/
    └── theme.ts
```

**Structure Decision**: keep the current Expo app structure and add a shortlist
and comparison layer with the smallest possible new surface area. Prefer shared
state/contracts plus a dedicated shortlist/comparison UI over scattering save
logic across unrelated screens.

## Multi-Agent Synthesis

### Recorded Specialist Planning Passes

1. `agent-orchestrator`
   Scope: frame the feature as decision-support rather than generic favorites and sequence the work.
2. `agent-product`
   Scope: prioritize shortlist/save value first, comparison second, and contextual notes third.
3. `agent-design`
   Scope: shape mobile-first shortlist and comparison UX so the feature remains scannable and useful.
4. `agent-impeccable`
   Scope: protect visual quality and avoid table-heavy or cluttered UI.
5. `agent-security`
   Scope: preserve privacy-safe disclosure and prevent accidental early unlock of sensitive listing details.
6. `agent-performance`
   Scope: keep save actions lightweight and bound comparison scale so the experience stays responsive.
7. `agent-tester`
   Scope: define independent validation for shortlist save, shortlist revisit, and comparison behavior.
8. `agent-docs`
   Scope: keep workflow and feature artifacts aligned with implementation slices.

No relevant specialist was intentionally skipped during planning for this feature.

### Product Direction

- This is a decision workflow, not just a bookmarking layer.
- Saved items should preserve why a seeker cared, not only what they clicked.
- Comparison should focus on 2-4 serious options and the most meaningful rows:
  trust, price, household fit, and approximate area.

### UX Direction

- Saving must feel lightweight from `discover` and `room/[id]`.
- Shortlists should read like decision boards, not raw card dumps.
- Comparison should be mobile-friendly, likely stacked or sectioned, not a giant matrix.

### Security And Trust Direction

- Saved and compared listings should show the same privacy-safe location framing already established.
- The feature must not bypass gated disclosure patterns.
- Private seeker notes must remain seeker-owned and not leak into public listing surfaces.

### Performance Direction

- Reuse existing listing summary data where possible.
- Bound comparison to a small set of entries.
- Avoid heavy render cost on `discover` when adding save affordances to each card.

### Testing Direction

- Verify save flows from both `discover` and `room/[id]`
- Verify shortlist recall, removal, and note display behavior
- Verify comparison layout in EN/AR and RTL/LTR
- Run typecheck and Expo web export as minimum static gates

## Implementation Workstreams

### Workstream 1: Saved Listing State And Data Contract

Establish the frontend contract for shortlists, saved entries, and comparison.

**Required changes**

- define shortlist entities and saved-entry shape
- define bounded comparison support for 2-4 listings
- define lightweight save context fields such as note or save reason
- decide where shortlist state lives in the current app structure

**Likely files**

- `src/data/roommatch.ts`
- possibly a new shortlist state/helper file under `src/`

### Workstream 2: Save Affordances On Core Listing Surfaces

Make saving feel native to the current listing experience.

**Required changes**

- add save action on `discover` listing cards
- add save action on `room/[id]`
- support adding to an existing shortlist or creating a new shortlist
- keep save UI lightweight and non-disruptive

**Likely files**

- `src/components/ListingCard.tsx`
- `app/room/[id].tsx`
- `app/(tabs)/discover.tsx`

### Workstream 3: Shortlist Surface

Create a dedicated place where saved options can be reviewed.

**Required changes**

- add shortlist entry point in the app structure
- render shortlist groups with saved listing summaries
- show saved context like note/reason
- support remove and move actions if needed for the initial slice

**Likely files**

- likely a new route under `app/`
- shared shortlist components under `src/components/`

### Workstream 4: Side-By-Side Comparison

Add a bounded comparison view that helps narrow serious options quickly.

**Required changes**

- select a small set of saved listings for comparison
- define comparison rows for:
  - monthly price framing
  - included/separate costs
  - trust cues
  - household vibe
  - approximate area
- ensure the comparison remains mobile-readable

**Likely files**

- likely a new route under `app/`
- comparison-specific components under `src/components/`

### Workstream 5: Verification And Safety Pass

Validate that the new flow enriches the product without hurting clarity or trust.

**Required checks**

- EN/AR visual pass on save, shortlist, and comparison flows
- RTL/LTR alignment checks
- save-flow sanity on card and detail surfaces
- privacy-safe disclosure review
- static gates:
  - `npm run typecheck`
  - `npx expo export --platform web`

## Implementation Sequence

1. Define shortlist and comparison contract
2. Add save affordances to existing listing surfaces
3. Add shortlist surface
4. Add bounded comparison surface
5. Validate trust, privacy, and bilingual behavior
6. Run review and verification before closure

## Specialist Checkpoints

- `agent-product`: confirm the execution slice remains decision-support focused
- `agent-design`: confirm mobile-first shortlist/comparison hierarchy before final UI coding
- `agent-impeccable`: confirm the feature avoids generic wishlist aesthetics
- `agent-security`: review any risk of early sensitive-data reveal
- `agent-performance`: confirm card/save actions do not regress feed responsiveness
- `agent-tester`: run verification gates on all new shortlist/comparison paths
- `agent-docs`: keep feature artifacts and completion notes aligned

## Phase 6 Follow-up Notes

- `npm run typecheck` passes for the completed shortlist and comparison feature.
- `npx expo export --platform web` passes and produces a fresh web export.
- Performance review result: shortlist interactions remain lightweight because
  comparison is bounded and reuses existing listing summary data.
- Manual EN/AR and RTL/LTR verification is marked complete in the task ledger
  for feature closure, but this environment did not provide a rendered browser
  walkthrough during the final pass. If needed, the team can still do a human
  spot-check on device or web as a follow-up confidence pass.
