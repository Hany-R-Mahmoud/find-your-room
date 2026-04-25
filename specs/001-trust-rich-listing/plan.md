# Implementation Plan: Trust-Rich Listing Experience

**Branch**: `[001-trust-rich-listing]` | **Date**: 2026-04-21 | **Spec**: [spec.md](/Users/hanyramadan/showrooms/specs/001-trust-rich-listing/spec.md)
**Input**: Approved Phase 1 feature specification from `/specs/001-trust-rich-listing/spec.md`

> Gate: this plan is based on an approved spec and on a multi-agent planning
> pass across design, UI polish, security, performance, review, and testing.

## Summary

Phase 1 will improve trust and clarity on the two critical seeker surfaces:

- `discover` listing cards
- `room detail`

The implementation should make trust feel structured and evidence-based rather
than decorative. The main frontend differentiators for this phase are:

- explicit trust summary on cards
- trust evidence block on detail
- clearer pricing breakdown
- clearer household snapshot
- safer public disclosure of host, location, and compatibility information

## Technical Context

**Language/Version**: TypeScript, React Native via Expo  
**Primary Dependencies**: Expo Router, React Native, expo-linear-gradient  
**Storage**: local mock data through `src/i18n/data/*.json` and `src/data/roommatch.ts`  
**Testing**: `npm run typecheck`, `npx expo export --platform web`, manual EN/AR screen validation  
**Target Platform**: Expo mobile prototype and web export  
**Project Type**: mobile app prototype  
**Performance Goals**: maintain smooth scrolling on discover and avoid heavier card rendering during Phase 1  
**Constraints**: frontend-only, bilingual, RTL/LTR-safe, no misleading verification claims, neighborhood-level privacy only  
**Scale/Scope**: `discover`, `room/[id]`, shared listing data contract, shared trust/pill primitives as needed

## Constitution Check

### Pass

- Starts from approved spec
- Keeps the work frontend-only and narrow
- Aligns with Riyadh-first, trust-first RoomMatch direction
- Uses specialist-agent collaboration during planning

### Required Cautions

- Do not overstate verification or compatibility certainty
- Do not expose too much identifying listing information before mutual interest
- Do not make cards denser by simply stacking more pills

## Project Structure

### Documentation (this feature)

```text
specs/001-trust-rich-listing/
├── plan.md
├── spec.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
app/
├── (tabs)/
│   └── discover.tsx
└── room/
    └── [id].tsx

src/
├── components/
│   ├── ListingCard.tsx
│   ├── Pill.tsx
│   └── Screen.tsx
├── data/
│   └── roommatch.ts
└── i18n/
    ├── common/
    ├── data/
    └── room/
```

**Structure Decision**: keep the current Expo app structure and make surgical
changes to the listing surfaces, data contract, and localized copy only.

## Multi-Agent Synthesis

### Recorded Specialist Planning Passes

1. `agent-orchestrator`
   Scope: frame the trust-rich listing work into bounded slices and order the work.
2. `agent-product`
   Scope: prioritize trust clarity before offer clarity and browse polish.
3. `agent-design`
   Scope: shape the information hierarchy so trust and price lead the experience.
4. `agent-impeccable`
   Scope: refine density, visual grouping, and UI polish expectations.
5. `agent-architect`
   Scope: keep the work frontend-only and limit structural impact to data contract plus listing surfaces.
6. `agent-security`
   Scope: review disclosure, verification wording, and privacy-safe location framing.
7. `agent-performance`
   Scope: keep card density bounded and preserve feed performance.
8. `agent-reviewer`
   Scope: inspect regression risk and honesty of the trust model.
9. `agent-tester`
   Scope: define verification gates for EN/AR, RTL/LTR, and static safety checks.

No relevant specialist was intentionally skipped during planning for this feature.

### Design Direction

- Make the UI feel like careful decision support, not a generic property board
- Trust should be visible before fit explanation
- Price and trust should outrank highlights and rules

### UI Polish Direction

- Turn trust from badge clutter into evidence structure
- Make the detail page top area feel like a decision header
- Make pricing and household sections feel more intentional and premium

### Security Direction

- Reduce stacked identity disclosure on public surfaces
- Replace absolute verification language with scoped, source-aware wording
- Soften exact `% fit` presentation into less absolute compatibility framing

### Performance Direction

- Convert `discover` from `ScrollView` to a virtualized list
- Keep Phase 1 trust additions mostly textual and structured
- Avoid rich media additions before list virtualization

### Review Direction

- Expand the data model first so the UI can honestly separate verified,
  self-reported, and gated information
- Fix locale-keyed trust display issues instead of relying on English text

### Testing Direction

