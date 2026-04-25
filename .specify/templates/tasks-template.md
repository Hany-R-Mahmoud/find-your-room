---

description: "Task list template for feature implementation"

---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Add verification tasks when the specification or the user explicitly requires them.

**Organization**: Tasks are grouped by user story and assigned to specialist-owned blocks. Sequential execution is the default.

## Format: `[ID] [Story?] [owner:<specialist>] Description`

- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- **[owner:<specialist>]**: The specialist scope that owns the task block (for example `owner:agent-product`, `owner:agent-security`, `owner:agent-reviewer`, `owner:agent-tester`, `owner:agent-docs`, `owner:agent-orchestrator`, `owner:agent-implementer`)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project. Adjust based on the real plan structure.

## Phase 1: Setup

**Purpose**: Confirm the execution baseline and establish the task artifact.

- [ ] T001 [owner:agent-orchestrator] Confirm scope and execution baseline in [path]
- [ ] T002 [owner:agent-docs] Prepare or update workflow artifacts in [path]

---

## Phase 2: Foundational

**Purpose**: Shared prerequisites that must be complete before user stories begin.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T003 [owner:agent-orchestrator] Establish shared prerequisites in [path]
- [ ] T004 [owner:agent-security] Define or update trust-boundary rules in [path]
- [ ] T005 [owner:agent-docs] Align shared documentation or templates in [path]

**Checkpoint**: Foundation ready. Story work can now begin sequentially.

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Specialist-Owned Execution Block

- [ ] T006 [US1] [owner:agent-product] Confirm the story slice and phase scope in [path]
- [ ] T007 [US1] [owner:agent-design] Shape the UX or information structure in [path]
- [ ] T008 [US1] [owner:agent-implementer] Implement the story in [path]
- [ ] T009 [US1] [owner:agent-security] Review trust, disclosure, or validation risks in [path]
- [ ] T010 [US1] [owner:agent-reviewer] Review correctness and regression risk in [path]
- [ ] T011 [US1] [owner:agent-tester] Verify the story outcome in [path]

**Checkpoint**: User Story 1 should now be functional and independently testable.

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

- [ ] T012 [US2] [owner:agent-product] Confirm the story slice and dependency on prior slices in [path]
- [ ] T013 [US2] [owner:agent-design] Shape the UX or information structure in [path]
- [ ] T014 [US2] [owner:agent-implementer] Implement the story in [path]
- [ ] T015 [US2] [owner:agent-security] Review trust, disclosure, or validation risks in [path]
- [ ] T016 [US2] [owner:agent-reviewer] Review correctness and regression risk in [path]
- [ ] T017 [US2] [owner:agent-tester] Verify the story outcome in [path]

**Checkpoint**: User Stories 1 and 2 should now both work independently.

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

- [ ] T018 [US3] [owner:agent-product] Confirm the story slice and dependency on prior slices in [path]
- [ ] T019 [US3] [owner:agent-design] Shape the UX or information structure in [path]
- [ ] T020 [US3] [owner:agent-implementer] Implement the story in [path]
- [ ] T021 [US3] [owner:agent-security] Review trust, disclosure, or validation risks in [path]
- [ ] T022 [US3] [owner:agent-reviewer] Review correctness and regression risk in [path]
- [ ] T023 [US3] [owner:agent-tester] Verify the story outcome in [path]

**Checkpoint**: All user stories should now be independently functional.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [ ] TXXX [owner:agent-docs] Documentation updates in docs/
- [ ] TXXX [owner:agent-reviewer] Code cleanup and cross-story review
- [ ] TXXX [owner:agent-performance] Performance optimization across completed stories
- [ ] TXXX [owner:agent-tester] Additional verification or regression tasks in tests/ or equivalent
- [ ] TXXX [owner:agent-security] Security hardening
- [ ] TXXX [owner:agent-tester] Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies. Start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion and should proceed sequentially in priority order by default.
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational.
- **User Story 2 (P2)**: Can start after User Story 1 or after an explicitly approved exception.
- **User Story 3 (P3)**: Can start after User Story 2 or after an explicitly approved exception.

### Sequential Execution Default

- Execute specialist-owned tasks back-to-back.
- Finish the current specialist-owned block before moving to the next one.
- Do not add a "parallel opportunities" section unless the user explicitly approves a concurrency exception.

---

## Implementation Strategy

### MVP First

1. Complete Phase 1.
2. Complete Phase 2.
3. Complete Phase 3.
4. Stop and validate before moving to the next slice.

### Incremental Delivery

1. Complete Setup + Foundational.
2. Deliver User Story 1 and validate it.
3. Deliver User Story 2 and validate it.
4. Deliver User Story 3 and validate it.
5. Finish with polish and cross-cutting review.

### Sequential Team Strategy

1. Team completes Setup + Foundational together.
2. Then the team executes specialist-owned story blocks in sequence.
3. If a concurrency exception is approved, record the exact scope and reason in the task file.

---

## Notes

- Every non-trivial task should show specialist ownership.
- [Story] labels map tasks to specific user stories for traceability.
- Each user story should be independently completable and testable.
- Sequential execution is the default.
- Stop at checkpoints to validate the completed slice before moving on.
- Avoid vague tasks, hidden ownership, default parallelism, same-file conflicts, and cross-story dependencies that break independence.
