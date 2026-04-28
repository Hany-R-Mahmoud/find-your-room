# Feature Specification: Civic Trust Completion Stabilization

**Feature Branch**: `[008-civic-trust-completion]`  
**Created**: 2026-04-28  
**Status**: Approved; static stabilization implemented  
**Input**: User description: "Create a Spec Kit spec with the plan to fix all issues from the Civic Trust phase assessment until this phase can be called complete."

## Approval Gate *(mandatory)*

**Spec Review Status**: Approved by user  
**Approval Owner**: User direct approval  
**Decision**: Approved on 2026-04-28  
**Review Notes**: User explicitly approved this stabilization slice and asked
for implementation to proceed with `agent-implementer`.

For Paperclip-managed work, `agent-pilot` may approve, reject, request
revisions, or request priority input from specialist agents. Direct human
approval is required only when the user explicitly asks for it.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Restore A Valid Completion Baseline (Priority: P1)

As the project owner, I want the current Civic Trust work to return to a clean
validation baseline, so that the app can be reviewed as a real phase candidate
instead of a broken work-in-progress.

**Why this priority**: The current phase cannot be called complete while the
basic validation gate fails. Type errors and broken shared component structure
block every downstream review.

**Independent Test**: Run the standard validation commands and confirm the app
has no compile-blocking errors before manual review starts.

**Acceptance Scenarios**:

1. **Given** the current dirty worktree contains Civic Trust redesign changes,
   **When** the stabilization slice is complete, **Then** the standard static
   validation gate passes without TypeScript errors.
2. **Given** shared visual tokens are used across app screens, **When** any
   affected screen imports or reads theme colors, **Then** it receives the
   selected theme color contract rather than an invalid palette wrapper.
3. **Given** listing cards are central to the Civic Trust experience, **When**
   the card component renders, **Then** all required styles and data references
   exist and the component can be validated without compile errors.

---

### User Story 2 - Preserve Approved Phase Scope While Fixing Regressions (Priority: P1)

As the project owner, I want the stabilization work to separate approved Civic
Trust fixes from unrelated feature expansion, so that completion does not hide
new unapproved scope inside a cleanup pass.

**Why this priority**: The worktree includes authentication files and other
changes that may be useful later, but the approved Civic Trust phase is about
visual trust, shared components, bilingual/RTL readiness, and safe claims.

**Independent Test**: Review the changed-file set and completion report to
confirm every accepted change either directly supports Civic Trust completion or
is explicitly moved into a separate pending spec/workstream.

**Acceptance Scenarios**:

1. **Given** files outside the Civic Trust redesign scope exist in the worktree,
   **When** the stabilization plan is executed, **Then** each file is classified
   as in-scope, blocked pending a separate spec, or intentionally left untouched
   with a documented reason.
2. **Given** authentication work appears in the app, **When** Civic Trust
   completion is assessed, **Then** auth is not treated as complete or required
   for this phase unless an approved auth spec separately authorizes that scope.
3. **Given** docs mention Multica or Paperclip handoff, **When** the phase is
   closed, **Then** the source of truth is local Spec Kit artifacts, local diffs,
   local verification, and roadmap updates.

---

### User Story 3 - Complete Trust, UX, Bilingual, And Accessibility Review (Priority: P2)

As a Riyadh room seeker using English or Arabic, I want the completed Civic Trust
screens to feel credible, readable, and safe, so that the redesign improves
confidence without overclaiming verification or breaking RTL layouts.

**Why this priority**: Static validation proves the app can build, but the
phase is not complete until the user-facing experience is manually checked
against the approved trust-first requirements.

**Independent Test**: Open each affected screen in English and Arabic and
confirm trust wording, layout direction, touch targets, navigation, and visual
density meet the approved Civic Trust criteria.

**Acceptance Scenarios**:

1. **Given** a screen contains trust or verification language, **When** it is
   reviewed in English and Arabic, **Then** it avoids official, guaranteed, or
   government-backed claims.
2. **Given** Arabic copy is longer or directionally different, **When** the app
   is reviewed in RTL, **Then** text, icons, navigation, cards, badges, and CTAs
   remain readable without clipping, overlap, or covered actions.
