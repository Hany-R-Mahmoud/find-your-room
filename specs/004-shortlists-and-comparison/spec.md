# Feature Specification: Saved Shortlists And Comparison

**Feature Branch**: `[004-shortlists-and-comparison]`  
**Created**: 2026-04-21  
**Status**: Approved feature scope; Phase 6 slice pending approval  
**Input**: User description: "Proceed with the next Spec Kit cycle for saved shortlists and comparison, based on the international research round."

## Approval Gate *(mandatory)*

**Spec Review Status**: Approved feature scope; active slice pending review  
**User Decision**: Feature scope approved on 2026-04-21; latest slice approval tracked below  
**Review Notes**: Derived from the approved international research round. The goal is to help seekers save, revisit, and compare serious options across trust, price, household fit, and area context without turning find-your-room into a generic travel wishlist product.

### Active Feature Slice

**Slice Name**: Phase 6 - Final polish, responsiveness review, and verification  
**Slice Status**: Pending user approval  
**Requested On**: 2026-04-21  
**Slice Summary**: Validate the complete shortlist and comparison feature through performance review, static checks, and final EN/AR and RTL/LTR verification, while making only the smallest cross-cutting fixes needed for a stable finish.  
**Required Specialist Sequence**: `agent-performance` → `agent-tester` → `agent-reviewer` → `agent-docs`  
**Execution Default**: Sequential specialist-owned handoffs only unless the user explicitly approves a concurrency exception.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Save Listings Into Meaningful Shortlists (Priority: P1)

As a room seeker, I want to save promising rooms into named shortlists, so I can return to them later without restarting my evaluation from scratch.

**Why this priority**: The current app is better at evaluating one listing than managing a set of serious options. Saving is the minimum viable step toward multi-listing decision support.

**Independent Test**: Can be fully tested by browsing `discover`, saving multiple listings into one or more named shortlists, then reopening those shortlists and confirming the saved items persist with recognizable summary information.

**Acceptance Scenarios**:

1. **Given** a seeker is browsing listings, **When** they save a listing, **Then** they can add it to a meaningful shortlist such as `Near work`, `Best vibe`, or `Under budget`.
2. **Given** a seeker opens a shortlist later, **When** they review its contents, **Then** they can quickly recognize each saved listing by title, price, trust cues, and household context.

---

### User Story 2 - Compare Serious Options Side By Side (Priority: P2)

As a room seeker, I want to compare a few saved listings across the most important decision factors, so I can narrow down my options faster.

**Why this priority**: Comparison is the feature that turns passive saving into an actual decision workflow and directly extends the trust-rich listing work already completed.

**Independent Test**: Can be tested by saving multiple listings, opening comparison for two to four options, and confirming the app shows aligned rows for the most important decision signals.

**Acceptance Scenarios**:

1. **Given** a seeker has saved multiple listings, **When** they open comparison, **Then** they can compare price, bills context, trust framing, household vibe, and approximate area in one view.
2. **Given** some compared listings are clearly weaker, **When** the seeker reviews the comparison, **Then** they can remove or keep options without losing the rest of the shortlist.

---

### User Story 3 - Preserve Decision Context, Not Just Bookmarks (Priority: P3)

As a room seeker, I want my saved items to remember why I saved them, so the shortlist feels like a decision board rather than a pile of bookmarks.

**Why this priority**: The product value comes from helping users make decisions, not just hearting listings.

**Independent Test**: Can be tested by adding lightweight notes or context to saved listings and confirming that shortlist views retain those cues.

**Acceptance Scenarios**:

1. **Given** a seeker saves a listing, **When** they add a short note such as `best commute` or `quiet household`, **Then** that note remains attached to the saved item.
2. **Given** a seeker revisits a shortlist after time has passed, **When** they review saved listings, **Then** the shortlist still reflects their decision context instead of only listing raw cards.

### Edge Cases

- What happens when a user saves the same listing into multiple shortlists?
- How does the app behave when a saved listing later changes price, trust state, or availability?
- What happens when a user compares listings that have missing fields for one of the comparison rows?
- How should comparison scale be bounded so the UI stays useful and does not become a spreadsheet?
- What happens when Arabic copy causes comparison labels or rows to become longer than English?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow seekers to save a listing from at least the primary listing surfaces.
- **FR-002**: The system MUST allow seekers to organize saved listings into named shortlists.
- **FR-003**: The system MUST allow seekers to view the contents of a shortlist with enough summary information to re-evaluate each saved listing.
- **FR-004**: The system MUST allow seekers to compare a bounded number of saved listings in one comparison view.
- **FR-005**: The comparison view MUST prioritize the factors most relevant to find-your-room decisions, including price framing, trust framing, household context, and approximate area context.
- **FR-006**: The shortlist workflow MUST support lightweight seeker-owned context such as private notes or save reasons.
- **FR-007**: The shortlist and comparison experience MUST remain bilingual and RTL/LTR-safe.
- **FR-008**: The feature MUST preserve find-your-room's trust-first and privacy-safe product direction and MUST NOT expose exact-address or direct-contact behavior prematurely.
- **FR-009**: The feature MUST fit both mobile and web layouts without collapsing into an overly dense table-first experience.
- **FR-010**: The initial version MUST stay within current product maturity and MUST NOT require hotel-style booking, loyalty, or payments infrastructure.

### Key Entities *(include if feature involves data)*

- **Shortlist**: A seeker-owned saved set of listings grouped around a decision goal, such as commute, vibe, or budget.
- **Saved Listing Entry**: A listing saved into a shortlist, including summary data and optional seeker-added context.
- **Comparison Row**: A normalized decision factor shown across multiple saved listings, such as monthly headline, included bills, trust level, household vibe, or area fit.
- **Save Context Note**: A lightweight seeker-authored note or reason attached to a saved listing.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A seeker can save listings into named shortlists without losing the context of why those listings matter.
- **SC-002**: A seeker can compare a small set of serious options in one view without opening each detail page repeatedly.
- **SC-003**: The shortlist workflow makes the app feel more like a decision-support product and less like a one-listing-at-a-time prototype.
- **SC-004**: The experience remains visually coherent and understandable in both English and Arabic.

## Assumptions

- This feature starts as a frontend-first workflow and can use local or mock persistence initially if needed.
- The first release should optimize for two to four serious options in comparison, not unlimited comparison sets.
- Save and compare should build directly on the trust-rich listing data already added in the previous six phases.
- Collaboration features like shared shortlists or voting are out of scope for the initial version unless later approved.

## Next Step Gate

The overall feature scope is approved, but the active Phase 6 slice is pending
approval. Planning and implementation for that slice remain blocked until the
user explicitly approves it.
