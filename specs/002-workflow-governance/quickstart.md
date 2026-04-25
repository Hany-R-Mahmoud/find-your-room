# Quickstart: Workflow Governance Tightening

## Review Steps

1. Open [AGENTS.md](/Users/hanyramadan/showrooms/AGENTS.md) and confirm it now requires:
   - a spec or spec update for each non-trivial phase
   - explicit specialist planning records
   - specialist-owned sequential execution
   - explicit user approval for any parallel exception
2. Open [docs/spec-driven-workflow.md](/Users/hanyramadan/showrooms/docs/spec-driven-workflow.md) and confirm it matches the same governance model.
3. Open [.specify/templates/tasks-template.md](/Users/hanyramadan/showrooms/.specify/templates/tasks-template.md) and confirm it no longer recommends parallel work by default.
4. Open [specs/001-trust-rich-listing/tasks.md](/Users/hanyramadan/showrooms/specs/001-trust-rich-listing/tasks.md) and confirm the active task artifact now uses specialist-owned sequential execution language.
5. Open [specs/001-trust-rich-listing/plan.md](/Users/hanyramadan/showrooms/specs/001-trust-rich-listing/plan.md) and confirm the specialist planning passes are explicit rather than implied.

## Expected Result

- All governance sources point to the same workflow.
- The active feature artifacts no longer contradict the sequential-specialist rule.
- A future reviewer can audit who should plan, who should execute, and when a new spec/update is required.