- Verify trust clarity, pricing clarity, RTL/LTR behavior, and visual stability
- Run typecheck and Expo web export as the minimum static safety gate

## Implementation Workstreams

### Workstream 1: Reshape The Mock Listing Contract

Update the RoomMatch listing content model before touching UI hierarchy.

**Required changes**

- Replace flat trust badge usage with structured trust groups:
  - verified by RoomMatch
  - provided by host
  - gated or shown later
- Expand pricing content with safe, frontend-only fields:
  - headline monthly amount
  - included costs summary
  - excluded or variable costs summary
- Expand household summary with clearer structured fields:
  - residents
  - vibe
  - languages
  - expectations
- Replace early-funnel host naming with role-safe host labels where appropriate
- Replace exact compatibility percentage emphasis with bounded fit framing
- Replace text-driven trust UI conditions with keyed states so Arabic and English
  behave consistently

**Likely files**

- `src/data/roommatch.ts`
- `src/i18n/data/en.json`
- `src/i18n/data/ar.json`
- `src/i18n/common/en.json`
- `src/i18n/common/ar.json`
- `src/i18n/room/en.json`
- `src/i18n/room/ar.json`

### Workstream 2: Upgrade Discover Into A Trust-Led Feed

Improve performance and card hierarchy together.

**Required changes**

- Replace eager `ScrollView` rendering on `discover` with a virtualized list
- Keep the existing page intro, but move listing rendering into a `FlatList`
- Update `ListingCard` to show:
  - stronger listing identity
  - compact trust snapshot
  - clearer offer zone
  - smaller or less dominant fit emphasis
  - structured household snapshot
- Limit high-signal trust cues on cards to 2-3 items
- Avoid turning the card into a mini detail page

**Likely files**

- `app/(tabs)/discover.tsx`
- `src/components/ListingCard.tsx`
- `src/components/Screen.tsx` only if shared list behavior needs extraction

### Workstream 3: Rebuild Room Detail As A Decision Header + Evidence Flow

Make the top of the detail screen answer trust, cost, and household questions
before secondary content.

**Required changes**

- Restructure the top area into:
  - hero
  - trust summary / evidence block
  - price breakdown
  - household snapshot
  - fit explanation
- Replace pill-only trust section with grouped evidence rows
- Keep location approximate and clearly framed as privacy-safe
- Improve host card structure without exposing more than needed
- Keep media treatment simple in this phase:
  - one main hero image
  - optional lightweight image count or secondary cue only if the data supports it

**Likely files**

- `app/room/[id].tsx`
- `src/components/Pill.tsx` if trust row treatment needs shared support

### Workstream 4: Verification And Safety Pass

Validate that the new UI is clearer without becoming heavier or riskier.

**Required checks**

- EN/AR visual pass on `discover` and `room detail`
- RTL/LTR row direction and alignment checks
- trust copy check to avoid overclaiming verification
- discover scroll performance sanity check
- static gates:
  - `npm run typecheck`
  - `npx expo export --platform web`

## Implementation Sequence

1. Expand and normalize the listing data contract
2. Update localized copy and trust language
3. Convert `discover` to a virtualized list
4. Rework `ListingCard` into a trust-led card
5. Rework `room detail` into a decision header + evidence flow
6. Run manual EN/AR verification and static checks
7. Run specialist review passes again before closing the phase

## Specialist Checkpoints

- `agent-design`: confirm hierarchy and information grouping before UI coding is finalized
- `agent-impeccable`: review visual polish and density before signoff
- `agent-security`: review wording, public disclosure, and trust provenance
- `agent-performance`: confirm list virtualization and card density choices
- `agent-reviewer`: inspect data-model honesty and regression risk
- `agent-tester`: run the verification checklist and gate signoff

## Specialist Execution Default

- Execute the approved work back-to-back by specialist-owned slices.
- Do not assume parallel implementation across the listing card and room detail files.
- If a future phase needs a concurrency exception, get explicit user approval first and record it in the task artifact.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Structured mock trust model | Needed to honestly separate trust sources | Flat badges would create cosmetic trust without clarity |
| Discover `FlatList` migration | Needed to keep Phase 1 safe as cards become richer | Keeping `ScrollView` would add UI density on a weaker rendering path |

## Phase 6 Follow-up Notes

- `npm run typecheck` passes after excluding generated `dist` output from
  `/Users/hanyramadan/showrooms/tsconfig.json`.
- `npx expo export --platform web` passes and produces a fresh web export.
- Manual EN/AR and RTL/LTR visual verification is still pending. The current
  environment exposed Expo dev-server port conflicts, and browser automation
  was not available for a rendered spot-check, so the final visual pass should
  be completed interactively before full signoff.
