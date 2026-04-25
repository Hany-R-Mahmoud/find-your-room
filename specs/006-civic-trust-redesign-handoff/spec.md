# Feature Specification: Civic Trust Visual Redesign Handoff

**Feature Branch**: `[006-civic-trust-redesign-handoff]`  
**Created**: 2026-04-25  
**Status**: Approved  
**Input**: User description: "Create a Spec Kit slice for Civic Trust Visual Redesign Handoff before implementation. Scope it to update design tokens, adjust shared components, implement safer trust-language model, translate selected Stitch patterns into native screens, and verify English + Arabic/RTL before calling it done."

## Approval Gate *(mandatory)*

**Spec Review Status**: Approved  
**User Decision**: Approved on 2026-04-25  
**Review Notes**: User approved the spec for Multica issue creation and specialist handoff.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Safer Trust-First Redesign Direction (Priority: P1)

As a room seeker in Riyadh, I want the app's redesigned screens to feel credible,
calm, and transparent without implying unsupported official approval, so that I
can evaluate rooms and hosts with confidence.

**Why this priority**: The redesign is centered on trust. If the app overclaims
verification or civic approval, the visual polish could reduce user confidence
and create avoidable trust, safety, and legal risk.

**Independent Test**: Review the approved copy and screen states for discover,
listing detail, onboarding, shortlist, inbox, and stay timeline. The slice
passes when every trust or verification claim uses a safe, supportable label and
no screen suggests government backing or guaranteed quality.

**Acceptance Scenarios**:

1. **Given** a screen includes a verification badge, **When** a user reads the
   label, **Then** the label clearly distinguishes platform-reviewed,
   host-provided, pending, and unavailable information.
2. **Given** a listing includes room, host, pricing, location, or identity trust
   cues, **When** the cue is shown, **Then** it avoids unsupported claims such as
   "civic approved," "guaranteed," or official government endorsement.
3. **Given** a trust claim appears in English, **When** the app is viewed in
   Arabic, **Then** the Arabic copy preserves the same trust boundary and does
   not introduce stronger claims.

---

### User Story 2 - Native Visual System Translation (Priority: P1)

As a user browsing the mobile app, I want the Stitch redesign direction to be
translated into native app screens and shared components, so that the experience
feels consistent across discover, listing detail, onboarding, shortlist, inbox,
and stay timeline.

**Why this priority**: The Stitch export is reference material, not production
implementation source. The value comes from translating its system into the
existing app architecture.

**Independent Test**: Compare the native app screens against the approved design
handoff. The slice passes when shared tokens, header, pills, listing cards,
bottom navigation, and selected screen patterns reflect the Civic Trust
direction without copying unsafe generated HTML or assets.

**Acceptance Scenarios**:

1. **Given** the app uses shared design tokens, **When** the redesign is applied,
   **Then** primary surfaces, text colors, borders, radii, and trust/status tones
   follow the approved Civic Trust token roles.
2. **Given** shared components appear across multiple screens, **When** the app
   is navigated, **Then** header, pill, card, and navigation styling remain
   visually consistent and reusable.
3. **Given** the Stitch export includes external generated images, **When** the
   redesign is implemented, **Then** unsafe or unsuitable generated imagery is
   replaced with approved existing app assets, vetted placeholders, or
   non-personal initials.

---

### User Story 3 - Bilingual And RTL Readiness (Priority: P1)

As an Arabic or English user, I want the redesigned screens to preserve meaning,
layout clarity, and touch ergonomics in both directions, so that the app remains
usable and trustworthy in its Riyadh-first context.

**Why this priority**: The Stitch export includes an English-only design and an
EN/AR affordance, but it does not demonstrate Arabic copy, RTL layout, or
bilingual behavior.

**Independent Test**: Switch the app between English and Arabic and inspect each
affected screen. The slice passes when content order, alignment, icons,
navigation, and wrapping work without clipping or overlap.

**Acceptance Scenarios**:

