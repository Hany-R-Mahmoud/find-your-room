# Feature Specification: Theme Token Centralization

**Feature Branch**: `[009-theme-token-centralization]`  
**Created**: 2026-04-28  
**Status**: Draft  
**Input**: User description: "The font color issue should be handled centrally, not page by page. If that isn't implemented, this is a major design system issue that should be handled."

## Approval Gate *(mandatory)*

**Spec Review Status**: Pending `agent-pilot` approval  
**Approval Owner**: `agent-pilot`  
**Decision**: Pending  
**Review Notes**: Awaiting delegated approval before planning or implementation

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consistent Theme Behavior Across Screens (Priority: P1)

As a user switching theme modes, I want text, surfaces, inputs, icons, and
interactive states to remain readable and coherent everywhere, so that theme
mode never creates broken contrast or half-themed screens.

**Why this priority**: Theme inconsistency is a trust and usability defect.
When the app background changes but text and fields still use static light
tokens, the interface becomes unreadable.

**Independent Test**: Switch the app theme and inspect auth, discover, room
detail, profile, inbox, stay, shortlist/matches, onboarding, and landing
surfaces. The slice passes when all affected screens use the active semantic
theme tokens consistently.

**Acceptance Scenarios**:

1. **Given** the app is in a selected theme mode, **When** a screen renders,
   **Then** text, input placeholders, icons, surfaces, borders, and accents all
   resolve from the same active theme token set.
2. **Given** a screen uses shared components, **When** the theme changes,
   **Then** those components update consistently without requiring page-level
   hardcoded color patches.
3. **Given** a user navigates across the app, **When** they move between
   screens, **Then** they do not encounter isolated light-mode text on dark
   backgrounds or the inverse.

---

### User Story 2 - Centralized Token Consumption For Implementers (Priority: P1)

As a developer working in the app, I want one approved way to consume semantic
theme colors, so that new screens do not accidentally bypass the design system
with static palette imports.

**Why this priority**: The current architecture allows both static token usage
and runtime theme usage, which creates drift and makes regressions easy.

**Independent Test**: Review the codebase and confirm that theme-aware surfaces
use the approved central consumption pattern rather than ad hoc light-palette
imports in screen-level styles.

**Acceptance Scenarios**:

1. **Given** a developer creates or updates a themed screen, **When** they need
   colors, **Then** the codebase provides one central semantic token path to use.
2. **Given** an existing screen still uses static palette access for themed
   content, **When** the migration is complete, **Then** that screen is either
   migrated or explicitly marked as outside the current theme scope.
3. **Given** shared theme tokens evolve later, **When** token values are
   changed centrally, **Then** screens update without requiring manual per-page
   color edits.

---

### User Story 3 - Trustworthy Design-System Boundaries (Priority: P2)

As the project owner, I want the design system to state clearly whether dark
mode is supported, partially supported, or deferred, so that we do not ship a
theme toggle or system-theme behavior that overpromises what the UI can
actually render correctly.

**Why this priority**: A partially implemented theme system is worse than an
explicitly limited one because it creates silent regressions.

**Independent Test**: Review docs, theme provider behavior, and affected
screens. The slice passes when the implemented theme behavior matches the
documented support level.

**Acceptance Scenarios**:

1. **Given** dark mode is not yet fully migrated, **When** the app runs,
   **Then** the product does not silently expose a broken partial dark mode.
2. **Given** dark mode is considered in scope for this slice, **When** the
   migration is complete, **Then** the validation report confirms all primary
   screens meet contrast and readability expectations in both modes.
3. **Given** future agents or developers inspect the repo, **When** they read
   the design-system and verification docs, **Then** they can understand the
   actual theme support boundary without guessing.

### Edge Cases

- Static `StyleSheet.create(...)` blocks cannot react to runtime theme changes
  unless styles are derived from active colors inside components or through a
  shared theme-aware style factory.
- Some screens may be intentionally excluded from dark-mode support in the first
  pass, but those exclusions must be explicit.
- Shared components may look correct while leaf screens remain broken if they
  still import static light tokens.
- Theme-aware placeholders, disabled text, helper text, and icon colors must be
  reviewed along with main body text.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST define one approved central pattern for consuming
  active semantic theme colors in themed screens and components.
- **FR-002**: The app MUST remove or strictly constrain direct static light
  palette usage on screens that are expected to support runtime theme behavior.
- **FR-003**: Shared components and affected screens MUST use the approved
  active theme token path for text, icons, input states, surfaces, borders, and
  status accents.
- **FR-004**: The implementation MUST explicitly decide whether dark mode is
  fully supported in this slice or deferred behind a clear product boundary.
- **FR-005**: The implementation MUST prevent users from encountering unreadable
  mixed-theme screens.
- **FR-006**: The implementation MUST include validation for contrast and
  readability across the primary app surfaces in the supported theme modes.
- **FR-007**: Docs and verification notes MUST state the actual theme support
  level after implementation.

### Key Entities *(include if feature involves data)*

- **Semantic Theme Token**: A runtime-resolved color role such as canvas,
  surface, ink, muted text, border, success, warning, or accent.
- **Theme Consumption Pattern**: The approved code-level way screens and
  components obtain active theme tokens.
- **Theme Support Boundary**: The documented scope that says whether light mode
  only, full dark mode, or a staged migration is supported.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of in-scope primary screens render readable text and inputs
  in the supported theme modes.
- **SC-002**: 100% of in-scope shared components resolve colors from the active
  semantic theme token path rather than hardcoded light palette values.
- **SC-003**: Developers can update theme values centrally and see changes apply
  to in-scope screens without page-by-page color overrides.
- **SC-004**: Verification docs accurately describe the implemented theme
  support boundary.

## Assumptions

- The current contrast bug is a symptom of mixed token-consumption patterns, not
  a one-off auth-screen bug.
- Theme migration should follow the existing Civic Trust visual language rather
  than invent a separate dark-mode brand.
- This slice may choose a staged rollout if full app-wide dark mode is too large
  for one safe pass, but the staged boundary must be explicit.

## Next Step Gate

This spec must be reviewed and approved by `agent-pilot` before planning or
implementation begins, unless the user explicitly requests direct human
approval for this feature.
