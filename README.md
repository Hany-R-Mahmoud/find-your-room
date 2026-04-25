# RoomMatch

RoomMatch is a greenfield mobile prototype and planning workspace derived from the `roommatch.pdf` proposal.

The current build narrows the concept to a Riyadh-first shared-room marketplace focused on:

- verified shared-room listings
- roommate and household compatibility
- trust signals before contact
- request, chat, and move-in readiness flows

The repo contains two parallel outputs:

- `docs/roommatch/*`: research, planning, risks, and task artifacts
- Expo mobile prototype: a demand-side v1 experience with a light `Host mode`

## Why The Scope Changed

The original deck combines several businesses at once: roommate matching, flexible rentals, hospitality inventory, corporate housing, payments, contracts, ads, subscriptions, and smart-lock infrastructure.

The working recommendation in this repo is narrower:

- start with shared rooms and shared apartments in Riyadh
- make trust and matching the wedge
- keep supply onboarding and compliance partially operational at first
- defer hotels, chalets, enterprise tooling, smart locks, and deeper payment workflows until liquidity is proven

## Run

```bash
npm install
npx expo install expo-linear-gradient expo-status-bar expo-constants expo-linking react-native-safe-area-context react-native-screens react-native-reanimated react-native-gesture-handler @expo/metro-runtime
npm run dev
```

Then open the project in Expo Go, an iOS simulator, Android emulator, or the web preview.

## Project Map

- `app/index.tsx`: landing and product framing
- `app/onboarding.tsx`: v1 onboarding and trust framing
- `app/(tabs)/*`: discover, matches, inbox, stay, and profile flows
- `app/room/[id].tsx`: listing detail prototype
- `src/data/roommatch.ts`: typed mock domain data
- `src/components/*`: reusable UI primitives
- `docs/roommatch/*`: artifact set from the team workflow
- `docs/roommatch/frontend-roadmap.md`: phase-based frontend roadmap and status tracker

## Spec-First Workflow

This repo now uses GitHub Spec Kit for task intake and change planning.

- Create or update a spec first with `$speckit-specify`
- Pause for user approval or requested edits
- Only after approval continue with `$speckit-plan`, `$speckit-tasks`, and implementation

See [docs/spec-driven-workflow.md](/Users/hanyramadan/showrooms/docs/spec-driven-workflow.md) and [AGENTS.md](/Users/hanyramadan/showrooms/AGENTS.md).
