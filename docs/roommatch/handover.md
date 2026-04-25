# RoomMatch Project Handoff

## Executive Summary

RoomMatch is a greenfield Expo/React Native prototype and planning workspace for
a Riyadh-first shared-room marketplace. The original proposal was broader, but
the project has intentionally narrowed to a trust-first, compatibility-first
housing product for room seekers and light host-side validation.

The current product direction is:

- Riyadh-first launch focus
- shared rooms and shared apartments first
- room seekers first, with lightweight host mode only
- trust, verification, household clarity, and compatibility as the main wedge
- monthly/shared-living decisions instead of hotels, chalets, corporate housing,
  payments, contracts, or smart-lock infrastructure in v1

The repo contains both the prototype and the working planning artifacts:

- `/Users/hanyramadan/showrooms/app`: Expo Router screens
- `/Users/hanyramadan/showrooms/src`: typed mock data, i18n, components, theme,
  and shortlist state
- `/Users/hanyramadan/showrooms/docs/roommatch`: product, research, roadmap,
  verification, risk, task, and handoff docs
- `/Users/hanyramadan/showrooms/specs`: Spec Kit feature specs, plans, tasks,
  and research artifacts

## Current App State

The app is a static/mobile prototype using localized mock data. It is not a
production marketplace yet. There is no backend, persistence layer, auth,
payments, moderation console, contract system, or real verification service.

Implemented user-facing surfaces include:

- landing/product framing
- onboarding
- discover feed
- room detail pages
- saved shortlists and comparison in the `matches` tab
- inbox preview
- move-in readiness / `My Stay`
- profile and verification checklist
- light host-mode preview through existing product framing

The strongest implemented work so far is the seeker-side listing evaluation
loop: browse listings, inspect trust and offer details, save into shortlists,
compare serious options, and move toward request/match intent.

## Tech Stack

Runtime and framework:

- Expo SDK 55
- React 19
- React Native 0.85
- Expo Router
- React Native Web for web export
- TypeScript 6 with strict mode

Key dependencies:

- `expo-router`
- `expo-linear-gradient`
- `expo-status-bar`
- `expo-constants`
- `expo-linking`
- `react-native-safe-area-context`
- `react-native-screens`
- `react-native-reanimated`
- `react-native-gesture-handler`
- `@expo/vector-icons`

Project scripts:

- `npm run dev`: start Expo
- `npm run ios`: start iOS preview
- `npm run android`: start Android preview
- `npm run web`: start web preview
- `npm run typecheck`: run `tsc --noEmit`

TypeScript configuration:

- strict mode enabled
- `@/*` path alias points to `src/*`
- generated `dist` output is excluded from typechecking

## Architecture And Data Model

The app uses Expo Router route files under `app/`.

Core routes:

- `/`: landing screen
- `/onboarding`: onboarding flow
- `/(tabs)/discover`: main listing feed
- `/(tabs)/matches`: saved shortlist and comparison workflow
- `/(tabs)/inbox`: conversation preview
- `/(tabs)/stay`: move-in readiness timeline
- `/(tabs)/profile`: profile and verification checklist
- `/room/[id]`: listing detail page

Shared source areas:

- `src/data/roommatch.ts`: typed data contract and localized mock-data adapter
- `src/i18n`: bilingual English/Arabic messages and locale helpers
- `src/components`: reusable UI primitives such as `Screen`, `Pill`,
  `AppHeader`, `SectionHeader`, `TimelineCard`, and `ListingCard`
- `src/shortlists`: local in-memory shortlist provider, comparison rules, save
  reasons, and note handling
- `src/ui/theme.ts`: palette, spacing, radii, shadows, and layout constants

Current data is mocked through JSON localization files, especially:

- `src/i18n/data/en.json`
- `src/i18n/data/ar.json`

The main listing contract now includes:

