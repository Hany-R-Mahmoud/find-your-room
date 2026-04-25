# find-your-room Constitution

## Core Principles

### I. Spec Before Execution
Every meaningful change starts with a Spec Kit feature spec. Agents must create
or update `spec.md` before planning, task generation, or implementation work.
Exceptions are limited to trivial informational work or explicit user override.

Each new non-trivial phase or execution slice also requires its own spec update
and renewed approval before planning or implementation continues.

### II. Human Approval Gate
After drafting a spec, the agent must pause for user review. No planning,
dependency installation, migrations, code edits, or broad execution should
continue until the user approves the spec or requests revisions.

### III. Strategy Alignment
All specs must align with the current find-your-room product direction: Riyadh-first,
shared-room marketplace, trust-first discovery, compatibility-aware matching,
and simple operational flows over broad platform ambition.

### IV. Simplicity Over Platform Sprawl
Specs and plans should prefer the smallest maintainable slice that solves the
approved problem. Avoid introducing new systems, abstractions, or operational
burden unless the approved spec clearly justifies them.

### V. Verification And Traceability
Approved work should trace cleanly from spec to plan to tasks to implementation.
Behavior changes should include clear verification steps and keep docs aligned
with the delivered result.

### VI. Specialist-Agent Collaboration
For meaningful product work, the workflow should use the relevant specialist
agents instead of a single generalist pass whenever that improves quality. In
practice this means pulling in the appropriate design, UX, product, security,
performance, review, testing, and docs agents during planning and execution.
Plans should explicitly record the specialist passes used, their scope, and any
skip reason.

## Project Constraints

- Primary stack is the existing Expo + TypeScript find-your-room prototype
- Match existing repo patterns before introducing new structure
- Avoid `any`, avoid over-engineering, and keep changes surgical
- Treat trust, accessibility, and user clarity as first-class concerns
- Defer payment, contract, and compliance-heavy workflows unless explicitly
  approved in spec

## Workflow Rules

1. Inspect relevant local files first.
2. Draft or update the feature spec.
3. Present the spec path and a short summary to the user.
4. Wait for approval, revisions, or rejection.
5. After approval, continue with clarification, planning, tasks, and only then
   implementation.
6. During approved planning and execution, use as many relevant specialist
   `agent-*` skills as practical, especially for design, impeccable frontend
   polish, security, performance, review, testing, and documentation.
7. Execute meaningful work sequentially by specialist-owned slices unless the
   user explicitly approves a parallel exception.

## Governance

This constitution governs all spec-kit workflows in this repository and works
alongside `AGENTS.md` and `docs/spec-driven-workflow.md`. If a workflow conflicts
with these rules, the stricter spec-first and human-approval rule wins.

**Version**: 1.0.0 | **Ratified**: 2026-04-21 | **Last Amended**: 2026-04-21
