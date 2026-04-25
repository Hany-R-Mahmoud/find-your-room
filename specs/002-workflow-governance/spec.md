# Feature Specification: Workflow Governance Tightening

**Feature Branch**: `[002-workflow-governance]`  
**Created**: 2026-04-21  
**Status**: Draft  
**Input**: User description: "Fix the workflow rules so spec-kit is used for each planning/execution slice, agent-* specialists are used explicitly in planning, tasks are distributed by specialty, and execution is back-to-back instead of parallel to reduce conflicts."

## Approval Gate *(mandatory)*

**Spec Review Status**: Pending user approval  
**User Decision**: Pending  
**Review Notes**: Awaiting user review before planning or implementation

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Govern Each Phase Explicitly (Priority: P1)

As the operator of the repo workflow, I want each non-trivial phase or execution
slice to require its own Spec Kit checkpoint, so planning and implementation do
not drift ahead of approved scope.

**Why this priority**: This is the main control the user asked for, and it
prevents unapproved task execution from continuing under an older feature spec.

**Independent Test**: Start a new non-trivial phase after an earlier phase is
complete and confirm the workflow requires a fresh spec or spec update plus user
approval before planning or execution resumes.

**Acceptance Scenarios**:

1. **Given** an agent wants to start a new non-trivial phase, **When** the
   phase changes from the last approved slice, **Then** the workflow requires a
   new or updated spec before planning or implementation.
2. **Given** a spec was updated for a new phase, **When** approval has not yet
   been granted, **Then** planning and implementation remain blocked.

---

### User Story 2 - Require Named Specialist Planning Passes (Priority: P1)

As the operator of the repo workflow, I want planning artifacts to show which
specialist agent contributed in which scope, so planning is auditable and not
reduced to a vague claim of "multi-agent synthesis."

**Why this priority**: The user explicitly asked for planning help from the
specialist `agent-*` members and wants that requirement to be visible and
enforceable.

**Independent Test**: Review a plan for a new phase and confirm it contains
named specialist passes, their scope, and any concrete reason for skipping a
specialist.

**Acceptance Scenarios**:

1. **Given** a plan is created for a non-trivial phase, **When** the plan is
   reviewed, **Then** it shows which specialist agents participated and what
   each one covered.
2. **Given** a relevant specialist is not used, **When** the plan is reviewed,
   **Then** the plan states a concrete reason for that omission.

---

### User Story 3 - Execute Sequentially By Specialty (Priority: P1)

As the operator of the repo workflow, I want tasks assigned by specialty and
executed back-to-back by default, so file conflicts and overlapping edits are
reduced.

**Why this priority**: The user explicitly prefers sequential specialist
handoffs over parallel execution, especially for overlapping files and workflow
governance work.

**Independent Test**: Review a generated task list and execution report and
confirm task blocks are assigned by specialty, ordered sequentially, and do not
recommend parallel execution unless the user explicitly approves an exception.

**Acceptance Scenarios**:

1. **Given** a task list is generated, **When** it is reviewed, **Then** each
   task block identifies the responsible specialist scope and follows a
   sequential execution order.
2. **Given** work items touch related files or decisions, **When** execution is
   planned, **Then** the workflow defaults to back-to-back execution rather than
   parallel tasking.

### Edge Cases

- What happens when a phase is small enough to qualify for the existing fast
  path?
- How does the workflow behave when one specialist is relevant to review but not
  to implementation ownership?
- What happens when a later phase reopens an earlier area and the previous spec
  is no longer sufficient?
- How is an explicit user override handled when the user wants parallel work in
  a specific case?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The workflow MUST require a new or updated Spec Kit spec for each
  non-trivial phase, planning slice, or execution slice before planning or
  implementation begins for that slice.
- **FR-002**: The workflow MUST require explicit user approval after each such
  spec update before planning or implementation continues.
- **FR-003**: Planning artifacts MUST identify the relevant specialist
  `agent-*` participants and the scope each specialist covered.
- **FR-004**: If a relevant specialist is skipped, the workflow MUST record a
  concrete reason for skipping that specialist.
- **FR-005**: Task artifacts MUST assign work by specialist scope or ownership
  area rather than only by generic phase label.
- **FR-006**: Task artifacts MUST default to sequential, back-to-back execution
  order.
- **FR-007**: The workflow MUST NOT recommend parallel execution by default for
  non-trivial work.
- **FR-008**: Parallel execution MAY only be recommended when the user
  explicitly approves that exception.
- **FR-009**: Phase completion reporting MUST state the visible change in the
  app and MUST identify which specialist-owned slice was completed.
- **FR-010**: Existing workflow guidance and active task artifacts MUST be
  updated so they no longer conflict with the sequential-specialist rule.

### Key Entities *(include if feature involves data)*

- **Phase Slice**: A bounded, reviewable unit of planning or execution that
  requires its own scope confirmation and approval gate.
- **Specialist Pass**: A named planning or review contribution from a specific
  `agent-*` role, including scope and outcome.
- **Specialist-Owned Task Block**: A set of tasks assigned to one specialist
  scope and sequenced relative to other specialist-owned blocks.
- **Execution Exception**: An explicit user-approved departure from the default
  sequential execution rule.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer can inspect the workflow rules and clearly determine
  that each non-trivial phase requires its own spec/update and approval gate.
- **SC-002**: A reviewer can inspect a plan and identify which specialist agents
  contributed, what they covered, and why any relevant specialist was skipped.
- **SC-003**: A reviewer can inspect a task file and see a sequential
  specialist-owned execution order without default parallel recommendations.
- **SC-004**: A reviewer can inspect phase completion reports and identify both
  the visible app change and the specialist-owned slice that was completed.

## Assumptions

- The stricter governance applies to non-trivial planning and implementation
  work, while the existing fast path remains available for clearly trivial
  actions.
- The repo will continue to use Spec Kit as the primary workflow framework for
  specification, planning, and task generation.
- Governance updates may require changes both to the main workflow rules and to
  active feature task artifacts so they align with the new defaults.
- User-approved exceptions for parallel execution remain possible, but they must
  be explicit rather than assumed.

## Next Step Gate

This spec must be reviewed by the user before `/speckit.plan`, task generation,
or implementation begins.