- structured trust snapshots
- trust provenance groups: RoomMatch-reviewed, host-provided, and later/gated
- pricing summary and included/excluded cost notes
- household summary, vibe, languages, and expectations
- approximate area and privacy note
- safer host disclosure fields
- media count and reviewed-label cues
- match/fit summary fields

## Product Direction

The working product thesis:

RoomMatch helps expats and young professionals in Riyadh find a room and a
compatible household faster and more safely than fragmented listing channels.

Primary users:

- room seekers who need safe, affordable shared housing quickly
- master tenants or small landlords who need qualified demand and fewer
  household conflicts

Core user story:

As a room seeker, I want to understand whether a room and a household fit my
life before I commit to a move, so I can avoid scams, mismatch, and wasted time.

Product principles:

- trust before transaction
- explain fit; do not hide it behind vague AI claims
- use approximate location before exact address
- keep tone practical and respectful, not social/dating-oriented
- remain bilingual-ready from the start

## Roadmap And Executed Phases

### Foundation: Proposal Extraction And Research

Status: done.

The team extracted and reviewed the original proposal, then validated major
market assumptions. The research concluded that the proposal was too broad for
an MVP and should not start as a flexible-living super app.

Important validated points:

- Saudi Arabia has a large expat base and relevant mobility pressure.
- Saudi rental infrastructure exists through Ejar and related digital rails.
- Riyadh rent-freeze context is real but recent and specific.
- Hospitality licensing is a separate regulatory lane.
- Specialized room-sharing competition already exists.

Resulting decision:

RoomMatch v1 should be a verified Riyadh shared-housing marketplace with
roommate-fit signals and trust workflows, not a hotel, chalet, B2B, or
smart-lock platform.

Primary references:

- `docs/roommatch/research-brief.md`
- `docs/roommatch/prd.md`
- `docs/roommatch/plan.md`
- `docs/roommatch/open-risks.md`

### Initial Prototype Build

Status: done.

The repo now contains an Expo mobile prototype for the narrowed wedge.

Implemented prototype areas:

- landing and product framing
- trust-first onboarding
- listing discovery
- listing detail
- match/request preview
- inbox preview
- stay readiness timeline
- profile/verification checklist
- bilingual copy infrastructure

Verification completed:

- `npm install`
- Expo package alignment
- `npm run typecheck`
- `npx expo export --platform web`

Remaining gaps:

- no device/simulator interaction pass
- no live backend
- no auth or persistence
- no real verification workflow

Primary references:

- `README.md`
- `docs/roommatch/tasks.md`
- `docs/roommatch/verification.md`
- `docs/roommatch/review.md`

### Workflow Governance

Status: draft spec exists; workflow rules are reflected in repo docs and
`AGENTS.md`.

The project adopted a strict Spec Kit-first process for non-trivial work.

Rules now expected in this repo:

- create or update a Spec Kit spec before meaningful work
- pause for user approval after spec changes
- require new approval for each non-trivial phase or execution slice
- use named `agent-*` specialist passes for meaningful planning
- record specialist scope in plans
- assign tasks by specialist ownership
- execute sequentially by default
- only parallelize after explicit user approval

Primary references:

- `AGENTS.md`
- `docs/spec-driven-workflow.md`
- `specs/002-workflow-governance/spec.md`

### Phase 1: Trust-Rich Listing Experience

Status: implemented, static checks passed; final manual EN/AR visual review is
the main remaining closure item.

Goal:

Make `discover` and `room/[id]` feel safer, clearer, and more credible before
contact.

Implemented improvements:

- richer listing data contract
- trust snapshots and source-aware trust grouping
- explicit separation of verified, host-provided, and gated/later information
- safer host disclosure
- approximate location framing
- clearer pricing, included/excluded cost context, and deposit notes
- household summary, residents, vibe, language, and expectations
- media count/reviewed cues
- `discover` moved to `FlatList` for more stable feed rendering
- room detail rebuilt around a decision header and evidence flow

Verification recorded:

- `npm run typecheck` passed
- `npx expo export --platform web` passed