1. **Given** the app is in Arabic, **When** a user opens each redesigned screen,
   **Then** primary content aligns and orders correctly for RTL.
2. **Given** English and Arabic labels differ in length, **When** they appear in
   buttons, badges, cards, filters, tables, and navigation, **Then** text wraps
   or resizes within stable containers without overlap.
3. **Given** a directional icon is used, **When** the locale changes direction,
   **Then** the icon direction remains semantically correct.

---

### User Story 4 - Verifiable Agent Handoff And Completion Review (Priority: P2)

As the project owner, I want the approved spec converted into clear Multica
issues and reviewed after execution, so that specialist agents can execute the
work without losing the project rules or missing docs updates.

**Why this priority**: This repository requires Spec Kit first, Multica handoff
after approval, and post-execution assessment before the work is considered
complete.

**Independent Test**: Inspect the Multica issues and completion report. The
slice passes when the issues map back to this spec, owners are clear, and Codex
reports what is complete, what is missing, and which docs or roadmap files were
updated.

**Acceptance Scenarios**:

1. **Given** this spec is approved, **When** Codex creates Multica issues,
   **Then** each issue includes scope, acceptance criteria, owner agent, priority,
   and references to the approved spec.
2. **Given** the Multica agents finish execution, **When** Codex assesses the
   result, **Then** the report identifies visible app changes, missing items,
   verification status, and docs/roadmap updates.

### Edge Cases

- Trust badges must remain understandable when a listing has partial, pending,
  or host-provided information.
- Generated people imagery from Stitch must not be used if it creates identity,
  representation, or credibility problems.
- Comparison and shortlist patterns must not rely on horizontally clipped tables
  on narrow mobile screens.
- Sticky headers, bottom navigation, and sticky CTAs must not cover content on
  small phones.
- Arabic strings may be longer or shorter than English strings; containers must
  remain stable.
- The redesign must not introduce payments, contracts, government verification,
  exact-address exposure, or deep compliance flows.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The redesign handoff MUST define the Civic Trust visual direction
  as a native app translation, not as a direct copy of Stitch HTML.
- **FR-002**: The redesign MUST update the app's design-token direction for
  core color roles, text roles, borders, radii, spacing, and status/trust tones.
- **FR-003**: The redesign MUST adjust shared components that carry the visual
  system across the app, including header, pills, listing cards, and bottom
  navigation.
- **FR-004**: The redesign MUST apply selected Stitch screen patterns to the
  native app surfaces for landing/onboarding, discover feed, listing detail,
  shortlist/comparison, inbox, and stay timeline where they support the approved
  product direction.
- **FR-005**: The redesign MUST replace unsupported trust labels with safer
  language that distinguishes platform-reviewed, host-provided, pending,
  unavailable, and user-entered information.
- **FR-006**: The redesign MUST avoid language that implies official government
  approval, guaranteed quality, guaranteed identity, or legal/compliance status
  unless an approved future spec adds that capability.
- **FR-007**: The redesign MUST preserve the current Riyadh-first,
  shared-room-marketplace scope and MUST NOT expand into payments, contracts,
  government services, exact-address disclosure, or deep compliance workflows.
- **FR-008**: The redesign MUST support English and Arabic copy for every
  affected user-facing label, badge, call to action, empty state, and trust
  explanation.
- **FR-009**: The redesign MUST support RTL layout behavior for all affected
  screens, including text alignment, row direction, navigation order, and
  directional icons.
- **FR-010**: The redesign MUST remove or replace unsafe Stitch-generated
  external assets, especially generated person avatars and non-owned image URLs.
- **FR-011**: The redesign MUST keep mobile touch targets large enough for
  reliable tapping and avoid clipped content, overlapping text, and covered
  CTAs.
- **FR-012**: The redesign MUST include a verification checklist covering visual
  comparison, English behavior, Arabic/RTL behavior, trust-language safety,
  navigation, and basic accessibility.
- **FR-013**: Codex MUST create Multica issues only after user approval of this
  spec, and each issue MUST reference this spec and define the assigned
  specialist's scope.
