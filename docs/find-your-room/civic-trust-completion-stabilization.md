# Civic Trust Completion Stabilization Plan

**Date**: 2026-04-28  
**Status**: Approved; static stabilization implemented; visual review pending  
**Related Spec**: `specs/008-civic-trust-completion/spec.md`  
**Parent Phase**: `specs/006-civic-trust-redesign-handoff/spec.md`

## Purpose

This plan records the stabilization slice needed before the Civic Trust Visual
Redesign Handoff phase can be called complete.

The previous assessment found that the phase has visible work in progress, but
completion is blocked by validation failures, scope ambiguity, and missing final
manual review evidence.

## Known Blockers From Baseline

- `npm run typecheck` failed before stabilization.
- The theme context exposed the wrong color contract to components.
- `ListingCard` had missing `styles` references.
- New authentication files appear in the dirty worktree, but auth completion is
  not part of the approved Civic Trust phase.
- Manual English, Arabic/RTL, trust-language, touch-target, and small-screen
  review remains incomplete.
- Roadmap and handoff docs do not yet agree on final Phase 7 status.

## Stabilization Implemented

- Restored the legacy flat `palette` export while keeping `themeColors` for
  selected light/dark theme usage.
- Fixed the selected-theme color type in `src/ui/ThemeContext.tsx`.
- Reconnected `ListingCard` to its dynamic style factory so all referenced
  styles exist at compile time.

## Validation Evidence

- `npm run typecheck`: passed on 2026-04-28 after stabilization.
- `npx expo export --platform web`: passed on 2026-04-28 and exported `dist`.
- Static export smoke: `http://127.0.0.1:3102/` served `index.html` and
  `metadata.json` from `dist`.

## Remaining Validation Gap

Rendered browser validation is still pending. The MCP browser automation launch
failed with a connection-closed error, and the Node REPL environment did not
have `playwright` installed. Phase 7 should not be marked fully complete until
English and Arabic/RTL visual checks are completed in a real browser or device
session.

## Scope Classification

**In scope for this stabilization slice**

- `src/ui/theme.ts`: theme palette compatibility and light/dark color roles
- `src/ui/ThemeContext.tsx`: selected-theme color typing
- `src/components/ListingCard.tsx`: dynamic style creation and theme-aware
  listing card styling
- `specs/008-civic-trust-completion/`: approved stabilization spec and quality
  checklist
- `docs/find-your-room/civic-trust-completion-stabilization.md`: stabilization
  plan and evidence
- `docs/find-your-room/verification.md`: validation evidence and remaining
  rendered-review gap
- `docs/find-your-room/frontend-roadmap.md`: Phase 7 status alignment

**Deferred or separate workstream**

- `app/(auth)/` and `src/auth/`: authentication work appears in the current
  worktree, but auth completion is not part of Civic Trust completion.
- `docs/paperclip/FIN-25-auth-architecture.md` and
  `docs/find-your-room/auth-onboarding-research.md`: auth planning/reference
  material belongs to the auth workstream.
- `specs/007-design-audit-improvements/`: design-audit follow-up remains a
  separate proposed/ready-for-review slice.

**Existing worktree changes left untouched**

- Existing app redesign files, governance templates, roadmap/task docs, package
  changes, and bilingual data changes outside the three repaired code files
  remain as found unless later review assigns them to a specific approved fix.

## Plan Summary

1. Capture the current validation baseline.
2. Classify all changed files as Civic Trust completion, deferred auth/other
   work, or intentionally untouched.
3. Repair only approved completion blockers.
4. Re-run static validation after each major blocker group.
5. Review trust-language and privacy boundaries.
6. Review UX, accessibility, bilingual, and RTL behavior.
7. Run final tester and reviewer gates.
8. Update durable docs and roadmap state only after validation passes.
9. Route the completed evidence packet to `agent-pilot` for the final decision.

## Specialist Routing

- `agent-orchestrator`: blocker grouping, sequence, approval routing
- `agent-product`: scope control and visible user outcome
- `agent-architect`: theme/component/auth-boundary decisions
- `agent-implementer`: approved repairs after spec approval
- `agent-security`: trust-language, identity, location, and auth-boundary review
- `agent-design` / `agent-impeccable`: visual, RTL, accessibility, and polish
- `agent-performance`: list/media/render risk review
- `agent-tester`: static and manual verification evidence
- `agent-reviewer`: final correctness and regression gate
- `agent-docs`: durable docs and roadmap closure

## Completion Rule

Phase 7 is not complete until:

- `npm run typecheck` passes: complete
- `npx expo export --platform web` passes: complete
- English and Arabic/RTL manual review passes
- trust and verification language is reviewed as safe
- current changed files are classified
- docs and roadmap agree on final status
- `agent-pilot` approves the completion evidence or requests adjustments
