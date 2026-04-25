# Tasks: Saved Shortlists And Comparison

**Input**: Design documents from `/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/`
**Prerequisites**: [plan.md](/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/plan.md), [spec.md](/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/spec.md)

**Tests**: Use the plan-defined verification gates: `npm run typecheck`, `npx expo export --platform web`, and manual EN/AR validation across shortlist and comparison flows.

**Organization**: Tasks are grouped by user story and assigned to specialist-owned slices. Sequential execution is the default.

## Phase 1: Setup

**Purpose**: Confirm the execution baseline and establish the feature task artifact.

- [x] T001 [owner:agent-orchestrator] Review `/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/spec.md` and `/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/plan.md` against the current Expo app structure in `/Users/hanyramadan/showrooms/app` and `/Users/hanyramadan/showrooms/src`
- [x] T002 [owner:agent-docs] Create and maintain the execution checklist in `/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/tasks.md`

---

## Phase 2: Foundational

**Purpose**: Shared shortlist and comparison prerequisites that every story depends on.

**⚠️ CRITICAL**: No user story work should start until this phase is complete.

- [x] T003 [owner:agent-orchestrator] Expand the shared listing contract and shortlist entities in `/Users/hanyramadan/showrooms/src/data/roommatch.ts` and any new shortlist state file needed under `/Users/hanyramadan/showrooms/src`
- [x] T004 [owner:agent-security] Define privacy-safe shortlist and comparison display rules for saved listings, notes, and gated details in the relevant shortlist/comparison source files
- [x] T005 [owner:agent-docs] Add shortlist/comparison copy keys in the appropriate locale files under `/Users/hanyramadan/showrooms/src/i18n/`

**Checkpoint**: Foundation ready. Story work can now begin sequentially.

---

## Phase 3: User Story 1 - Save Listings Into Meaningful Shortlists (Priority: P1) 🎯 MVP

**Goal**: Let seekers save promising rooms into named shortlists from primary listing surfaces.

**Independent Test**: Browse `discover`, save multiple listings into one or more named shortlists, then reopen those shortlists and confirm the saved items persist with recognizable summary information.

- [x] T006 [US1] [owner:agent-product] Confirm the shortlist-saving slice and execution baseline in `/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/spec.md`
- [x] T007 [US1] [owner:agent-design] Shape the save affordance and shortlist entry UX in `/Users/hanyramadan/showrooms/src/components/ListingCard.tsx`, `/Users/hanyramadan/showrooms/app/room/[id].tsx`, and the new shortlist route
- [x] T008 [US1] [owner:agent-implementer] Implement save actions, shortlist creation, and shortlist rendering across the relevant files in `/Users/hanyramadan/showrooms/app/` and `/Users/hanyramadan/showrooms/src/`
- [x] T009 [US1] [owner:agent-security] Review shortlist save behavior for privacy-safe display and note ownership
- [x] T010 [US1] [owner:agent-reviewer] Review correctness and regression risk across save flows and shortlist state
- [x] T011 [US1] [owner:agent-tester] Verify shortlist save and revisit behavior on `discover`, `room/[id]`, and the shortlist surface

**Checkpoint**: Users can save and revisit listings through a meaningful shortlist flow.

---

## Phase 4: User Story 2 - Compare Serious Options Side By Side (Priority: P2)

**Goal**: Let seekers compare a bounded set of serious options across the most important decision factors.

**Independent Test**: Save multiple listings, open comparison for two to four options, and confirm the app shows aligned rows for the most important decision signals.

- [x] T012 [US2] [owner:agent-product] Confirm the comparison slice and dependency on shortlist foundation in `/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/spec.md`
- [x] T013 [US2] [owner:agent-design] Shape the comparison hierarchy and mobile/RTL-safe layout in the new comparison route and supporting components
- [x] T014 [US2] [owner:agent-implementer] Implement bounded comparison selection and rendering in the relevant shortlist/comparison source files
- [x] T015 [US2] [owner:agent-security] Review comparison rows to ensure no gated details are exposed early
- [x] T016 [US2] [owner:agent-reviewer] Review correctness and regression risk in shortlist state and comparison rendering
- [x] T017 [US2] [owner:agent-tester] Verify comparison behavior, row clarity, and option removal/retention flow

**Checkpoint**: Users can compare serious options without reopening each listing detail page repeatedly.

---

## Phase 5: User Story 3 - Preserve Decision Context, Not Just Bookmarks (Priority: P3)

**Goal**: Let saved listings retain lightweight seeker context so shortlists feel like decision boards.

**Independent Test**: Add lightweight notes or save reasons to saved listings and confirm shortlist views retain those cues clearly in EN and AR.

- [x] T018 [US3] [owner:agent-product] Confirm the save-context slice and dependency on prior shortlist/comparison behavior in `/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/spec.md`
- [x] T019 [US3] [owner:agent-design] Shape note/reason presentation in shortlist cards and comparison entry points without cluttering the UI
- [x] T020 [US3] [owner:agent-implementer] Implement lightweight note/save-reason behavior in the shortlist state and shortlist UI files
- [x] T021 [US3] [owner:agent-security] Review seeker note ownership and ensure private notes remain private
- [x] T022 [US3] [owner:agent-reviewer] Review correctness and regression risk for save-context behavior
- [x] T023 [US3] [owner:agent-tester] Verify note persistence and bilingual presentation across shortlist flows

**Checkpoint**: Saved listings retain meaningful seeker context instead of acting like raw bookmarks.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the whole feature and close the loop on quality, safety, and documentation.

- [x] T024 [owner:agent-performance] Review `discover`, shortlist, and comparison rendering for responsiveness and bounded comparison scale
- [x] T025 [owner:agent-tester] Run `npm run typecheck` from `/Users/hanyramadan/showrooms`
- [x] T026 [owner:agent-tester] Run `npx expo export --platform web` from `/Users/hanyramadan/showrooms`
- [x] T027 [owner:agent-tester] Perform manual EN/AR and RTL/LTR verification on the shortlist and comparison flows
- [x] T028 [owner:agent-docs] Update feature notes and completion artifacts in `/Users/hanyramadan/showrooms/specs/004-shortlists-and-comparison/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup** must be complete before foundational work starts.
- **Phase 2: Foundational** blocks all user stories because shortlist state and localization are shared.
- **Phase 3: User Story 1** is the MVP and should land first once Phase 2 is done.
- **Phase 4: User Story 2** should begin only after US1 is complete and the next non-trivial slice is approved.
- **Phase 5: User Story 3** should begin only after US2 is complete and the next non-trivial slice is approved.
- **Phase 6: Polish** depends on all desired user stories being complete.

### Sequential Specialist Handoffs

- Execute one specialist-owned slice at a time.
- Do not parallelize work across shortlist state, listing surfaces, and comparison files by default.
- Only add a concurrency exception if the user explicitly approves it.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1.
2. Complete Phase 2.
3. Complete Phase 3.
4. Validate the save-and-revisit shortlist flow before moving on.

### Incremental Delivery

1. Setup + Foundational
2. US1 shortlist save and revisit
3. Update the spec and get approval for the next non-trivial slice
4. US2 bounded comparison
5. Update the spec and get approval for the next non-trivial slice
6. US3 save-context notes
7. Final polish and verification

### Suggested Next Execution Slice

1. Update or confirm the spec for the next non-trivial slice
2. Get user approval
3. Execute the next specialist-owned US1 block in order
