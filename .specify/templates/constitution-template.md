# find-your-room Constitution

## Core Principles

### I. Spec Before Execution
Every meaningful change starts with a Spec Kit feature spec. Agents must create
or update `spec.md` before planning, task generation, or implementation work.

### II. Delegated Agent-Pilot Approval Gate
After drafting or updating a spec for Paperclip-managed work, route approval to
`agent-pilot`. Planning and implementation begin only after `agent-pilot`
approves, rejects, or requests revisions and the revisions are applied.

Direct human approval is still valid when explicitly requested, but Paperclip
project work defaults to delegated `agent-pilot` approval.

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

### VI. Specialist-Agent Collaboration
Use specialist-owned Paperclip child issues for meaningful work. Record each
agent role, scope, sequence, dependency, and skip reason in the plan or task
artifact.

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
3. Ask `agent-pilot` for approval, adjustments, or rejection.
4. Continue to planning, tasks, and implementation only after approval.
5. Represent non-trivial Paperclip work as a parent coordination issue with
   specialist-owned child issues and explicit follow-up expectations.

## Governance

This constitution works together with `AGENTS.md` and
`docs/spec-driven-workflow.md`. If there is a conflict, the stricter spec-first
rule and delegated `agent-pilot` approval gate win.

**Version**: 1.0.0 | **Ratified**: [DATE] | **Last Amended**: [DATE]
