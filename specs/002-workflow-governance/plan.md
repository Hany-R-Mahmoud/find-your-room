# Implementation Plan: Workflow Governance Tightening

**Branch**: `[002-workflow-governance]` | **Date**: 2026-04-21 | **Spec**: [spec.md](/Users/hanyramadan/showrooms/specs/002-workflow-governance/spec.md)
**Input**: Approved feature specification from `/specs/002-workflow-governance/spec.md`

> Gate: this plan is based on an approved governance spec and on an explicit
> specialist planning pass across orchestration, product workflow design,
> security, review, testing, and documentation.

## Summary

Tighten the RoomMatch workflow so non-trivial work cannot drift past vague
"multi-agent intent." The implementation will make the workflow explicit in the
rule sources and in the active task artifacts by requiring:

- a spec or spec update for each non-trivial phase or execution slice
- named specialist planning passes with scope and skip reasons
- specialist-owned task blocks
- sequential execution by default
- parallel execution only by explicit user exception

## Technical Context

**Language/Version**: Markdown and repository workflow artifacts  
**Primary Dependencies**: Spec Kit templates, repo governance docs  
**Storage**: repository files only  
**Testing**: artifact inspection and rule-consistency review  
**Target Platform**: local repo workflow for RoomMatch contributors and agents  
**Project Type**: governance/documentation workflow update  
**Performance Goals**: reduce workflow ambiguity and coordination conflicts  
**Constraints**: must preserve spec-first approval gate and avoid contradicting active repo workflow files  
**Scale/Scope**: `AGENTS.md`, `.specify/memory/constitution.md`, `docs/spec-driven-workflow.md`, `.specify/templates/tasks-template.md`, and the active feature planning/task artifacts

## Constitution Check

### Pass

- Starts from an approved spec
- Keeps the change narrow to workflow governance and active task artifacts
- Strengthens traceability from spec to plan to tasks to execution
- Reinforces specialist-agent collaboration rather than weakening it

### Required Cautions

- Do not create a workflow so rigid that trivial fast-path work becomes impossible
- Do not leave the task template recommending parallel work after changing the main rules
- Do not update only the top-level rules while leaving the active feature artifact in conflict

## Project Structure

### Documentation (this feature)

```text
specs/002-workflow-governance/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md
```

### Source Code (repository root)

```text
AGENTS.md
docs/
└── spec-driven-workflow.md

.specify/
├── memory/
│   └── constitution.md
└── templates/
    └── tasks-template.md

specs/
└── 001-trust-rich-listing/
    ├── plan.md
    └── tasks.md
```

**Structure Decision**: keep the governance change surgical and update only the
rule sources plus the active feature artifacts that currently conflict with the
intended workflow.

## Research Summary

- Decision: use phase-slice gating instead of only feature-level gating.
  Rationale: the user's complaint is specifically that later phases proceeded
  without a fresh spec checkpoint.
- Decision: make specialist planning passes explicit in plan artifacts.
  Rationale: "multi-agent synthesis" is too weak to audit or enforce.
- Decision: make sequential execution the default in both rules and task
  templates.
  Rationale: the user explicitly prefers fewer conflicts over parallel speed.

## Specialist Planning Record

1. `agent-orchestrator`
   Scope: frame governance gaps between intended workflow and actual artifacts.
   Output: prioritize rule enforcement, artifact consistency, and execution order.
2. `agent-product`
   Scope: define the user-facing workflow outcome for the repo operator.
   Output: emphasize approval gates, auditability, and predictable execution.
3. `agent-security`
   Scope: review trust-boundary and governance exposure risks.
   Output: require explicit approval and explicit exceptions rather than silent defaults.
4. `agent-reviewer`
   Scope: identify contradictions between rules, templates, and active artifacts.
   Output: require updating both templates and current task artifacts.
5. `agent-tester`
   Scope: define how to verify the governance update.
   Output: inspect all rule sources plus the active task file for consistency.
6. `agent-docs`
   Scope: ensure durable workflow documentation matches the updated rules.
   Output: update the user-facing workflow doc alongside `AGENTS.md`.

## Implementation Workstreams

### Workstream 1: Tighten Core Governance Rules

- Update `AGENTS.md` with phase-slice spec gating
- Require explicit specialist planning records
- Require specialist-owned sequential execution
- Make parallel work opt-in by explicit user exception only

### Workstream 2: Align Supporting Workflow Docs

- Update `.specify/memory/constitution.md`
- Update `docs/spec-driven-workflow.md`
- Update `.specify/templates/tasks-template.md`

### Workstream 3: Fix Active Feature Artifacts

- Update `specs/001-trust-rich-listing/tasks.md` so it no longer recommends parallel work
- Add specialist ownership and sequential execution order to the active task artifact
- Update `specs/001-trust-rich-listing/plan.md` so specialist planning is explicit, not implied

## Implementation Sequence

1. Update governance source of truth in `AGENTS.md`
2. Update supporting workflow docs and constitution
3. Update the Spec Kit task template
4. Update the active trust-listing plan and task artifacts
5. Inspect all updated artifacts for rule consistency

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Updating active feature artifacts as well as rules | Needed to remove contradictions immediately | Changing only top-level docs would leave the active task file in conflict |