3. **Given** users interact on a small phone viewport, **When** they navigate the
   affected screens, **Then** touch targets remain usable and sticky or bottom
   navigation elements do not hide primary content.

---

### User Story 4 - Close The Phase With Durable Evidence (Priority: P2)

As the project owner, I want the completion status recorded in specs, docs, and
roadmap files, so that future agents can tell exactly what was fixed, validated,
and left for later.

**Why this priority**: The repository has several status records that now drift
from the current implementation state. The phase should not be called complete
without durable evidence.

**Independent Test**: Inspect the final docs and verify they list the visible
app changes, validation commands, manual review outcome, remaining risks, and
any deferred follow-up work.

**Acceptance Scenarios**:

1. **Given** the stabilization work passes validation, **When** docs are
   updated, **Then** the roadmap reflects the real Phase 7 state and no longer
   claims work is waiting on unreliable Multica execution.
2. **Given** manual review finds remaining issues, **When** the phase report is
   written, **Then** those issues are either fixed before completion or recorded
   as explicit follow-up blockers.
3. **Given** the phase is marked complete, **When** a future agent reads the
   spec and docs, **Then** they can trace completion to local verification
   evidence and changed files.

### Edge Cases

- The theme contract may be wrong in one shared provider but produce errors
  across many screens; the fix should target the contract, not patch every call
  site blindly.
- Authentication files may be valuable but still out of scope for Civic Trust
  completion; do not make the Civic Trust definition of done depend on an
  unfinished auth MVP.
- Static validation may pass while Arabic/RTL or small-phone review still fails;
  the phase remains incomplete until both automated and manual gates pass.
- Existing user or generated changes in the dirty worktree must not be reverted
  without explicit approval.
- Docs may mention both Phase 1 and Phase 7; completion updates must reconcile
  the actual current phase instead of changing unrelated roadmap history.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The stabilization MUST restore the app to a clean static
  validation baseline for the current worktree.
- **FR-002**: The stabilization MUST repair the selected-theme color contract so
  components and screens can safely read shared color roles.
- **FR-003**: The stabilization MUST repair the listing card component so all
  referenced styles, data fields, and rendered sections are valid.
- **FR-004**: The stabilization MUST classify changed files that are outside the
  Civic Trust completion scope, especially authentication-related files, before
  deciding whether they are fixed, deferred, or left untouched.
- **FR-005**: The stabilization MUST avoid introducing new product capabilities
  such as payments, contracts, government verification, exact-address exposure,
  or full authentication completion as part of this phase.
- **FR-006**: The stabilization MUST verify that affected trust and verification
  labels remain source-aware and avoid unsupported official or guaranteed
  claims in English and Arabic.
- **FR-007**: The stabilization MUST verify affected screens in English and
  Arabic/RTL for clipping, overlap, covered CTAs, navigation correctness, and
  touch target usability.
- **FR-008**: The stabilization MUST run and record the standard static checks:
  `npm run typecheck` and `npx expo export --platform web`.
- **FR-009**: The stabilization MUST update durable docs and roadmap records
  after validation, including the Civic Trust handoff record, verification
  notes, and frontend roadmap status.
- **FR-010**: The stabilization MUST include a final completion assessment that
  lists completed visible changes, validation evidence, missing items, and any
  follow-up work.
- **FR-011**: The stabilization MUST use sequential specialist-owned handoffs by
  default and MUST NOT rely on Multica execution unless the user explicitly
  re-enables it.
- **FR-012**: The stabilization MUST preserve existing user changes and avoid
  unrelated formatting or refactors outside the files needed for completion.

### Key Entities *(include if feature involves data)*

- **Completion Blocker**: A failed validation result, broken component contract,
  scope ambiguity, or manual review issue that prevents the Civic Trust phase
  from being marked complete.
- **Scope Classification**: A decision for each changed file or work area:
  in-scope for Civic Trust completion, deferred to another spec, or untouched
  with a documented reason.
- **Validation Evidence**: Command output, manual review notes, and docs updates
  that prove the phase meets its definition of done.
- **Specialist Handoff**: A sequential ownership step assigned to the relevant
  local `agent-*` role for implementation, review, testing, security, or docs.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `npm run typecheck` passes with zero TypeScript errors for the
  completed worktree.
- **SC-002**: `npx expo export --platform web` completes successfully for the
  completed worktree.
