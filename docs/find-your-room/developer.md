# Developer Documentation

## Project Overview

`find-your-room` is an Expo mobile prototype for a Riyadh-first shared-room marketplace. It targets expats and young professionals seeking safe, verified room listings with roommate compatibility.

## Tech Stack

- **Framework**: Expo SDK 52+ with React Native
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based)
- **Styling**: StyleSheet with custom theme system
- **State**: React hooks (useState, useEffect, useContext)
- **i18n**: react-native-localize with custom JSON translation files

## Project Structure

```
find-your-room/
├── app/                    # Expo Router screens
│   ├── index.tsx           # Landing page
│   ├── onboarding.tsx      # User onboarding flow
│   ├── room/[id].tsx      # Dynamic room detail page
│   └── (tabs)/
│       ├── _layout.tsx    # Tab navigation
│       ├── discover.tsx   # Room discovery feed
│       ├── matches.tsx    # User matches
│       ├── inbox.tsx      # Messages
│       ├── stay.tsx       # "My Stay" tracking
│       └── profile.tsx    # User profile
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ListingCard.tsx
│   │   ├── AppHeader.tsx
│   │   ├── Pill.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── Screen.tsx
│   │   └── TimelineCard.tsx
│   ├── data/
│   │   └── find-your-room.ts    # Mock domain data and types
│   ├── i18n/              # Internationalization
│   │   ├── index.tsx      # i18n configuration
│   │   ├── common/        # Shared translations
│   │   ├── data/          # Data-specific strings
│   │   ├── discover/      # Discover screen
│   │   ├── inbox/         # Inbox screen
│   │   ├── landing/       # Landing page
│   │   ├── matching/      # Matching features
│   │   ├── onboarding/    # Onboarding flow
│   │   ├── profile/       # Profile screen
│   │   ├── room/          # Room detail
│   │   ├── shortlists/    # Shortlist feature
│   │   └── stay/          # My Stay feature
│   ├── shortlists/        # Shortlist feature
│   │   ├── index.tsx
│   │   └── rules.ts
│   └── ui/
│       └── theme.ts       # Design tokens
├── docs/find-your-room/   # Project artifacts
└── specs/                 # Spec Kit specifications
```

## Key Commands

```bash
# Install dependencies
npm install

# Install Expo dependencies
npx expo install expo-linear-gradient expo-status-bar expo-linking react-native-safe-area-context react-native-screens react-native-reanimated react-native-gesture-handler @expo/metro-runtime

# Run development server
npm run dev

# Run TypeScript check
npm run typecheck

# Export for web
npx expo export --platform web

# Lint
npx eslint .
```

## Data Model

### Core Types (from `src/data/find-your-room.ts`)

```typescript
interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    neighborhood: string;
    approximate?: boolean;
  };
  images: string[];
  amenities: string[];
  household: Household;
  host: Host;
  verification: Verification;
  pricing: Pricing;
}

interface Household {
  totalRooms: number;
  currentOccupants: number;
  residents: Resident[];
  rules: string[];
}

interface Host {
  id: string;
  name: string;
  avatar?: string;
  responseRate: string;
  responseTime: string;
  isVerified: boolean;
}

interface Verification {
  identity: boolean;
  phone: boolean;
  email: boolean;
  moveInReady: boolean;
}

interface Pricing {
  monthly: number;
  deposits: number;
  included: string[];
}
```

## UI Components

| Component | Purpose |
|-----------|---------|
| `ListingCard` | Room preview in discover feed |
| `AppHeader` | Screen header with navigation |
| `Pill` | Status/badges (verified, new, etc.) |
| `SectionHeader` | Content grouping |
| `Screen` | Base screen wrapper |
| `TimelineCard` | Stay milestone tracking |

## i18n Pattern

Translation files follow locale-specific JSON:

```
src/i18n/[feature]/[locale].json
```

Supported locales: `en` (English), `ar` (Arabic/RTL)

Usage:
```typescript
import { useTranslation } from '@/i18n';

const { t } = useTranslation('room');
```

## Testing

- Run tests: `npm test`
- Run with coverage: `npm run test -- --coverage`
- Watch mode: `npm run test -- --watch`

## Spec-First Workflow

This project uses GitHub Spec Kit:

1. `$speckit-specify` - Create feature spec
2. Wait for approval
3. `$speckit-plan` - Create implementation plan
4. `$speckit-tasks` - Generate tasks
5. Implementation with specialist agents

See: [docs/spec-driven-workflow.md](./spec-driven-workflow.md)

## Known Limitations

- Mock data only (no backend API)
- Limited RTL polish pending
- Host mode is preview-only
- No real authentication or verification
- No push notifications

## Related Docs

- [PRD](./prd.md) - Product requirements
- [Frontend Roadmap](./frontend-roadmap.md) - Feature phases
- [Verification Notes](./verification.md) - Testing notes
- [Open Risks](./open-risks.md) - Current risks