Known status inconsistency:

- `docs/roommatch/frontend-roadmap.md` says Phase 1 manual EN/AR visual review
  is pending.
- `specs/001-trust-rich-listing/tasks.md` marks the final manual review task as
  checked.
- Treat this as unresolved until someone performs and records a clear visual
  pass on the current app in English and Arabic.

Primary references:

- `specs/001-trust-rich-listing/spec.md`
- `specs/001-trust-rich-listing/plan.md`
- `specs/001-trust-rich-listing/tasks.md`
- `docs/roommatch/frontend-roadmap.md`

### International Feature Research

Status: approved and research-complete.

The team researched transferable patterns from Airbnb, Booking.com, and Agoda,
using official/current source material. The research was not intended as generic
competitor copying; it translated mature marketplace patterns into RoomMatch-fit
feature opportunities.

Key conclusions:

- strong marketplaces reduce decision effort
- trust signals work best when structured and evidence-backed
- public browsing info should be separated from post-commit reveal
- users need save, compare, and return workflows

Recommended opportunity ranking:

1. saved shortlists and side-by-side comparison
2. trusted listing labels and evidence ranking
3. decision-support reviews and resident quotes
4. better filters for real shared-living needs
5. move-in and request-term clarity

Primary references:

- `specs/003-international-feature-research/spec.md`
- `specs/003-international-feature-research/research.md`

### Saved Shortlists And Comparison

Status: approved feature scope; implementation appears present in the app; final
slice status needs reconciliation.

Spec goal:

Let seekers save promising rooms into meaningful shortlists, compare serious
options side by side, and preserve decision context through private notes and
save reasons.

Implemented app behavior visible in current code:

- shortlist provider in `src/shortlists`
- local in-memory saved listing state
- compare limit of 4 listings
- private note clamping to 80 characters
- save reasons such as commute, budget, vibe, trust, and move-in
- `matches` tab displays shortlists, saved entries, comparison panels, note
  editing, save reason chips, and removal actions
- listing detail includes save buttons for available shortlists

Important limitation:

- persistence is in-memory only. Saved changes reset with app state.
- there is no backend account, user ownership, sync, or durable storage.

Known status inconsistency:

- `specs/004-shortlists-and-comparison/spec.md` says the active final polish and
  verification slice is pending approval.
- Current code already contains shortlist/comparison implementation.
- A future tool should reconcile the spec, plan, tasks, and roadmap before
  treating this feature as fully closed.

Primary references:

- `specs/004-shortlists-and-comparison/spec.md`
- `specs/004-shortlists-and-comparison/plan.md`
- `specs/004-shortlists-and-comparison/tasks.md`
- `src/shortlists/index.tsx`
- `src/shortlists/rules.ts`
- `app/(tabs)/matches.tsx`
- `app/room/[id].tsx`

### Compatibility-First Matching UX

Status: draft spec; not approved.

Goal:

Make RoomMatch feel clearly compatibility-first by showing why a listing fits,
where caution exists, and what remains unclear without drifting into a social or
dating tone.

Proposed scope:

- visible fit states such as good fit, caution, or unclear
- explanation of fit reasons
- caution/tradeoff indicators
- unknown or not-yet-confirmed factors
- compatibility context preserved across discover, room detail, matches, and
  shortlist surfaces
- no live recommendation engine required for the first slice

Next required action:

The user must approve, adjust, or reject this spec before planning, task
generation, or implementation begins.

Primary reference:

- `specs/005-compatibility-first-matching/spec.md`

## Current Roadmap

From `docs/roommatch/frontend-roadmap.md`:

1. Trust-Rich Listing Experience: implemented, but manual visual closure should
   be reconciled
2. Compatibility-First Matching UX: proposed / draft spec pending approval
3. Better Request And Contact Flow: proposed
4. Saved Search, Alerts, And Decision Support: proposed, with shortlist work
   already partly or mostly implemented under spec 004
