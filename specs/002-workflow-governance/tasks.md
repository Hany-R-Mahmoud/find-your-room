# Tasks: Workflow Governance Tightening

**Input**: Design documents from `/Users/hanyramadan/find-your-room/specs/002-workflow-governance/`
**Prerequisites**: [plan.md](/Users/hanyramadan/find-your-room/specs/002-workflow-governance/plan.md), [spec.md](/Users/hanyramadan/find-your-room/specs/002-workflow-governance/spec.md), [research.md](/Users/hanyramadan/find-your-room/specs/002-workflow-governance/research.md), [data-model.md](/Users/hanyramadan/find-your-room/specs/002-workflow-governance/data-model.md), [quickstart.md](/Users/hanyramadan/find-your-room/specs/002-workflow-governance/quickstart.md)

**Tests**: Inspect updated artifacts for consistency against the approved governance spec.

**Organization**: Tasks are grouped by user story and assigned to specialist ownership blocks. Sequential execution is the default.

## Phase 1: Setup

- [x] T001 [owner:agent-orchestrator] Confirm the governance implementation scope against `/Users/hanyramadan/find-your-room/specs/002-workflow-governance/spec.md` and `/Users/hanyramadan/find-your-room/specs/002-workflow-governance/plan.md`

---

## Phase 2: Foundational

- [x] T002 [owner:agent-docs] Update `/Users/hanyramadan/find-your-room/AGENTS.md` with phase-slice spec gating, explicit specialist planning records, specialist-owned sequential execution, and explicit parallel exceptions
- [x] T003 [owner:agent-docs] Update `/Users/hanyramadan/find-your-room/docs/spec-driven-workflow.md` and `/Users/hanyramadan/find-your-room/.specify/memory/constitution.md` so the supporting workflow docs match the new governance rules
- [x] T004 [owner:agent-orchestrator] Update `/Users/hanyramadan/find-your-room/.specify/templates/tasks-template.md` so future task generation defaults to specialist-owned sequential execution

---

## Phase 3: User Story 1 - Govern Each Phase Explicitly (Priority: P1)

- [x] T005 [US1] [owner:agent-orchestrator] Update `/Users/hanyramadan/find-your-room/AGENTS.md` and `/Users/hanyramadan/find-your-room/docs/spec-driven-workflow.md` to require a new or updated spec for each non-trivial phase or execution slice

---

## Phase 4: User Story 2 - Require Named Specialist Planning Passes (Priority: P1)

- [x] T006 [US2] [owner:agent-product] Update `/Users/hanyramadan/find-your-room/AGENTS.md` and `/Users/hanyramadan/find-your-room/docs/spec-driven-workflow.md` to require named specialist planning passes and skip reasons
- [x] T007 [US2] [owner:agent-docs] Update `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/plan.md` to record explicit specialist planning passes for the active feature

---

## Phase 5: User Story 3 - Execute Sequentially By Specialty (Priority: P1)

- [x] T008 [US3] [owner:agent-orchestrator] Update `/Users/hanyramadan/find-your-room/.specify/templates/tasks-template.md` to remove default parallel guidance and replace it with specialist-owned sequential blocks
- [x] T009 [US3] [owner:agent-reviewer] Update `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/tasks.md` so the active task artifact no longer recommends parallel work and instead reflects specialist-owned sequential execution

---

## Phase 6: Polish & Verification

- [x] T010 [owner:agent-tester] Inspect `/Users/hanyramadan/find-your-room/AGENTS.md`, `/Users/hanyramadan/find-your-room/docs/spec-driven-workflow.md`, `/Users/hanyramadan/find-your-room/.specify/memory/constitution.md`, `/Users/hanyramadan/find-your-room/.specify/templates/tasks-template.md`, `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/plan.md`, and `/Users/hanyramadan/find-your-room/specs/001-trust-rich-listing/tasks.md` for governance consistency

## Sequential Execution Order

1. T001
2. T002
3. T003
4. T004
5. T005
6. T006
7. T007
8. T008
9. T009
10. T010
