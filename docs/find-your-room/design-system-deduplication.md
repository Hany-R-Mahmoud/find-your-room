# Design System Deduplication Spec Note

## Status

Drafted on 2026-04-28 as Spec Kit feature
`specs/010-design-system-deduplication/spec.md`.

## Purpose

This work expands the previous theme/color centralization concern into a
whole-app design-system cleanup. The goal is to remove repeated app-wide style
values and make reusable visual decisions flow through the design system,
design tokens, or shared components.

## Scope Summary

- Audit app screens and shared components for repeated colors, typography,
  spacing, radii, borders, shadows, overlays, icon sizes, form states, cards,
  pills, section headers, navigation, and trust/status indicators.
- Reuse existing tokens before adding new ones.
- Add tokens or shared style patterns only for durable app-wide visual
  decisions.
- Keep local styles when they describe screen-specific layout or unique
  composition.
- Avoid visual redesign, routing changes, data-shape changes, backend changes,
  or copy rewrites.

## Specialist Planning Record

- `agent-orchestrator`: skipped for this draft because the user requested a
  focused Spec Kit artifact and handoff prompt, not a full multi-agent planning
  pass.
- `agent-product`: represented in the spec through user value, acceptance
  criteria, and definition of done focused on maintainability and visual trust.
- `agent-design` / `agent-impeccable`: represented in the spec through token
  ownership, component style boundaries, and visual regression expectations.
- `agent-architect`: represented in the spec through central ownership,
  deduplication boundaries, and local exception rules.
- `agent-security`: skipped for the draft because the requested work is visual
  and structural; accessibility and trust-sensitive styling are still included.
- `agent-performance`: represented in the spec by avoiding broad redesign and
  unnecessary abstractions; full performance review is deferred to planning.
- `agent-reviewer` / `agent-tester`: represented in the spec through audit,
  checklist, typecheck, rendered review, and verification requirements.
- `agent-docs`: represented by this durable note and the execution prompt.

## Next Step

Route the spec for approval. After approval, run the normal Spec Kit plan and
tasks flow before implementation.
