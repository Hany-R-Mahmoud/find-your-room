# Feature Specification: Design System Deduplication

**Feature Branch**: `[010-design-system-deduplication]`  
**Created**: 2026-04-28  
**Status**: Draft  
**Input**: User description: "Decentralize the design system for the whole app, remove redundant repeated styles anywhere in the app, and depend only on the design system and design tokens. If a component already receives its design from the design system, do not repeat it."

## Approval Gate *(mandatory)*

**Spec Review Status**: Pending `agent-pilot` approval  
**Approval Owner**: `agent-pilot`  
**Decision**: Pending  
**Review Notes**: Awaiting delegated approval before planning or implementation

For Paperclip-managed work, `agent-pilot` may approve, reject, request
revisions, or request priority input from specialist agents. Direct human
approval is required only when the user explicitly asks for it.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - One Design Source Across The App (Priority: P1)

As the project owner, I want app styling to come from a single design system and
token source, so the product looks coherent and future visual changes do not
require repeated page-by-page edits.

**Why this priority**: The app already has a design-system direction, but
screen-level repeated style values make the interface harder to maintain and
increase the risk of visual drift.

**Independent Test**: Review every app screen and shared component. The slice
passes when colors, typography, spacing, radii, borders, shadows, layout
rhythms, and common component states use approved design-system tokens or
shared component styles unless a local value is explicitly justified.

**Acceptance Scenarios**:

1. **Given** a designer or developer changes an approved token, **When** the
   app is rendered, **Then** all in-scope screens that depend on that token
   update without local duplicate edits.
2. **Given** a screen uses a shared component with built-in design-system
   styling, **When** that component is rendered, **Then** the screen does not
   repeat the same styling locally.
3. **Given** two screens display the same UI pattern, **When** their styles are
   inspected, **Then** shared visual decisions come from the same design-system
   contract rather than copied numeric or color values.

---

### User Story 2 - Clear Token Ownership For Implementers (Priority: P1)

As a developer adding or editing a screen, I want a clear rule for which styles
belong in the design system, which styles belong in shared components, and which
styles may remain local, so I can keep new work consistent without guessing.

**Why this priority**: Deduplication can become risky if every local style is
removed blindly. The app needs a durable boundary between reusable visual
language and screen-specific composition.

**Independent Test**: Inspect the design-system documentation, token exports,
and migrated screens. The slice passes when common style categories have an
approved central home and remaining local styles are limited to layout or
content-specific exceptions.

**Acceptance Scenarios**:

1. **Given** a repeated font size, color, border, spacing, shadow, or radius is
   found, **When** it maps to an app-wide design decision, **Then** it is moved
   to or replaced by the design-system token or shared style pattern.
2. **Given** a local style only describes one-off screen layout or image
   composition, **When** it is inspected, **Then** it may remain local with no
   duplicate app-wide design value.
3. **Given** an existing component already receives its colors or layout from
   the design system, **When** the app is audited, **Then** consuming screens do
   not restate those same design values.

---

### User Story 3 - Verified Visual Stability After Refactor (Priority: P2)

As a user browsing rooms, matches, onboarding, auth, inbox, profile, and stay
screens, I want the app to look the same or better after the cleanup, so a
maintainability refactor does not degrade usability or trust.

**Why this priority**: This work is mostly structural, but it touches visible
styling across primary app flows. Verification must prove the cleanup preserves
the Riyadh-first, trust-first visual direction.

**Independent Test**: Compare primary screens before and after the migration in
English and Arabic/RTL where supported. The slice passes when visual regressions
are either absent or intentionally documented and approved.

**Acceptance Scenarios**:

1. **Given** the app has been migrated to central tokens, **When** primary
   screens are rendered, **Then** text hierarchy, spacing, input affordances,
   list cards, pills, navigation, and trust cues remain visually coherent.
2. **Given** the app is viewed in Arabic/RTL, **When** the migrated screens are
   rendered, **Then** the deduplication does not break alignment, spacing, or
   readable hierarchy.
3. **Given** the implementation removes duplicate styles, **When** verification
   is complete, **Then** the report identifies the files audited, the categories
   centralized, and any intentional local-style exceptions.

### Edge Cases

