export const SHORTLIST_COMPARE_LIMIT = 4;
export const SHORTLIST_NOTE_MAX_LENGTH = 80;

export const shortlistPreviewFieldOrder = [
  "price",
  "trust",
  "household",
  "location"
] as const;

export const shortlistComparisonFieldOrder = [
  "price",
  "includedCosts",
  "trust",
  "household",
  "location"
] as const;

export const shortlistPrivacyRules = {
  exactAddressLocked: true,
  directContactLocked: true,
  hostPersonalIdentityLocked: true,
  seekerNotesPrivate: true
} as const;

export function clampShortlistNote(input: string) {
  return input.trim().slice(0, SHORTLIST_NOTE_MAX_LENGTH);
}

export function defaultSaveReasonForShortlist(shortlistId: string) {
  if (shortlistId.includes("commute")) {
    return "commute" as const;
  }

  if (shortlistId.includes("budget")) {
    return "budget" as const;
  }

  if (shortlistId.includes("vibe")) {
    return "vibe" as const;
  }

  return "trust" as const;
}
