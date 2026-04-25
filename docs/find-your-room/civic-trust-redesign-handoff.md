# Civic Trust Visual Redesign Handoff

**Date**: 2026-04-25
**Status**: Approved spec; Multica paused; local Codex execution active
**Related Spec**: `specs/006-civic-trust-redesign-handoff/spec.md`

## Context

The Stitch export at
`/Users/hanyramadan/Downloads/stitch_roommatch_riyadh_redesign.zip` contains a
Riyadh Civic Trust design direction with seven generated screens:

- landing screen
- discover feed
- listing detail
- onboarding
- shortlist comparison
- inbox
- my stay timeline

The export also includes a `DESIGN.md` token and visual-language artifact.

## Assessment Summary

The direction is visually coherent and a strong fit for a Riyadh-first,
trust-first shared-room marketplace. Its strongest patterns are:

- institutional deep green and quiet mineral surfaces
- low-shadow, border-led hierarchy
- stronger trust and verification affordances
- clearer listing detail structure
- compatibility-first onboarding categories
- post-match stay timeline concepts

The export is not implementation-ready as-is because:

- some trust language sounds too official or government-backed
- Arabic and RTL behavior is not actually proven
- generated external images are not production-safe
- inbox avatars include unusable generated imagery
- comparison table behavior is clipped on mobile
- Stitch generated web/Tailwind HTML, while the app is Expo/React Native

## Planned Spec Slice

The next slice is a Spec Kit feature called Civic Trust Visual Redesign Handoff.
It should define the accepted redesign direction, implementation boundaries,
trust-language corrections, RTL expectations, and definition of done before any
agent starts implementation.

## Specialist Planning Record

- `agent-design`: Covered by the Stitch assessment and this handoff direction;
  primary concern is visual system quality, trust tone, and screen pattern
  selection.
- `agent-product`: Required in the Multica handoff to validate that the redesign
  supports seeker confidence without broadening product scope.
- `agent-architect`: Required in the Multica handoff to ensure token and
  component changes fit the existing Expo architecture.
- `agent-security`: Required in the Multica handoff because trust claims,
  verification wording, identity language, and location safety are central to
  the redesign.
- `agent-performance`: Required during execution planning or review because the
  redesign touches image-heavy list and detail surfaces.
- `agent-tester`: Required before completion to verify English, Arabic, RTL,
  navigation, and responsive behavior.
- `agent-reviewer`: Required before completion to check implementation
  correctness and regression risk.
- `agent-docs`: Required after execution to update docs and roadmap state.

The spec was approved by the user on 2026-04-25. Multica issues were created
from the approved scope after approval, but Multica did not provide reliable
visible progress or repo changes. Multica handoff is now paused.

## Proposed Multica Handoff After Approval

Codex should create Multica issues from the approved spec, likely in this
sequence:

1. Product and Design review the approved scope and finalize screen priorities.
2. Architect maps tokens and shared component changes to the existing app.
3. Security reviews safer trust-language and location-disclosure constraints.
4. Implementation owner executes the approved native redesign slice.
5. Tester and Reviewer assess the result.
6. Docs updates roadmap, handover, and verification artifacts.

## Multica Issues Created

Project: `RoomMatch / Find Your Room`

| Issue | Owner | Priority | Scope |
| --- | --- | --- | --- |
| `SOK-4` | Product | high | Product scope review for seeker confidence and scope control |
| `SOK-2` | Design | high | Civic Trust native pattern and token handoff |
| `SOK-5` | Architect | high | Token, shared component, sequencing, and file-risk plan |
| `SOK-3` | Security | high | Trust labels, identity wording, and location-disclosure review |
| `SOK-6` | Stitch | high | Approved native redesign execution after upstream reviews |
| `SOK-8` | Performance | medium | Image-heavy and list-heavy surface performance review |
| `SOK-7` | Tester | high | English, Arabic/RTL, navigation, touch target, and clipping verification |
| `SOK-9` | Reviewer | high | Correctness, maintainability, scope, and regression review gate |
| `SOK-10` | Docs | medium | Post-execution docs, verification, review, handover, and roadmap updates |

All issues reference `specs/006-civic-trust-redesign-handoff/spec.md`.

## Local Codex Execution Change

Multica stopped responding reliably in the project UI, so execution moved back
into this Codex workspace on 2026-04-25.

Local execution will proceed sequentially:

1. **Foundation slice**: Apply Civic Trust tokens, shared component styling, and
   safer trust-language foundations.
2. **Screen translation slice**: Translate the selected Stitch patterns into
   native landing/onboarding, discover, listing detail, shortlist, inbox, and
   stay surfaces.
3. **Verification slice**: Check English, Arabic/RTL, clipping, touch targets,
   navigation, and trust-language safety.
4. **Assessment slice**: Report visible changes, missing items, and update docs
   and roadmap state.

Active local agents:

- `agent-orchestrator`: Owns sequencing, task boundaries, and validation gates.
- `agent-implementer`: Owns code changes for each approved local slice.

The first local task is the foundation slice because every later screen change
depends on the token, component, and trust-language baseline.

## Multica Outcome Assessment

The Multica result was disappointing because the issue handoff did not produce
the minimum evidence this repo needs: visible backlog clarity, task startup
confidence, blocker recovery, file changes, and verification output.

The likely failure was the orchestration layer, not the approved spec. Issue
creation succeeded, but issue existence did not guarantee agent execution,
workspace edits, or artifact return. For this project, Multica is no longer the
execution path until the user explicitly re-enables it.

The source of truth is now:

- local Spec Kit artifacts
- local `agent-*` execution
- changed files in this repository
- local verification output
- docs and roadmap updates

## Roadmap Impact

This work is tracked as a visual-system and UX-quality slice that supports Phase
1 Trust-Rich Listing Experience and Phase 2 Compatibility-First Matching UX. It
must not expand into payments, contracts, government verification, or deep
compliance flows unless a later approved spec explicitly says so.
