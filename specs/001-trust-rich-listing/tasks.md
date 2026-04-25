# Tasks: Trust-Rich Listing Experience

**Input**: Design documents from `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/`
**Prerequisites**: [plan.md](/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/plan.md), [spec.md](/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/spec.md)

**Tests**: Use the plan-defined verification gates: `npm run typecheck`, `npx expo export --platform web`, and manual EN/AR validation on `discover` and `room/[id]`.

**Organization**: Tasks are grouped by user story and assigned to specialist-owned slices. Sequential execution is the default.

## Phase 1: Setup

**Purpose**: Confirm the execution baseline and establish the feature task artifact.

- [x] T001 [owner:agent-orchestrator] Review `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/spec.md` and `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/plan.md` against the current Expo app structure in `/Users/hanyramadan/find-your-room/app` and `/Users/hanyramadan/find-your-room/src`
- [x] T002 [owner:agent-docs] Create and maintain the execution checklist in `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/tasks.md`

---

## Phase 2: Foundational

**Purpose**: Shared trust, pricing, and localization foundations that every user story depends on.

**⚠️ CRITICAL**: No user story work should start until this phase is complete.

- [x] T003 [owner:agent-orchestrator] Expand the shared listing contract in `/Users/hanyramadan/find-your-room/src/data/find-your-room.ts` for structured trust sources, bounded fit framing, richer pricing breakdowns, safer host disclosure, and household summary fields
- [x] T004 [owner:agent-docs] Update listing fixture content in `/Users/hanyramadan/find-your-room/src/i18n/data/en.json` to populate the new trust, pricing, host, media, and household contract fields
- [x] T005 [owner:agent-docs] Update listing fixture content in `/Users/hanyramadan/find-your-room/src/i18n/data/ar.json` to mirror the new trust, pricing, host, media, and household contract fields
- [x] T006 [owner:agent-docs] Add shared trust, pricing, and disclosure copy keys in `/Users/hanyramadan/find-your-room/src/i18n/common/en.json` and `/Users/hanyramadan/find-your-room/src/i18n/room/en.json` for structured evidence labels and safer verification wording
- [x] T007 [owner:agent-docs] Add shared trust, pricing, and disclosure copy keys in `/Users/hanyramadan/find-your-room/src/i18n/common/ar.json` and `/Users/hanyramadan/find-your-room/src/i18n/room/ar.json` for structured evidence labels and safer verification wording
- [x] T008 [owner:agent-impeccable] Define any shared visual treatment needed for trust evidence rows or grouped metadata in `/Users/hanyramadan/find-your-room/src/components/Pill.tsx` and `/Users/hanyramadan/find-your-room/src/ui/theme.ts`

**Checkpoint**: Foundation ready. Story work can now begin sequentially.

---

## Phase 3: User Story 1 - Trust The Listing Faster (Priority: P1) 🎯 MVP

**Goal**: Make trust feel structured and evidence-based on cards and on the detail header flow.

**Independent Test**: Open `discover`, compare multiple cards, open `room/[id]`, and verify users can tell what is verified, self-reported, and gated without relying on decorative badge clutter.

- [x] T009 [US1] [owner:agent-implementer] Refactor `/Users/hanyramadan/find-your-room/src/components/ListingCard.tsx` to show a compact trust snapshot, calmer fit framing, stronger listing identity, and a structured household preview
- [x] T010 [US1] [owner:agent-implementer] Rework `/Users/hanyramadan/find-your-room/app/room/[id].tsx` so the top of the page becomes a decision header with trust summary, grouped evidence, and safer host framing
- [x] T011 [US1] [owner:agent-docs] Update `/Users/hanyramadan/find-your-room/src/i18n/room/en.json` and `/Users/hanyramadan/find-your-room/src/i18n/room/ar.json` to support the new trust section hierarchy and evidence wording

**Checkpoint**: Trust cues are understandable and distinguish provenance on both primary listing surfaces.

---

## Phase 4: User Story 2 - Understand The Real Offer Clearly (Priority: P2)

**Goal**: Make the monthly offer, inclusions, exclusions, and household context easy to scan without reading dense paragraphs.

**Independent Test**: Open a room detail page and confirm the pricing block and household snapshot explain the real offer, included costs, excluded costs, resident vibe, languages, and expectations clearly.

