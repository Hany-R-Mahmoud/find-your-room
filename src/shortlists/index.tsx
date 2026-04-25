import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

import {
  type Listing,
  type SavedListingEntry,
  type Shortlist,
  type ShortlistSaveReasonKey,
  useRoomMatchData
} from "@/data/roommatch";
import { clampShortlistNote, SHORTLIST_COMPARE_LIMIT } from "./rules";

type SaveListingInput = {
  listing: Listing;
  shortlistId: string;
  note?: string;
  saveReasonKey: ShortlistSaveReasonKey;
  savedAtLabel: string;
};

type ShortlistsContextValue = {
  shortlists: Shortlist[];
  compareLimit: number;
  createShortlist: (input: { id: string; name: string; description: string }) => void;
  saveListing: (input: SaveListingInput) => void;
  removeSavedListing: (shortlistId: string, entryId: string) => void;
  updateSavedListingNote: (shortlistId: string, entryId: string, note: string) => void;
  updateSavedListingReason: (shortlistId: string, entryId: string, saveReasonKey: ShortlistSaveReasonKey) => void;
};

const ShortlistsContext = createContext<ShortlistsContextValue | null>(null);

function upsertSavedEntry(entries: SavedListingEntry[], input: SaveListingInput): SavedListingEntry[] {
  const existing = entries.find((entry) => entry.listingId === input.listing.id);

  if (existing) {
    return entries.map((entry) =>
      entry.id === existing.id
        ? {
            ...entry,
            note: clampShortlistNote(input.note ?? entry.note),
            saveReasonKey: input.saveReasonKey,
            savedAtLabel: input.savedAtLabel
          }
        : entry
    );
  }

  return [
    {
      id: `${input.shortlistId}-${input.listing.id}`,
      listingId: input.listing.id,
      listing: input.listing,
      note: clampShortlistNote(input.note ?? ""),
      saveReasonKey: input.saveReasonKey,
      savedAtLabel: input.savedAtLabel
    },
    ...entries
  ];
}

export function ShortlistsProvider({ children }: PropsWithChildren) {
  const { savedShortlists } = useRoomMatchData();
  const [shortlists, setShortlists] = useState<Shortlist[]>(savedShortlists);

  const value = useMemo<ShortlistsContextValue>(
    () => ({
      shortlists,
      compareLimit: SHORTLIST_COMPARE_LIMIT,
      createShortlist: ({ id, name, description }) => {
        setShortlists((current) => {
          if (current.some((shortlist) => shortlist.id === id)) {
            return current;
          }

          return [...current, { id, name, description, entries: [] }];
        });
      },
      saveListing: (input) => {
        setShortlists((current) =>
          current.map((shortlist) =>
            shortlist.id === input.shortlistId
              ? {
                  ...shortlist,
                  entries: upsertSavedEntry(shortlist.entries, input)
                }
              : shortlist
          )
        );
      },
      removeSavedListing: (shortlistId, entryId) => {
        setShortlists((current) =>
          current.map((shortlist) =>
            shortlist.id === shortlistId
              ? {
                  ...shortlist,
                  entries: shortlist.entries.filter((entry) => entry.id !== entryId)
                }
              : shortlist
          )
        );
      },
      updateSavedListingNote: (shortlistId, entryId, note) => {
        setShortlists((current) =>
          current.map((shortlist) =>
            shortlist.id === shortlistId
              ? {
                  ...shortlist,
                  entries: shortlist.entries.map((entry) =>
                    entry.id === entryId ? { ...entry, note: clampShortlistNote(note) } : entry
                  )
                }
              : shortlist
          )
        );
      },
      updateSavedListingReason: (shortlistId, entryId, saveReasonKey) => {
        setShortlists((current) =>
          current.map((shortlist) =>
            shortlist.id === shortlistId
              ? {
                  ...shortlist,
                  entries: shortlist.entries.map((entry) =>
                    entry.id === entryId ? { ...entry, saveReasonKey } : entry
                  )
                }
              : shortlist
          )
        );
      }
    }),
    [shortlists]
  );

  return <ShortlistsContext.Provider value={value}>{children}</ShortlistsContext.Provider>;
}

export function useShortlists() {
  const context = useContext(ShortlistsContext);

  if (!context) {
    throw new Error("useShortlists must be used within ShortlistsProvider");
  }

  return context;
}
