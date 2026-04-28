# Paperclip Agent Protocol

This protocol governs find-your-room work created in Paperclip under the FIN
project. FIN-1 is the initial project issue lineage.

## Purpose

Paperclip agents may handle find-your-room tasks autonomously when the work
follows Spec Kit, records specialist ownership, and uses `agent-pilot` as the
delegated approval owner.

## Approval Rule

For Paperclip-managed work, `agent-pilot` replaces the default human approval
gate after a Spec Kit spec is drafted or updated.

`agent-pilot` may:

- approve the spec, plan, phase slice, or execution slice
- reject the work or mark it blocked
- request changes from the current owner
- ask specialist agents for priority input
- approve a parallel-safe exception when dependencies allow it

Agents must not continue from spec to plan, tasks, implementation, migrations,
dependency changes, or broad execution until `agent-pilot` records a decision.
Direct human approval is still valid when the user explicitly asks for it.

## Standard Issue Shape

Every non-trivial task should start as a parent coordination issue.

The parent issue owns:

- feature/workstream goal
- linked Spec Kit spec path
- planning document
- approval policy and current `agent-pilot` decision
- dependency order
- execution method
- child ticket map
- follow-up expectations
- validation checkpoints
- visible product impact summary

Default child issues:

- product/spec framing
- UX/design pass
- architecture/data-boundary pass when relevant
- security/trust review
- performance review when frontend-heavy
- implementation
- review
- testing/verification
- docs/roadmap update

Additional specialist child issues should be created when the work needs them.

## Specialist Routing

- `agent-orchestrator`: scope, dependency order, handoffs, execution plan
- `agent-pilot`: approval, escalation, refinement routing, keep-going decisions
- `agent-product`: user outcome, prioritization, phase fit
- `agent-design`: UX direction, information architecture, trust language
- `agent-impeccable`: frontend polish, responsiveness, accessibility, UI quality
- `agent-architect`: system shape, data boundaries, future backend implications
- `agent-security`: trust boundaries, privacy, disclosure, validation risks
- `agent-performance`: render, loading, interaction, and asset performance
- `agent-implementer`: approved implementation work
- `agent-reviewer`: correctness, maintainability, regression risk
- `agent-tester`: verification strategy and execution
- `agent-docs`: durable docs, roadmap state, handoff notes
- other agents: participate according to their specialty when the parent issue
  records the reason

## Execution Order

Sequential handoff is the default:

1. `agent-orchestrator` frames the work.
2. `agent-product`, `agent-design`, `agent-impeccable`, and relevant strategy
   agents shape the spec.
3. `agent-pilot` approves or requests refinement.
4. `agent-architect`, `agent-security`, and `agent-performance` review the plan
   where relevant.
5. `agent-implementer` executes approved changes.
6. `agent-reviewer`, `agent-tester`, and `agent-security` verify completion.
7. `agent-docs` updates durable docs and roadmap state.
8. `agent-pilot` records final approval, follow-up, or remaining blockers.

Parallel execution is allowed only when the parent issue or plan records:

- exact parallel-safe scope
- dependency boundary
- files or artifacts each agent owns
- conflict-prevention rule
- reason parallelism is worth the coordination cost

## Spec Kit Requirements

Each feature or phase slice must include:

- user story
- requirements
- definition of done
- constraints and risks
- acceptance criteria
- approval owner and decision
- specialist roles used, skipped, and why
- validation checks

## Follow-Up And Reporting

After execution, the parent issue must report:

- what changed
- what the user can visibly see in the app
- which specialist-owned slice completed
- verification performed
- unresolved risks or follow-up tickets
- docs updated

No meaningful work is complete until review, testing, and docs ownership have
been considered and either completed or explicitly marked not applicable.