- [x] T012 [US2] [owner:agent-product] Confirm the offer-clarity slice in `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/spec.md` and update the spec if the non-trivial slice changed
- [x] T013 [US2] [owner:agent-design] Rebuild the pricing and household sections in `/Users/hanyramadan/find-your-room/app/room/[id].tsx` around the new structured pricing and household data
- [x] T014 [US2] [owner:agent-implementer] Tune the offer-summary area in `/Users/hanyramadan/find-your-room/src/components/ListingCard.tsx` so card-level pricing and household cues align with the detail-page breakdown
- [x] T015 [US2] [owner:agent-docs] Update pricing, household, and expectation labels in `/Users/hanyramadan/find-your-room/src/i18n/common/en.json`, `/Users/hanyramadan/find-your-room/src/i18n/common/ar.json`, `/Users/hanyramadan/find-your-room/src/i18n/room/en.json`, and `/Users/hanyramadan/find-your-room/src/i18n/room/ar.json`
- [x] T016 [US2] [owner:agent-security] Review pricing clarity and disclosure wording across `/Users/hanyramadan/find-your-room/app/room/[id].tsx` and `/Users/hanyramadan/find-your-room/src/components/ListingCard.tsx`
- [x] T017 [US2] [owner:agent-tester] Verify the offer and household clarity slice on `discover` and `room/[id]`

**Checkpoint**: Users can understand the real offer and home setup quickly from both card and detail views.

---

## Phase 5: User Story 3 - Browse With More Confidence (Priority: P3)

**Goal**: Improve scanability, media hierarchy, and privacy-safe location framing while keeping the feed performant.

**Independent Test**: Browse `discover`, confirm scrolling stays stable, open `room/[id]`, and verify location remains neighborhood-level while imagery and listing hierarchy feel more intentional.

- [x] T018 [US3] [owner:agent-product] Confirm the browse-confidence slice in `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/spec.md` and update the spec if the non-trivial slice changed
- [x] T019 [US3] [owner:agent-performance] Update `/Users/hanyramadan/find-your-room/app/(tabs)/discover.tsx` to preserve the `FlatList` feed structure while tightening list spacing, header flow, and richer card rendering constraints
- [x] T020 [US3] [owner:agent-design] Refine media and location presentation in `/Users/hanyramadan/find-your-room/app/room/[id].tsx` to emphasize one hero image, optional lightweight media count cues, and approximate location language
- [x] T021 [US3] [owner:agent-implementer] Align card-level location and media cues in `/Users/hanyramadan/find-your-room/src/components/ListingCard.tsx` with the privacy-safe detail-page treatment
- [x] T022 [US3] [owner:agent-security] Review privacy-safe location framing across `/Users/hanyramadan/find-your-room/app/(tabs)/discover.tsx`, `/Users/hanyramadan/find-your-room/app/room/[id].tsx`, and `/Users/hanyramadan/find-your-room/src/components/ListingCard.tsx`
- [x] T023 [US3] [owner:agent-tester] Verify browse-confidence behavior and privacy-safe disclosure on `discover` and `room/[id]`

**Checkpoint**: The feed feels more intentional and trustworthy without exposing exact-address behavior or regressing scroll performance.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the whole phase and close the loop on quality, safety, and documentation.

- [x] T024 [owner:agent-tester] Run `npm run typecheck` from `/Users/hanyramadan/find-your-room` and fix any resulting issues in touched files
- [x] T025 [owner:agent-tester] Run `npx expo export --platform web` from `/Users/hanyramadan/find-your-room` and fix any resulting issues in touched files
- [x] T026 [owner:agent-tester] Perform manual EN/AR and RTL/LTR verification on `/Users/hanyramadan/find-your-room/app/(tabs)/discover.tsx` and `/Users/hanyramadan/find-your-room/app/room/[id].tsx`, then record follow-up notes in `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/plan.md` or adjacent feature notes if needed
- [x] T027 [owner:agent-reviewer] Review the final UI for trust wording, disclosure safety, and card/detail density across `/Users/hanyramadan/find-your-room/src/components/ListingCard.tsx` and `/Users/hanyramadan/find-your-room/app/room/[id].tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup** must be complete before foundational work starts.
- **Phase 2: Foundational** blocks all user stories because the listing contract and localization keys are shared.
- **Phase 3: User Story 1** is the MVP and should land first once Phase 2 is done.
- **Phase 4: User Story 2** should begin only after US1 is complete and the next non-trivial slice is approved.
- **Phase 5: User Story 3** should begin only after US2 is complete and the next non-trivial slice is approved.
- **Phase 6: Polish** depends on all desired user stories being complete.

### Sequential Specialist Handoffs

- Execute one specialist-owned slice at a time.
- Do not parallelize work across `ListingCard.tsx` and `app/room/[id].tsx` by default.
- Only add a concurrency exception if the user explicitly approves it.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1.
2. Complete Phase 2.
3. Complete Phase 3.
4. Validate trust clarity and provenance framing before moving on.

### Incremental Delivery

1. Setup + Foundational
2. US1 trust clarity
3. Update the spec and get approval for the next non-trivial slice
4. US2 offer clarity
5. Update the spec and get approval for the next non-trivial slice
6. US3 browse confidence
7. Final polish and verification

### Suggested Next Execution Slice

1. Update or confirm the spec for the next non-trivial slice
2. Get user approval
3. Execute the next specialist-owned US2 block in order
