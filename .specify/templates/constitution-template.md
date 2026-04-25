# find-your-room Constitution

## Core Principles

### I. Spec Before Execution
Every meaningful change starts with a Spec Kit feature spec. Agents must create
or update `spec.md` before planning, task generation, or implementation work.

### II. Human Approval Gate
After drafting a spec, pause for user review. Planning and implementation begin
only after the user approves the spec or requests revisions that are applied.

### III. Strategy Alignment
Keep all work aligned with find-your-room’s current direction: Riyadh-first,
shared-room marketplace, trust-first discovery, and compatibility-aware
matching.

### IV. Simplicity And Maintainability
Prefer the smallest maintainable solution that satisfies the approved spec.
Avoid broad platform expansion, speculative architecture, and unnecessary
dependencies.

### V. Traceable Delivery
Keep a clear chain from approved spec to plan to tasks to implementation and
verification.

## Project Constraints

- Existing stack is Expo + TypeScript
- Match current repo patterns before adding new structure
- Keep changes surgical and avoid `any`
- Treat accessibility, trust, and clarity as first-class concerns
- Defer payment, contract, and compliance-heavy expansion unless explicitly
  approved

## Workflow Rules

1. Inspect local context first.
2. Draft or update the spec.
3. Ask the user for approval, adjustments, or rejection.
4. Continue to planning, tasks, and implementation only after approval.

## Governance

This constitution works together with `AGENTS.md` and
`docs/spec-driven-workflow.md`. If there is a conflict, the stricter spec-first
and user-approval rule wins.

**Version**: 1.0.0 | **Ratified**: [DATE] | **Last Amended**: [DATE]