- **FR-014**: After execution finishes, Codex MUST assess the delivered result,
  report missing work, and update the relevant docs and roadmap files.

### Key Entities *(include if feature involves data)*

- **Design Token Role**: A named visual value or semantic style role used to
  keep the redesign consistent across screens, such as primary action, surface,
  border, muted text, verified status, warning, and error.
- **Trust Label**: A user-facing badge or text snippet that communicates the
  source and confidence level of listing, host, identity, location, price, or
  household information.
- **Screen Pattern**: A reusable layout or interaction concept derived from the
  Stitch export and translated into native app behavior.
- **Multica Execution Issue**: A task created after approval that assigns a
  specialist agent a bounded part of the approved spec.
- **Post-Execution Assessment**: Codex's completion review that compares the
  implementation against this spec, records missing items, and updates durable
  docs.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of affected trust and verification labels avoid unsupported
  official, guaranteed, or government-backed claims in both English and Arabic.
- **SC-002**: 100% of affected screens render without obvious clipping,
  incoherent overlap, or covered primary actions on small-phone and standard
  mobile viewports.
- **SC-003**: 100% of affected user-facing strings are available in English and
  Arabic before the redesign is marked complete.
- **SC-004**: A reviewer can trace every Multica execution issue back to this
  approved spec and its acceptance criteria.
- **SC-005**: The final assessment report identifies completed visible changes,
  verification evidence, missing items if any, and docs/roadmap updates.
- **SC-006**: The redesign keeps the implementation within the existing
  shared-room marketplace scope without introducing payments, legal contracts,
  official government verification, or exact-address exposure.

## Assumptions

- The Stitch export is a reference artifact and design direction, not production
  source code.
- The current app should use existing routing, localization, and shared
  component patterns where practical.
- The initial implementation should prioritize seeker-facing trust, matching,
  comparison, inbox, and stay-readiness surfaces over host-side flows.
- Existing placeholder data may be adapted, but trust claims must remain
  truthful about what the app currently supports.
- Multica execution should occur only after this spec receives explicit user
  approval.
- English and Arabic must be treated as first-class acceptance surfaces.

## Definition Of Done

- The approved spec is converted into clear Multica issues with appropriate
  specialist owners and acceptance criteria.
- Native app changes reflect the Civic Trust direction through tokens, shared
  components, and selected screen patterns.
- Unsafe or unsuitable generated Stitch assets are not used in production paths.
- Trust language is safer, source-aware, and consistent in English and Arabic.
- English and Arabic/RTL verification is completed and documented.
- Codex completes a post-execution assessment and updates relevant docs and the
  frontend roadmap.

## Specialist Handoff Plan

- **Product**: Validate that the redesign improves seeker confidence without
  expanding marketplace scope.
- **Design/Stitch**: Translate the Stitch export into selected native patterns,
  token roles, and visual rules.
- **Architect**: Map token and shared component changes to the existing app
  structure.
- **Security**: Review trust language, identity wording, location disclosure,
  and unsupported verification claims.
- **Performance**: Review image-heavy and list-heavy surfaces for avoidable
  responsiveness regressions.
- **Tester**: Verify English, Arabic/RTL, navigation, touch targets, and
  responsive behavior.
- **Reviewer**: Review implementation correctness and regression risk.
- **Docs**: Update handoff, verification, review, and roadmap docs after
  execution.

## Multica Handoff Record

Created on 2026-04-25 after user approval:

- `SOK-4`: Product scope review
- `SOK-2`: Design native pattern handoff
- `SOK-5`: Architecture plan
- `SOK-3`: Security trust-language review
- `SOK-6`: Stitch execution
- `SOK-8`: Performance review
- `SOK-7`: Tester verification
- `SOK-9`: Reviewer gate
- `SOK-10`: Docs update

## Next Step Gate

This spec was approved by the user on 2026-04-25. Multica issue creation and
specialist handoff may proceed from this approved scope.
