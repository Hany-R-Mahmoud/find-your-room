# Spec-Driven Workflow

This project uses GitHub Spec Kit as the first step for meaningful work.

## Required Flow

1. Understand the request and inspect the relevant local files.
2. Create or update a spec with `$speckit-specify`.
3. Pause for human review.
4. Wait for one of:
   - approval
   - requested changes
   - refusal
5. Only after approval continue with:
   - `$speckit-clarify` when needed
   - `$speckit-plan`
   - `$speckit-tasks`
   - implementation and verification
6. For each new non-trivial phase or execution slice, create or update the spec
   again and pause for approval before continuing.
7. For meaningful approved work, use the relevant specialist `agent-*` skills
   to shape the plan and execution instead of relying on a single generalist
   pass.
8. Record specialist ownership and proceed sequentially by default unless the
   user explicitly approves a parallel exception.

## Why This Exists

- It keeps work aligned with RoomMatch strategy before code is written.
- It gives the user a clear chance to redirect scope early.
- It reduces overbuilding and accidental architecture drift.

## Approval Gate

Agents must treat the spec as a checkpoint, not a formality.

After writing `spec.md`, the agent should share:

- the spec path
- a short summary of the proposed scope
- a direct approval request

Example:

`Spec drafted at specs/003-example/spec.md. Reply with approved, adjustments, or reject.`

## Specialist Agent Use

After approval, route the work through the relevant specialist agents whenever
they add real value.

Typical frontend feature stack:

- `agent-product` for scope and prioritization
- `agent-design` and `agent-impeccable` for UI/UX direction
- `agent-security` for privacy and trust-boundary review
- `agent-performance` for render, image, and interaction efficiency
- `agent-reviewer` for correctness and regression review
- `agent-tester` for verification planning and execution
- `agent-docs` for roadmap and artifact updates

Plans should name which specialists were used, what each one covered, and why a
relevant specialist was skipped.

## Execution Default

Sequential specialist handoffs are the default for meaningful work.

- Use specialist-owned task blocks where practical.
- Prefer back-to-back execution to reduce conflicts.
- Do not recommend parallel work unless the user explicitly asks for or
  approves that exception.

## Fast-Path Exceptions

A new spec can be skipped only when the task is clearly trivial, purely
informational, or the user explicitly says to skip the spec-first rule.

When skipping, the agent should say so explicitly.
