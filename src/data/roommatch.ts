import { type Locale, useTranslations } from "@/i18n";

export type MatchBand = "strong" | "promising";
export type TrustSourceKey = "roommatch" | "host" | "later";
export type HostDisclosureLevel = "roleOnly" | "managedContact";
export type LocationPrecisionKey = "area";
export type ShortlistSaveReasonKey = "commute" | "budget" | "vibe" | "trust" | "moveIn";

export type MatchSummary = {
  band: MatchBand;
  scoreLabel: string;
  rationale: string;
  confidenceNote: string;
};

export type TrustSnapshotItem = {
  id: string;
  label: string;
  sourceKey: TrustSourceKey;
};

export type PricingSummary = {
  headline: string;
  includedSummary: string;
  excludedSummary: string;
  disclosureNote: string;
};

export type LocationSummary = {
  precisionKey: LocationPrecisionKey;
  label: string;
  privacyNote: string;
};

export type MediaSummary = {
  count: number;
  reviewedLabel: string;
};

export type Listing = {
  id: string;
  title: string;
  district: string;
  publicLocation: string;
  locationSummary: LocationSummary;
  priceSar: number;
  matchScore: number;
  match: MatchSummary;
  matchLabel: string;
  matchNote: string;
  commute: string;
  availability: string;
  fitReasons: string[];
  trustSnapshot: TrustSnapshotItem[];
  trustSummary: string[];
  trustSections: {
    verified: {
      title: string;
      items: string[];
    };
    hostProvided: {
      title: string;
      items: string[];
    };
    gated: {
      title: string;
      items: string[];
      note: string;
    };
  };
  highlights: string[];
  houseRules: string[];
  intro: string;
  imageUri: string;
  imageCount: number;
  media: MediaSummary;
  pricing: {
    headline: string;
    included: string[];
    excluded: string[];
    deposit: string;
    stayLength: string;
  };
  pricingSummary: PricingSummary;
  host: {
    name: string;
    safeName: string;
    role: string;
    responseTime: string;
    verification: string;
    note: string;
    disclosureLevel: HostDisclosureLevel;
  };
  household: {
    title: string;
    residents: string;
    vibe: string;
    languages: string[];
    expectations: string[];
    summaryLine: string;
  };
  heroColors: [string, string];
};

export type SavedListingSeed = {
  id: string;
  listingId: string;
  note: string;
  saveReasonKey: ShortlistSaveReasonKey;
  savedAtLabel: string;
};

export type SavedListingEntry = SavedListingSeed & {
  listing: Listing;
};

export type ShortlistSeed = {
  id: string;
  name: string;
  description: string;
  entries: SavedListingSeed[];
};

export type Shortlist = {
  id: string;
  name: string;
  description: string;
  entries: SavedListingEntry[];
};

export type MatchRequest = {
  id: string;
  title: string;
  stateKey: "strongFit" | "needsFollowUp" | "waitingOnHost";
  summary: string;
  compatibility: string;
};

export type Conversation = {
  id: string;
  name: string;
  role: string;
  snippet: string;
  time: string;
  unread: boolean;
};

export type StayMilestone = {
  id: string;
  title: string;
  description: string;
  state: "done" | "current" | "upcoming";
};

type Metric = {
  label: string;
  value: string;
};

type OnboardingCard = {
  title: string;
  body: string;
};

type VerificationItem = {
  label: string;
  stateKey: "complete" | "inProgress" | "needed";
};

type PreferenceItem = {
  label: string;
  value: string;
};

type Visual = {
  id: string;
  label: string;
  uri: string;
};

type DiscoverFilter = {
  id: string;
  label: string;
  tone: "neutral" | "accent" | "verified" | "quiet";
};

type RoomMatchDataMessages = {
  heroMetrics: Metric[];
  discoverFilters: DiscoverFilter[];
  onboardingCards: OnboardingCard[];
  landingVisuals: Visual[];
  discoverVisual: { uri: string };
  listings: Listing[];
  matchRequests: MatchRequest[];
  conversations: Conversation[];
  stayMilestones: StayMilestone[];
  verificationChecklist: VerificationItem[];
  profilePreferences: PreferenceItem[];
  savedShortlists: ShortlistSeed[];
};

