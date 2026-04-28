<!--
Sync Impact Report
Version change: 1.0.0 -> 2.0.0
Modified principles:
- II. Human Approval Gate -> Delegated Agent-Pilot Approval Gate
- VI. Specialist-Agent Collaboration expanded for Paperclip lifecycle routing
Added sections:
- Paperclip Issue Lifecycle
- Agent-Pilot Delegated Approval
Removed sections:
- None
Templates requiring updates:
- Updated: .specify/templates/constitution-template.md
- Updated: .specify/templates/plan-template.md
- Updated: .specify/templates/spec-template.md
- Updated: .specify/templates/tasks-template.md
- Reviewed: .specify/templates/checklist-template.md
Follow-up TODOs:
- None
-->

# find-your-room Constitution

## Core Principles

### I. Spec Before Execution
Every meaningful change starts with a Spec Kit feature spec. Agents must create
or update `spec.md` before planning, task generation, or implementation work.
Exceptions are limited to trivial informational work or explicit user override.

Each new non-trivial phase or execution slice also requires its own spec update
and renewed approval before planning or implementation continues.

### II. Delegated Agent-Pilot Approval Gate
After drafting or updating a spec for Paperclip-managed work, agents must route
approval through `agent-pilot` instead of blocking on direct human review.
`agent-pilot` may approve, reject, request revisions, or ask other specialist
agents for priority input. Work may continue only after `agent-pilot` records a
clear decision inside the issue, spec, plan, or task artifact.

Direct human approval is still valid when the user explicitly requests it, but
it is no longer the default gate for Paperclip project work.

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

### VII. Paperclip Issue Lifecycle
Every non-trivial Paperclip task must be represented as a parent coordination
issue with specialist-owned child issues where practical. The parent issue must
carry or link the planning document, Spec Kit artifact, approval policy,
dependency order, execution method, follow-up expectations, and validation
checks.

The default child-ticket shape is:

- product/spec framing
- UX/design pass
- architecture/data-boundary pass when relevant
- security/trust review
- performance review when frontend-heavy
- implementation
- correctness review
- testing/verification
- documentation and roadmap update

Additional agents may participate according to their specialty. Parallel work is
allowed only when the parent or plan explicitly records the parallel-safe scope,
dependency boundary, and reason.

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
3. Present or link the spec path and a short summary in the Paperclip issue.
4. Route approval to `agent-pilot`, who may approve directly or request
   specialist refinement before deciding.
5. After `agent-pilot` approval, continue with clarification, planning, tasks,
   and only then
   implementation.
6. During approved planning and execution, use as many relevant specialist
   `agent-*` skills as practical, especially for design, impeccable frontend
   polish, security, performance, review, testing, and documentation.
7. Execute meaningful work sequentially by specialist-owned slices unless the
   parent issue or plan explicitly approves a parallel-safe exception.
8. Update the parent issue during follow-up with execution status, blockers,
   review findings, verification results, and visible product impact.

## Governance

This constitution governs all Spec Kit and Paperclip workflows in this
repository and works alongside `AGENTS.md`,
`docs/spec-driven-workflow.md`, and
`docs/find-your-room/paperclip-agent-protocol.md`. If a workflow conflicts with
these rules, the stricter spec-first rule and the delegated `agent-pilot`
approval gate win.

**Version**: 2.0.0 | **Ratified**: 2026-04-21 | **Last Amended**: 2026-04-28
