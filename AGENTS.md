<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

# find-your-room Agent Workflow

This file is the mandatory operating guide for any AI agent working in this
repository.

## Default Rule: Spec First

For any non-trivial task, feature, refactor, bug fix, workflow change, or
architecture change:

1. Start with Spec Kit, not direct execution.
2. Create or update a feature spec with `$speckit-specify`.
3. Stop after the spec is drafted and present it for human review.
4. Wait for one of these explicit outcomes from the user:
   - `approved`
   - requested adjustments
   - rejected / do not proceed
5. Only after approval may the agent continue to:
   - `$speckit-clarify` if needed
   - `$speckit-plan`
   - `$speckit-tasks`
   - implementation work

## Phase-Slice Gate

For each new non-trivial phase, planning slice, or execution slice inside an
approved feature:

1. Create or update the active Spec Kit spec before continuing.
2. Present the updated scope for review.
3. Wait for explicit user approval again.
4. Only then continue to planning, tasks, or implementation for that slice.

Feature-level approval is not enough to silently continue through later
non-trivial phases.

## Human Gate

After writing or updating `spec.md`, the agent must not move on to planning,
task generation, code edits, migrations, dependency changes, or command-heavy
execution until the user has had a chance to approve, adjust, or refuse the
spec.

If the user gives adjustments, update the same spec and ask for approval again.

## Multi-Agent Requirement

When the user asks for planning, specification, execution, or phased delivery,
agents should use as many relevant specialist `agent-*` skills as practical
instead of keeping the whole workflow inside one generalist pass.

For meaningful feature work, the default specialist sequence should include the
relevant subset of:

- `agent-design`
- `agent-impeccable`
- `agent-product`
- `agent-architect`
- `agent-security`
- `agent-performance`
- `agent-reviewer`
- `agent-tester`
- `agent-docs`

The goal is not agent theater. Use the maximum number of agents that adds real
value without duplicating the same work.

### Planning Record Requirement

For each non-trivial planning pass, the resulting plan must explicitly record:

- which `agent-*` specialist roles were used
- the scope each specialist covered
- the sequence in which they were applied
- a concrete reason for any relevant specialist that was skipped

### Consecutive Specialist Handoffs

For meaningful feature work, agents should prefer a sequenced multi-agent flow
instead of a single-pass draft or implementation.

The default order is:

1. `agent-orchestrator` to frame scope, dependencies, and the active decision
2. `agent-product` to shape the user-facing outcome and phase fit
3. `agent-design` and/or `agent-impeccable` for UX direction, interface shape,
   and frontend quality
4. `agent-architect` for system and data-boundary implications when the work
   affects structure or future backend paths
5. `agent-security` whenever trust, privacy, disclosure, verification, auth, or
   user data claims are involved
6. `agent-performance` for frontend-heavy flows or screens that may regress in
   responsiveness or rendering
7. `agent-reviewer` and `agent-tester` before calling implementation complete
8. `agent-docs` to update durable project docs, roadmap state, and workflow
   guidance when needed

Agents should hand off consecutively and integrate the previous specialist's
output into the next step.

### Execution Ownership

For non-trivial execution:

- tasks must be grouped into specialist-owned blocks where practical
- execution should proceed back-to-back by specialty by default
- specialist ownership should be visible in the task artifact, not left implied
- if a task artifact does not show specialist ownership, it is incomplete

### Parallel Execution Exception

Parallel execution is not the default for meaningful work in this repository.

- Do not propose or schedule parallel task execution unless the user explicitly
  approves that exception.
- If parallel work is approved, record the reason and the exact scope of the
  exception in the task or plan artifact.

No meaningful spec, plan, or implementation should be treated as complete until
the relevant downstream specialist passes have been considered.

### Default Expectation By Phase

- spec drafting: product, design, architect
- frontend execution planning: design, impeccable, performance, security,
  tester
- implementation review: reviewer, tester, security, performance
- documentation and tracking updates: docs

### Phase Completion Reporting

- After any approved phase execution is completed, the agent must state exactly
  what visible change the user can now see in the app because of that phase.
- This visible-change summary should be concrete and UI-facing, not only a code
  or file-change summary.
- The completion report should also identify which specialist-owned slice was
  completed.

If a specialist agent is skipped, the lead agent should have a concrete reason.

For trust-first find-your-room work, the default expectation is to include
`agent-security` during spec review as well, not only after implementation.

## Allowed Fast Path

The only tasks that may skip a new spec are:

- purely informational questions
- reading or summarizing existing files
- small copy-only edits explicitly requested by the user
- trivial mechanical changes where the user explicitly asks to skip the spec

When using the fast path, the agent should say that it is intentionally skipping
the spec because the task is trivial or the user explicitly overrode the rule.

## Spec Location

- Primary feature specs live under `specs/<nnn>-<feature-name>/spec.md`
- Use the active spec folder tracked by `.specify/feature.json` when continuing
  an existing feature

## find-your-room-Specific Guidance

- Keep specs aligned with the current find-your-room direction:
  Riyadh-first, shared-room marketplace, trust-first, compatibility-first
- Prefer simple, maintainable solutions over broad platform expansion
- Avoid expanding into payments, contracts, or deep compliance flows unless the
  approved spec explicitly calls for them

## Approval Prompt

After drafting a spec, end with a short approval checkpoint, for example:

`Spec drafted at specs/00x-.../spec.md. Reply with approved, adjustments, or reject.`
