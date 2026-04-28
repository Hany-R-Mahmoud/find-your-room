# Execution Prompt: Design System Deduplication

Use this prompt to hand the approved Spec Kit feature to another model.

```text
You are working in `/Users/hanyramadan/find your room`.

Read and follow `AGENTS.md` first. This repository is spec-first. Do not begin
implementation unless the spec has been approved according to the repo approval
gate, or unless the user explicitly grants direct approval in this handoff.

Active feature:
- Spec: `specs/010-design-system-deduplication/spec.md`
- Checklist: `specs/010-design-system-deduplication/checklists/requirements.md`
- Related prior spec: `specs/009-theme-token-centralization/spec.md`

Goal:
Centralize the design system across the whole app and remove redundant repeated
styles. The app should depend on design-system tokens and shared component style
contracts for reusable visual decisions. If a component already receives its
design from the design system, consuming screens must not repeat the same design
values.

Before editing:
1. Inspect `src/ui/theme.ts`, `src/ui/ThemeContext.tsx`, shared components under
   `src/components/`, auth components under `src/auth/components/`, and screens
   under `app/`.
2. Audit repeated or hardcoded style categories: colors, typography, spacing,
   radii, borders, shadows, overlays, icon sizes, form states, cards, pills,
   section headers, navigation, and trust/status indicators.
3. Classify each repeated value as:
   - existing token to reuse
   - missing token/shared style pattern to add
   - shared component responsibility
   - legitimate local style exception
4. Prefer existing patterns and minimal changes. Do not redesign the product,
   change copy, alter data shape, change routing, or touch backend behavior.

Implementation expectations:
- Reuse existing design tokens before adding new ones.
- Add new tokens only when a repeated value represents a durable app-wide design
  decision not already covered.
- Keep local styles only for screen-specific layout or unique composition.
- Preserve active theme behavior; do not replace theme-aware values with static
  light-mode values.
- Remove duplicate local styles when shared components already own the design.
- Keep TypeScript strict and do not introduce `any`.
- Make surgical changes only; every changed line should trace to the spec.

Verification:
1. Run `npm run typecheck`.
2. Audit primary screens and shared components for remaining repeated app-wide
   style values.
3. Review rendered app surfaces in supported theme and language directions,
   especially English and Arabic/RTL where available.
4. Update verification notes with:
   - files audited
   - style categories centralized
   - tokens or shared patterns added
   - remaining local-style exceptions and rationale
   - commands run and results

Completion report:
- State the visible UI change users can now see.
- State which specialist-owned slice was completed.
- Mention any remaining risk or deferred cleanup.
- Do not claim completion unless verification passed or the blocker is clearly
  documented.
```
