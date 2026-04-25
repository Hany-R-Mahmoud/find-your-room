# Frontend Roadmap

## Purpose

This roadmap tracks the frontend-only evolution of RoomMatch based on the
current Riyadh-first, trust-first product direction and the competitor research
review.

Update this file whenever a phase is selected, started, paused, revised,
finished, split, merged, or expanded.

## Status Legend

- `Proposed`: defined but not selected yet
- `Selected`: chosen as the next approved direction
- `In Progress`: currently being designed or implemented
- `Blocked`: waiting on user decision or dependency
- `Done`: completed and verified
- `Deferred`: intentionally postponed

## Current Phase Status

| Phase | Name | Status | Notes |
| --- | --- | --- | --- |
| 1 | Trust-Rich Listing Experience | In Progress | User approved this phase on 2026-04-21, multi-agent planning completed, implementation not started yet |
| 2 | Compatibility-First Matching UX | Proposed | Recommended follow-up after Phase 1 |
| 3 | Better Request And Contact Flow | Proposed | Improves quality of first contact after trust and fit work |
| 4 | Saved Search, Alerts, And Decision Support | Proposed | Search management and shortlist flows |
| 5 | Move-In Readiness And Post-Match UX | Proposed | Extends `My Stay` into stronger post-match support |
| 6 | Host Preview And Supply-Side Polish | Deferred | Useful later, but not the next best seeker-side investment |

## Phase 1: Trust-Rich Listing Experience

**Goal**

Make `discover` and `room detail` feel safer, clearer, and more credible before
contact.

**Why Now**

Research showed that local Saudi alternatives mostly behave like listing boards,
while stronger adjacent products win by making listings feel safer and easier to
trust. This is RoomMatch's clearest frontend differentiator without backend
expansion.

**Frontend Focus**

- stronger listing trust signals
- clearer pricing and what-is-included breakdown
- better host credibility and responsiveness surfaces
- household summary that reduces ambiguity
- image hierarchy and gallery improvements
- explicit distinction between verified and self-reported information
- approximate-location framing instead of exact-address exposure

**Reference Patterns Worth Borrowing**

- Moovo: verified, expat-friendly listing credibility
- iROOMit: trust stack and richer listing confidence cues
- Aqar: familiar Saudi trust framing and structured search expectations

**Avoid**

- turning the app into a generic property marketplace
- claiming deep verification where we only have placeholder data
- overloading detail screens with enterprise or compliance workflows

**Execution Mode**

- use specialist agent passes for design, UI polish, security, performance,
  review, and testing before and during implementation

**Current Checkpoint**

- spec approved
- multi-agent planning pass completed
- implementation plan created at `specs/001-trust-rich-listing/plan.md`
- core implementation completed
- `npm run typecheck` passed
- `npx expo export --platform web` passed
- manual EN/AR visual review is still pending before Phase 1 can be marked done

## Phase 2: Compatibility-First Matching UX

**Goal**

Make RoomMatch feel meaningfully different from room boards by showing fit
logic clearly.

**Frontend Focus**

- stronger fit explanation modules
- compatibility chips and comparison cues
- deal-breaker indicators
- clearer `good fit / caution / unclear` states

**Reference Patterns Worth Borrowing**

- Diggz: lifestyle-based compatibility framing
- roommate-focused apps with mutual-fit explanation patterns

## Phase 3: Better Request And Contact Flow

**Goal**

Improve the quality and clarity of first contact from browse to request.

**Frontend Focus**

- structured request composer
- explicit contact intent states
- request preview
- richer inbox thread states
- response expectation cues

## Phase 4: Saved Search, Alerts, And Decision Support

**Goal**

Help users manage an active search instead of just browsing one session at a
time.

**Frontend Focus**

- saved rooms
- saved filters
- shortlist and compare flows
- alert states and notifications UI

## Phase 5: Move-In Readiness And Post-Match UX

**Goal**

Make `My Stay` feel useful after a user expresses interest or gets a match.

**Frontend Focus**

- pre-move checklist UI
- visit / confirmation states
- readiness timeline improvements
- household expectations summary

## Phase 6: Host Preview And Supply-Side Polish

**Goal**

Polish host-facing presentation only after seeker-side differentiation is
strong.

**Frontend Focus**

- host profile completeness
- listing preview polish
- trust checklist UI

## Update Rules

Whenever work status changes:

1. Update the phase status table.
2. Add a short note to the affected phase if scope changed.
3. Reflect the same change in the relevant spec or task tracker.