- **SC-003**: 100% of current changed files are classified as in-scope,
  deferred, or intentionally untouched in the final completion report.
- **SC-004**: 100% of affected trust and verification labels reviewed in English
  and Arabic avoid unsupported official, guaranteed, or government-backed
  claims.
- **SC-005**: 100% of affected primary screens reviewed manually in English and
  Arabic/RTL have no obvious clipping, incoherent overlap, covered CTAs, or
  unusable touch targets on small-phone and standard mobile viewports.
- **SC-006**: The frontend roadmap, Civic Trust handoff note, and verification
  notes all agree on whether Phase 7 is complete, blocked, or still in review.

## Assumptions

- The approved parent phase remains `specs/006-civic-trust-redesign-handoff`.
- This slice is a completion/stabilization slice, not a replacement for the
  approved Civic Trust redesign scope.
- The current dirty worktree may contain changes from prior agents or the user;
  those changes must be preserved unless the user explicitly approves removal.
- Local Codex execution, local specialist skills, local verification commands,
  and git-visible files are the source of truth.
- Multica remains paused and should not be used for issue creation, execution,
  or status verification.
- Paperclip/agent-pilot approval remains the default delegated approval gate for
  this non-trivial slice.

## Orchestrated Execution Plan

1. **Triage Baseline**: `agent-orchestrator` records the current validation
   failures, dirty worktree scope, and blocker categories.
   - Verification: baseline `npm run typecheck` errors are captured and grouped.
2. **Scope Decision**: `agent-product` and `agent-architect` classify in-scope
   Civic Trust fixes versus deferred auth or unrelated work.
   - Verification: every changed file has a recorded scope classification.
3. **Implementation Repair**: `agent-implementer` fixes only approved blockers,
   prioritizing the theme contract and listing card regression before any
   screen-level cleanup.
   - Verification: static validation is re-run after each blocker group.
4. **Trust And Safety Review**: `agent-security` reviews trust-language,
   identity, verification, location, and auth-boundary implications.
   - Verification: unsafe claims are fixed or recorded as completion blockers.
5. **UX And Accessibility Review**: `agent-design` or `agent-impeccable`
   reviews visual consistency, density, touch targets, and bilingual/RTL screen
   quality.
   - Verification: manual EN/AR and small-screen review notes are captured.
6. **Performance Review**: `agent-performance` reviews list rendering, media,
   theme/provider changes, and avoidable render churn on affected screens.
   - Verification: no avoidable performance regression remains unaddressed.
7. **Final Tester Gate**: `agent-tester` runs the standard command checks and
   manual validation checklist.
   - Verification: typecheck, web export, and manual checks pass.
8. **Reviewer Gate**: `agent-reviewer` inspects the final diff for correctness,
   maintainability, scope drift, and missing tests or docs.
   - Verification: no blocking review findings remain.
9. **Docs Closure**: `agent-docs` updates durable docs, roadmap status,
   verification notes, and final completion assessment.
   - Verification: docs agree with the validated phase status.
10. **Final Approval**: `agent-pilot` records approved, requested adjustments,
    or rejected based on the final evidence packet.
    - Verification: phase is not marked complete until approval and evidence
      agree.

## Specialist Plan

- `agent-orchestrator`: Owns sequencing, blocker grouping, scope classification
  structure, and approval routing.
- `agent-product`: Confirms completion criteria remain tied to seeker-visible
  Civic Trust value rather than broad platform expansion.
- `agent-architect`: Confirms theme/provider/component boundaries and decides
  how to isolate deferred auth work if needed.
- `agent-implementer`: Performs approved repairs only after this spec is
  approved.
- `agent-security`: Reviews trust labels, verification language, identity,
  location, and auth-boundary risks.
- `agent-design` / `agent-impeccable`: Reviews visual quality, accessibility,
  RTL behavior, and screen polish.
- `agent-performance`: Checks list/media/render risks after repairs.
- `agent-tester`: Owns static and manual verification evidence.
- `agent-reviewer`: Performs final correctness and regression review.
- `agent-docs`: Updates durable project records after validation.

## Next Step Gate

This spec received direct user approval on 2026-04-28. Static stabilization
implementation may proceed from this scope; final phase completion still
requires the validation evidence described above.