- Some local styles describe unique layout composition and should not be forced
  into the design system if centralizing them would make the code less clear.
- Some repeated values may be accidental duplicates of existing tokens; these
  should be replaced with token references instead of new token creation.
- Some repeated values may reveal missing token categories such as typography,
  overlays, input states, card variants, button variants, or icon sizes.
- Style values embedded in localized content or sample data should be audited,
  but only migrated when they represent UI design rather than content metadata.
- Theme-aware styles must continue to resolve from active semantic tokens, not
  from static light-mode fallbacks.
- Accessibility-sensitive values such as contrast, touch target size, and focus
  affordances must not regress during deduplication.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST define an approved central design-system contract for
  reusable colors, typography, spacing, radii, borders, shadows, layout rhythm,
  overlays, component variants, and common interaction states.
- **FR-002**: The app MUST inventory repeated style values and classify each as
  an existing token, a missing token or shared style pattern, a shared component
  responsibility, or a legitimate local exception.
- **FR-003**: The app MUST replace redundant repeated style values with
  design-system tokens or shared component styles when those values represent
  app-wide visual decisions.
- **FR-004**: The app MUST avoid duplicating design values in screens when a
  shared component already receives those values from the design system.
- **FR-005**: The app MUST keep local styles limited to screen-specific layout,
  content-specific composition, or clearly justified one-off visual needs.
- **FR-006**: The app MUST preserve active theme behavior for theme-aware
  values, including text, surfaces, borders, icons, inputs, and status accents.
- **FR-007**: The app MUST document the resulting design-system usage rules so
  future implementers know where new reusable styles belong.
- **FR-008**: The app MUST include verification evidence for primary screens,
  shared components, English and Arabic/RTL rendering where supported, and
  accessibility-sensitive styling.
- **FR-009**: The migration MUST avoid broad feature changes, copy rewrites,
  data-shape changes, routing changes, or unrelated visual redesign work.

### Key Entities *(include if feature involves data)*

- **Design Token**: A named reusable value for an app-wide design decision, such
  as semantic color, spacing, type scale, radius, border, shadow, icon size, or
  overlay treatment.
- **Shared Style Pattern**: A reusable design-system style grouping for common
  UI patterns such as cards, forms, buttons, pills, section headers, navigation,
  or trust/status indicators.
- **Shared Component Responsibility**: The styling a component owns internally
  because consumers should not repeat or override the same design values.
- **Local Style Exception**: A screen-specific style that remains local because
  it describes unique composition rather than reusable design language.
- **Audit Finding**: A recorded duplicate or hardcoded style value with its
  classification, migration decision, and verification status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of primary app screens and shared components are audited for
  hardcoded or repeated design values.
- **SC-002**: 100% of audited repeated app-wide design values are replaced by an
  existing token, a newly approved token, or a shared component/style pattern.
- **SC-003**: 0 consuming screens repeat design-system styles that are already
  owned by shared components, except for documented local exceptions.
- **SC-004**: 100% of remaining local style exceptions are documented by
  category or file-level rationale in the verification notes.
- **SC-005**: Type checking succeeds after the migration.
- **SC-006**: Primary screens remain visually readable and coherent in supported
  themes and supported language directions after deduplication.
- **SC-007**: Future implementers can identify the correct design-system source
  for common colors, typography, spacing, radii, borders, shadows, overlays, and
  component variants without inspecting unrelated screens.

## Assumptions

- This spec expands the narrower `009-theme-token-centralization` concern from
  color/theme consistency into whole-app design-system deduplication.
- The work should preserve the current Riyadh-first, trust-first Civic Trust
  visual direction rather than create a new brand direction.
- The implementation should favor the existing design-system modules and shared
  components before introducing new abstractions.
- Token additions are allowed only when an audited repeated value represents a
  durable app-wide design decision that is not already covered.
- The app may keep local layout styles when centralizing them would obscure
  screen-specific composition or increase complexity.
- Verification can be completed through static audit, type checking, and
  rendered screen review; no backend changes are expected.

## Next Step Gate

This spec must be reviewed and approved by `agent-pilot` before
`/speckit.plan`, task generation, or implementation begins, unless the user
explicitly requests direct human approval for this feature.
