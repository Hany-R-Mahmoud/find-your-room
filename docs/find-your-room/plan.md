# Mock Data & Journey Expansion Plan

## Current State Assessment

Analyzed: `src/i18n/data/en.json`, `src/data/find-your-room.ts`, and related docs.

**Existing Coverage:**
- 3 sample listings (Olaya, Qurtubah, Hittin)
- Trust sections: verified / host-provided / gated
- 4 discover filters
- Basic stay milestones (4 stages)
- 3 match request states
- Shortlists with save reasons

---

## Identified Gaps

### 1. Roommate-Fit Flow Missing

**Current:** The PRD mentions `Find a roommate` as a user choice (line 26), but mock data contains zero roommate-specific listings or matching logic.

**Proposed additions:**
- Roommate-wanted listings with profiles (not physical rooms)
- Compatibility dimensions: sleep schedule, cleanliness, guests, shared spaces
- Co-living match vs. room match distinction

### 2. User Journey Gaps

| Journey | Current Coverage | Missing |
|---------|--------------|---------|
| Room seeker | Onboarding → discover → detail | After viewing feedback, rejection state, host rating |
| Host mode | Lightweight preview | Host dashboard, request management, listing edit |
| Returning user | None | Re-engagement flow, saved search alerts |
| Seeker → roommate pivot | None | Switching between modes |

### 3. Listing Edge Cases

| Scenario | Current | Needed |
|----------|---------|--------|
| Available now | 1 of 3 | More immediate options |
| No current residents | 0 | "New household forming" state |
| Shortstay (weekly) | Not represented | Weekly rate display |
| Unfurnished room | Not represented | Amenity flags |
| Room in transition | Not represented | Vacancy date clarity |

### 4. Trust Signal Expansion

**Current trust sources:** find-your-room, host, later

**Proposed additions:**
- Past household member signals (anonymized, e.g., "2 past tenants stayed 6+ months")
- Neighborhood quality indicators
- Building/compound amenities
- Ejar contract verification status
- Response time buckets (< 2h, same day, 24h+)

### 5. Stay Journey Completeness

- Move-in readiness → agreement review → post-move follow-up
- Early departure / transfer scenarios
- Roommate conflict resolution hints

---

## Priority Recommendations

### P0 — Must Have for Feasibility

1. **Roommate-wanted mock data** — At least 2 profiles seeking roommates (one individual, one managed household)
2. **"Available now" listing** — Make at least one listing immediately available
3. **Viewing completion state** — Add milestone for "viewing completed, decision pending"

### P1 — Improves Realism

4. **Reject / decline flow** — Mock state for declined requests
5. **Returning user shortlists** — Show saved lists with older dates
6. **Host mode mock data** — Host inbox, listing stats, response prompts
7. **Shortstay pricing** — Weekly rate variant display

### P2 — Future Differentiation

8. **Past review anonymized** — Tenant feedback signals
9. **Neighborhood signals** — Proximity to metro, safety perception
10. **Stay extension flow** — Renewal / stay-length change mock

---

## Deliverable Scoping

**Safe for frontend-only:** All mocks can be added to `src/i18n/data/en.json` and `src/i18n/data/ar.json` without backend changes.

**Types affected:** `Listing`, `MatchRequest`, `StayMilestone`, `VerificationItem`, `DiscoverFilter` — all in `src/data/find-your-room.ts`.

---

## Acceptance Criteria for Implementation

- [ ] At least 2 roommate-wanted entries in listings
- [ ] At least 1 "available now" listing
- [ ] Full viewing milestone sequence (pending → completed → decision)
- [ ] Host mode mock visible in prototype
- [ ] Returning user sees saved shortlists with dates older than "today"
- [ ] At least 1 shortstay (weekly) pricing shown