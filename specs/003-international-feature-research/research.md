# Research Brief: International Marketplace Feature Inspiration For RoomMatch

**Date**: 2026-04-21  
**Feature**: [003-international-feature-research](/Users/hanyramadan/showrooms/specs/003-international-feature-research/spec.md)

## Goal

Identify feature patterns from Airbnb, Booking.com, and Agoda that can enrich
RoomMatch's website/mobile app in ways that fit a trust-first, compatibility-
first, shared-room marketplace.

## Method

- Sources were limited to current official pages and official product/help
  content from Airbnb, Booking.com, and Agoda.
- The focus was not "what features exist?" in the abstract. The focus was
  "which patterns meaningfully improve seeker decision quality and can be
  adapted to RoomMatch now or soon?"
- Findings are labeled as:
  - `Transferable now`
  - `Transferable later`
  - `Not recommended now`

## Source Notes

Primary sources used:

- Airbnb Guest Favorites and highlights:
  [airbnb.com/help/article/3495](https://www.airbnb.com/help/article/3495)
- Airbnb wishlists:
  [airbnb.com/help/article/1236](https://www.airbnb.com/help/article/1236)
- Airbnb review tags:
  [airbnb.com/help/article/2658](https://www.airbnb.com/help/article/2658)
- Airbnb accessibility filters:
  [airbnb.com/accessibility](https://www.airbnb.com/accessibility)
- Airbnb flexible cancellation filters:
  [airbnb.com/help/article/3043](https://www.airbnb.com/help/article/3043)
- Booking.com property pages and review flows showing terms clarity, verified
  review framing, and gated detail reveal:
  [booking.com/hotel/fr/l-39-acacia-forbach.html](https://www.booking.com/hotel/fr/l-39-acacia-forbach.html),
  [booking.com/hotel/is/ha3tel-framtaadeg.html](https://www.booking.com/hotel/is/ha3tel-framtaadeg.html),
  [booking.com/reviews/ca/hotel/wolfe-island.html](https://www.booking.com/reviews/ca/hotel/wolfe-island.html),
  [booking.com/community.html](https://www.booking.com/community.html)
- Agoda verified review guidance:
  [agoda.com/th-th/info/who-writes-our-agoda-reviews.html](https://www.agoda.com/th-th/info/who-writes-our-agoda-reviews.html)
- Agoda review guidance:
  [agoda.com/rewards/HotelReviewGuidelines.html](https://www.agoda.com/rewards/HotelReviewGuidelines.html)
- Agoda partner guidance indicating decision drivers and ranking cues:
  [partnerhub.agoda.com/how-to-get-more-guest-reviews](https://partnerhub.agoda.com/how-to-get-more-guest-reviews/),
  [partnerhub.agoda.com/what-is-sponsored-listing](https://www.partnerhub.agoda.com/what-is-sponsored-listing/)

## Cross-App Findings

### 1. Great marketplaces reduce decision effort, not just increase listing volume

Across all three products, the strongest patterns are about reducing
uncertainty:

- Airbnb uses Guest Favorites, review tags, and filters to narrow trust and fit
- Booking.com makes price terms, cancellation, and payment timing very explicit
- Agoda leans hard on verified reviews and best-price confidence

**Implication for RoomMatch**: the best next features are not "more content"
features. They are decision-support features that help a seeker say yes or no
faster.

### 2. Trust signals work best when they are structured and evidence-backed

Airbnb's Guest Favorites are based on ratings, reviews, and reliability rather
than generic badges. Agoda explicitly says its reviews come from customers who
completed a stay. Booking.com repeatedly emphasizes "Real guests. Real stays.
Real opinions."

**Implication for RoomMatch**: new trust features should come from clearer
evidence models, not more decorative labels.

### 3. Mature apps separate public browsing information from post-commit reveal

Booking.com property pages repeatedly show that exact address and contact
details appear after booking/confirmation, not during early browse. This is
very aligned with RoomMatch's privacy-safe direction.

**Implication for RoomMatch**: the product can add richer location and host
context without abandoning gated disclosure. The right pattern is staged
reveal, not full public transparency.

### 4. Strong products let users save, compare, and return to decisions

Airbnb's wishlists are not just bookmarks. They preserve dates, support
collaboration, and allow notes and voting.

**Implication for RoomMatch**: RoomMatch currently helps users evaluate a single
listing better, but it still under-serves multi-listing comparison and return
visits.

## App-Specific Takeaways

## Airbnb

What stands out:

- `Guest Favorites` turns trust into a visible, ranked quality layer rather
  than a vague promise.
- `Review tags` pull recurring themes like location or clarity to the top and
  filter supporting reviews by topic.
- `Wishlists` support notes, collaboration, and retained search context.
- `Accessibility filters` show how deep filtering can stay usable when grouped
  by real user needs.

Best RoomMatch inspiration:

- ranked trusted-listing label
- topic-based review or quote highlights
- saved/comparison boards
- grouped filters around actual living needs, not just generic amenities

## Booking.com

What stands out:

- Property pages are highly explicit about included vs excluded costs, payment
  timing, cancellation, breakfast/perks, and room-level differences.
- The site repeatedly uses verified review framing and sub-scores.
- Exact address and contact details are gated until booking/account access.
- Availability options are shown as concrete choices, not vague descriptions.

Best RoomMatch inspiration:

- much stronger move-in and cost breakdown clarity
- explicit "what unlocks later" disclosure
- structured option-level differences when the same room has multiple terms or
  move-in paths
- verified lived-experience reviews when RoomMatch has the data to support them

## Agoda

What stands out:

- Agoda strongly emphasizes that reviews are from actual stayed guests.
- Agoda partner materials highlight that users care about pricing, included
  perks, perceived quality, verified reviews, and cancellation policies.
- Agoda also uses ranking/placement mechanics heavily, but many of those are
  marketing- and supply-scale-dependent.

Best RoomMatch inspiration:

- stronger verified social proof
- better confidence messaging around what has been checked versus what is still
  host-supplied
- clearer "best available offer" and perk framing without deceptive urgency

## Transferability Table

| Pattern | Evidence Source | RoomMatch Fit | Recommendation |
|---|---|---|---|
| Trusted quality labels based on reliability and reviews | Airbnb Guest Favorites | Strong | Transferable now |
| Topic-based review tags and quick evidence scanning | Airbnb review tags | Strong | Transferable now |
| Collaborative/savable shortlists with notes | Airbnb wishlists | Strong | Transferable now |
| Grouped must-have filters tied to real needs | Airbnb accessibility filters | Strong | Transferable now |
| Clear included/excluded cost and commitment terms | Booking.com property pages | Strong | Transferable now |
| Gated reveal of exact address/contact details | Booking.com property pages | Strong | Transferable now |
| Verified guest-review framing | Booking.com + Agoda review systems | Medium-strong | Transferable later |
| Loyalty tiers like Genius | Booking.com | Weak for current stage | Not recommended now |
| Price-match promises | Booking.com + Agoda marketing | Weak for current stage | Not recommended now |
| Sponsored ranking / paid placement mechanics | Agoda partner tools | Conflicts with trust-first product | Not recommended now |
| Hotel-style instant booking/payment flows | Booking.com / Agoda core flows | Too operations-heavy right now | Transferable later only if strategy changes |

## Recommended Feature Opportunities For RoomMatch

## 1. Saved Shortlists And Side-By-Side Comparison

**Why it matters**: The app is better at evaluating one listing than helping a
user compare three to five serious options across price, trust, household vibe,
and location.

**Inspired by**: Airbnb wishlists, but adapted away from travel planning into
shared-living decision support.

**RoomMatch version**:

- Save listings into shortlists like `Near work`, `Best vibe`, or `Under budget`
- Keep move-in month and search context attached to the saved set
- Add quick comparison rows for:
  - monthly headline
  - bills included
  - trust level
  - household vibe
  - commute area
- Optional private notes for why a seeker saved a listing

**Why this is a strong next spec candidate**: high value, high relevance,
frontend-heavy, and does not require enterprise operations.

## 2. Trusted Listing Labels And Evidence Ranking

**Why it matters**: RoomMatch already improved trust display, but it still
lacks a stronger top-level label that says "this listing is unusually reliable"
without overstating verification.

**Inspired by**: Airbnb Guest Favorites, verified-review framing on Booking.com
and Agoda.

**RoomMatch version**:

- Add a top-tier trust label such as `Most trusted this week` or
  `Strong response and review history`
- Base it on transparent criteria such as:
  - profile completeness
  - recent activity
  - response consistency
  - verified media or verified facts
  - completed-roommate feedback later on
- Show why the label was earned

**Why this is a strong next spec candidate**: it deepens the existing trust
direction instead of starting a new product lane.

## 3. Decision-Support Reviews And Resident Quotes

**Why it matters**: Major marketplaces make reviews scannable. RoomMatch will
eventually need lived-experience proof that helps seekers answer:
"What is this home actually like to live in?"

**Inspired by**: Airbnb review tags and Booking.com/Agoda verified reviews.

**RoomMatch version**:

- Introduce structured quote snippets like:
  - `Quiet on weekdays`
  - `Bills were predictable`
  - `Easy move-in`
  - `Host was responsive`
- Group by topics instead of dumping long testimonials
- Clearly distinguish:
  - RoomMatch-verified former-resident feedback
  - unverified host claims

**Why this is not the first next spec**: valuable, but it likely needs more
data and verification design than the shortlist/comparison path.

## 4. Better Filters For Real Shared-Living Needs

**Why it matters**: Mature apps let users filter for real constraints. RoomMatch
should move beyond broad browsing filters into living-need filters.

**Inspired by**: Airbnb's grouped accessibility filter system.

**RoomMatch version**:

- Must-have filters for:
  - women-only / men-only / mixed
  - move-in month
  - bills included
  - private bathroom
  - quiet / social / study-friendly
  - language comfort
  - parking / transit access
  - no smoking / guest policy / sleep schedule fit

**Why this is a strong next spec candidate**: clear seeker value and strong fit
with compatibility-first positioning.

## 5. Staged Unlocks For Contact, Address, And Questions

**Why it matters**: Booking.com reinforces that some sensitive details appear
later. RoomMatch can use that pattern to make trust and privacy feel more
intentional.

**Inspired by**: Booking.com's gated reveal after booking.

**RoomMatch version**:

- Public view:
  district, landmark context, commute summary, trust evidence
- After request or mutual interest:
  more exact pickup/building context, host contact path, next-step questions
- Show a clear `unlocks after mutual interest` explainer instead of hiding it
  silently

**Why this is a strong next spec candidate**: it sharpens the current privacy
model and can enrich the app without exposing too much too early.

## Ranked Recommendation For What To Spec Next

### Priority 1

**Saved shortlists and side-by-side comparison**

Why:

- highest user decision value
- strongly inspired by proven marketplace behavior
- low risk of conflicting with RoomMatch's trust-first positioning
- can enrich both mobile and web quickly

### Priority 2

**Better filters for real shared-living needs**

Why:

- improves discovery quality before any new backend-heavy feature
- highly aligned with compatibility-first behavior
- likely useful across every acquisition channel

### Priority 3

**Staged unlocks for contact, address, and structured questions**

Why:

- extends the privacy-safe trust model in a productively richer way
- can clarify what users get now vs later
- likely improves confidence without requiring full booking flows

### Priority 4

**Trusted listing labels and evidence ranking**

Why:

- strategically strong
- but should be designed carefully to avoid fake authority or misleading
  scoring

### Priority 5

**Decision-support reviews and resident quotes**

Why:

- strategically valuable
- but probably depends on later data collection and verification flows

## Explicit Non-Bets For Now

- hotel-style loyalty tiers
- price-match guarantees
- package bundles, flights, or trip add-ons
- paid ranking or sponsored placement mechanics
- instant-book style flows that imply operational depth RoomMatch does not yet
  have
- deceptive urgency patterns like fake scarcity

## Product Judgment

The most useful lesson from Airbnb, Booking.com, and Agoda is not "add more
travel features." It is:

**Help people narrow, compare, trust, and commit with less uncertainty.**

For RoomMatch, that means the next round should probably shift from pure
listing-page enrichment into:

1. shortlist/comparison workflows
2. deeper fit filters
3. staged unlock and request-path clarity

## Uncertainty And Open Questions

- Booking.com and Agoda sources are strongest for pricing/terms and verified
  review framing, but weaker as direct models for relationship-led shared-room
  matching.
- Some later-stage opportunities, especially verified resident reviews, likely
  depend on systems RoomMatch does not yet have.
- The current recommendation assumes the product still wants to stay trust-
  first and privacy-safe rather than move toward open-contact marketplace
  behavior.

## Suggested Next Step

Start the next Spec Kit cycle for:

**Saved shortlists and comparison for RoomMatch seekers**

This is the clearest feature area that:

- is strongly supported by the research
- enriches both web and mobile experience
- builds on the six listing-improvement phases instead of duplicating them
- opens the door to later trust, review, and request-flow enhancements