5. Move-In Readiness And Post-Match UX: proposed
6. Host Preview And Supply-Side Polish: deferred

Recommended next roadmap cleanup:

- update the roadmap to reflect actual shortlist/comparison implementation
- reconcile Phase 1 verification status
- decide whether Compatibility-First Matching UX remains the next approved
  phase or whether shortlist/comparison needs closure first

## Important Product Non-Goals

The project has repeatedly deferred:

- hotels
- chalets
- serviced apartments
- GCC-wide launch
- corporate housing dashboards
- smart-lock deployment
- full payment orchestration
- legal-grade automated contract workflows
- deep compliance automation
- sponsored ranking or paid placement mechanics
- loyalty programs and travel-app style rewards

These should not be added without a new approved spec and explicit strategy
decision.

## Trust, Privacy, And Safety Constraints

Current product trust rules:

- do not claim real-world verification unless the app actually has it
- distinguish RoomMatch-reviewed, host-provided, and gated/later information
- expose area/neighborhood-level location only
- keep exact address, direct contact, and host personal identity gated
- preserve seeker notes as private
- avoid deterministic compatibility claims
- avoid social/dating language

Current privacy rules encoded in `src/shortlists/rules.ts`:

- exact address locked
- direct contact locked
- host personal identity locked
- seeker notes private

## Open Risks And Gaps

Product:

- early supply quality is the biggest risk
- matching quality will not matter if inventory is weak
- the experience must avoid feeling like social discovery

Business:

- a polished app cannot compensate for weak verified supply
- unit economics need more bottom-up validation
- corporate housing and smart locks are likely premature

Regulatory and operations:

- shared housing, deposits, digital agreements, and stay rules need operational
  validation
- hospitality inventory is a separate licensing surface
- identity, listing legitimacy, moderation, and disputes need concrete workflows
  before launch

Technical:

- no backend
- no auth
- no durable storage
- no production localization pipeline
- no real moderation or verification system
- no payment or contract infrastructure
- no device/simulator QA pass recorded

## Verification History

Completed checks recorded in docs:

- proposal OCR extraction
- external source validation for major market claims
- current Expo ecosystem version check
- `npm install`
- Expo SDK-compatible package alignment
- `npm run typecheck`
- `npx expo export --platform web`

Outstanding checks:

- manual English/Arabic visual QA
- RTL/LTR rendered review on key screens
- iOS simulator or device pass
- Android emulator or device pass
- interaction pass for shortlist save/compare/note editing
- reconciliation of spec/task/roadmap statuses

## Recommended Next Steps For Another Tool

1. Reconcile project status artifacts.
   Start with `docs/roommatch/frontend-roadmap.md`,
   `docs/roommatch/tasks.md`, `specs/001-trust-rich-listing/tasks.md`, and
   `specs/004-shortlists-and-comparison/*`.

2. Run the missing manual visual and interaction review.
   Check `discover`, `room/[id]`, and `matches` in English and Arabic, including
   RTL/LTR alignment and longer Arabic copy.

3. Decide the next approved product slice.
   The cleanest next path is either:
   - close shortlist/comparison properly, then proceed to compatibility, or
   - approve `specs/005-compatibility-first-matching/spec.md` and plan it as the
     next phase.

4. Preserve the Spec Kit gate.
   Do not implement meaningful new features until the relevant spec is approved.

5. Keep backend expansion narrow when it begins.
   The first backend pass should likely cover account/session basics, listing
   persistence, saved shortlists, request state, verification provenance, and
   moderation flags. Payments, contracts, hospitality inventory, and smart locks
   should remain out of scope unless explicitly approved.

## Handoff Assumptions

- This handoff was prepared from local repo files, not from live production
  telemetry.
- The codebase is not currently inside a Git repository in this workspace, so
  branch and commit history were not available for verification.
- Status claims are grounded in the docs and current source files, but the next
  tool should treat any mismatch between specs, roadmap, and implementation as a
  cleanup task before adding new scope.

