# Spec-Driven Workflow

This project uses GitHub Spec Kit as the first step for meaningful work.

## Required Flow

1. Understand the request and inspect the relevant local files.
2. Create or update a spec with `$speckit-specify`.
3. Route the spec for approval.
4. Wait for one of:
   - approval
   - requested changes
   - refusal
5. For Paperclip-managed find-your-room work, `agent-pilot` is the delegated
   approval owner and may approve, reject, request revisions, or ask specialist
   agents for priority input.
6. Only after approval continue with:
   - `$speckit-clarify` when needed
   - `$speckit-plan`
   - `$speckit-tasks`
   - implementation and verification
7. For each new non-trivial phase or execution slice, create or update the spec
   again and route approval before continuing.
8. For meaningful approved work, use the relevant specialist `agent-*` skills
   to shape the plan and execution instead of relying on a single generalist
   pass.
9. Record specialist ownership and proceed sequentially by default unless
   `agent-pilot`, the parent issue, or the user explicitly approves a parallel
   exception.

## Why This Exists

- It keeps work aligned with find-your-room strategy before code is written.
- It creates a clear approval checkpoint before scope expands.
- It reduces overbuilding and accidental architecture drift.

## Approval Gate

Agents must treat the spec as a checkpoint, not a formality.

After writing `spec.md`, the agent should share or link:

- the spec path
- a short summary of the proposed scope
- a direct approval request to `agent-pilot` for Paperclip-managed work

Example:

`Spec drafted at specs/003-example/spec.md. Routing to agent-pilot for approved, adjustments, or reject.`

Direct human approval is still valid when the user explicitly requests it, but
it is not the default gate for Paperclip project issues.

## Specialist Agent Use

After approval, route the work through the relevant specialist agents whenever
they add real value.

Typical frontend feature stack:

- `agent-pilot` for delegated approval, escalation, and keep-going decisions
- `agent-orchestrator` for scope, sequencing, dependencies, and handoffs
- `agent-product` for scope and prioritization
- `agent-design` and `agent-impeccable` for UI/UX direction
- `agent-architect` for system and data-boundary implications
- `agent-security` for privacy and trust-boundary review
- `agent-performance` for render, image, and interaction efficiency
- `agent-implementer` for approved code changes
- `agent-reviewer` for correctness and regression review
- `agent-tester` for verification planning and execution
- `agent-docs` for roadmap and artifact updates

Plans should name which specialists were used, what each one covered, and why a
relevant specialist was skipped.

## Execution Default

Sequential specialist handoffs are the default for meaningful work.

- Use specialist-owned task blocks where practical.
- Prefer back-to-back execution to reduce conflicts.
- Do not recommend parallel work unless `agent-pilot`, the parent issue, or the
  user explicitly asks for or approves that exception.

## Paperclip Issue Shape

Each non-trivial Paperclip task should use:

- parent issue: feature/workstream coordination
- planning document: workflow, routing, dependencies, and approval policy
- child issue: product/spec framing
- child issue: UX/design pass
- child issue: architecture/data-boundary pass when relevant
- child issue: security/trust review
- child issue: performance review when frontend-heavy
- child issue: implementation
- child issue: review
- child issue: testing/verification
- child issue: docs/roadmap update
- optional parallel-safe child tickets only where explicitly approved

The parent issue remains the source of truth for lifecycle status, dependencies,
handoffs, approval decisions, blockers, follow-up, and visible product impact.

## Fast-Path Exceptions

A new spec can be skipped only when the task is clearly trivial, purely
informational, or the user explicitly says to skip the spec-first rule.

When skipping, the agent should say so explicitly.
