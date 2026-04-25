# Research: Workflow Governance Tightening

## Decision 1: Gate Each Non-Trivial Phase With A Fresh Spec Checkpoint

- **Decision**: Require a new or updated spec for each non-trivial phase or execution slice.
- **Rationale**: Feature-level approval alone does not prevent later phases from drifting beyond what the user expects.
- **Alternatives considered**:
  - Keep one spec per feature only: rejected because it allows later phases to proceed without renewed approval.

## Decision 2: Record Specialist Planning Passes Explicitly

- **Decision**: Plans must name the specialist roles used, their scope, and any skip reason.
- **Rationale**: "Multi-agent synthesis" without named passes is not auditable.
- **Alternatives considered**:
  - Keep a generic multi-agent statement: rejected because it does not prove which specialists contributed.

## Decision 3: Make Sequential Execution The Default

- **Decision**: Sequential, back-to-back execution is the default for non-trivial work.
- **Rationale**: The user explicitly prefers reduced conflicts over speculative speedups from parallel work.
- **Alternatives considered**:
  - Parallel by default where files differ: rejected because governance drift and coordination conflicts still increase.

## Decision 4: Parallel Work Requires Explicit User Exception

- **Decision**: Parallel execution is allowed only when the user explicitly approves that exception.
- **Rationale**: This preserves flexibility without making concurrency the hidden default.
- **Alternatives considered**:
  - Keep "parallel where independent" as the template default: rejected because it contradicts the requested workflow preference.