export function useRoomMatchData() {
  const { locale, messages } = useTranslations<RoomMatchDataMessages>("data");

  const listings = messages.listings.map((listing) => {
    const trustSnapshot = listing.trustSnapshot ?? listing.trustSummary.map((label, index) => ({
      id: `${listing.id}-trust-${index}`,
      label,
      sourceKey: index === 0 ? "roommatch" : index === 1 ? "host" : "later"
    }));

    const match = listing.match ?? {
      band: listing.matchScore >= 90 ? "strong" : "promising",
      scoreLabel: `${listing.matchScore}%`,
      rationale: listing.matchNote,
      confidenceNote: listing.matchLabel
    };

    const pricingSummary = listing.pricingSummary ?? {
      headline: formatSarValue(locale, listing.priceSar),
      includedSummary: listing.pricing.included.join(locale === "ar" ? "، " : ", "),
      excludedSummary: listing.pricing.excluded.join(locale === "ar" ? "، " : ", "),
      disclosureNote: listing.pricing.deposit
    };

    const media = listing.media ?? {
      count: listing.imageCount,
      reviewedLabel: `${listing.imageCount} ${locale === "ar" ? "صور" : "photos"}`
    };

    const locationSummary = listing.locationSummary ?? {
      precisionKey: "area",
      label: listing.publicLocation,
      privacyNote:
        locale === "ar"
          ? "العنوان الدقيق يظهر لاحقاً بعد الاهتمام المتبادل."
          : "Exact address details appear later after mutual interest."
    };

    return {
      ...listing,
      heroColors: listing.heroColors as [string, string],
      match,
      matchLabel: listing.matchLabel ?? match.confidenceNote,
      matchNote: listing.matchNote ?? match.rationale,
      trustSnapshot,
      trustSummary: trustSnapshot.map((item) => item.label),
      media,
      imageCount: listing.imageCount ?? media.count,
      pricing: {
        ...listing.pricing,
        headline: listing.pricing.headline ?? formatSarValue(locale, listing.priceSar)
      },
      pricingSummary,
      locationSummary,
      host: {
        ...listing.host,
        safeName: listing.host.safeName ?? listing.host.name,
        disclosureLevel: listing.host.disclosureLevel ?? "roleOnly"
      },
      household: {
        ...listing.household,
        summaryLine:
          listing.household.summaryLine ??
          `${listing.household.residents} · ${listing.household.vibe}`
      }
    };
  });

  const listingsById = new Map(listings.map((listing) => [listing.id, listing]));
  const savedShortlists = messages.savedShortlists.map((shortlist) => ({
    ...shortlist,
    entries: shortlist.entries
      .map((entry) => {
        const listing = listingsById.get(entry.listingId);
        return listing ? { ...entry, listing } : undefined;
      })
      .filter((entry): entry is SavedListingEntry => Boolean(entry))
  }));

  return {
    heroMetrics: messages.heroMetrics,
    discoverFilters: messages.discoverFilters,
    onboardingCards: messages.onboardingCards,
    landingVisuals: messages.landingVisuals,
    discoverVisual: messages.discoverVisual,
    listings,
    matchRequests: messages.matchRequests,
    conversations: messages.conversations,
    stayMilestones: messages.stayMilestones,
    verificationChecklist: messages.verificationChecklist,
    profilePreferences: messages.profilePreferences,
    savedShortlists,
    formatSar: (value: number) => formatSarValue(locale, value)
  };
}

export function getListingById(id: string, listings: Listing[]): Listing | undefined {
  return listings.find((listing) => listing.id === id);
}

export function formatSarValue(locale: Locale, value: number): string {
  const targetLocale = locale === "ar" ? "ar-SA" : "en-US";
  const suffix = locale === "ar" ? "ريال / شهر" : "SAR / month";
  return `${new Intl.NumberFormat(targetLocale).format(value)} ${suffix}`;
}
