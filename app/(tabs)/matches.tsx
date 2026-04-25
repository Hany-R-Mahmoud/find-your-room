import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

import { AppHeader } from "@/components/AppHeader";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { formatSarValue } from "@/data/find-your-room";
import { rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { useShortlists } from "@/shortlists";
import { palette, radii, spacing } from "@/ui/theme";

export default function MatchesScreen() {
  const { isRTL, t } = useTranslations<{
    eyebrow: string;
    title: string;
    caption: string;
    callout: { title: string; copy: string };
    actions: {
      createShortlist: string;
      compare: string;
      hideComparison: string;
      remove: string;
      editNote: string;
      doneEditing: string;
    };
    labels: {
      privateNote: string;
      saveReason: string;
      savedAt: string;
      entryCount: string;
      comparisonTitle: string;
      comparisonCaption: string;
      comparisonSet: string;
      price: string;
      includedCosts: string;
      trust: string;
      household: string;
      location: string;
      notePlaceholder: string;
    };
    states: { emptyTitle: string; emptyCopy: string; comparisonHint: string };
    saveReasons: Record<string, string>;
    privacy: { lockedDetails: string };
  }>("shortlists");
  const { shortlists, createShortlist, compareLimit, removeSavedListing, updateSavedListingNote, updateSavedListingReason } = useShortlists();
  const [activeComparisonId, setActiveComparisonId] = useState<string | null>(shortlists[0]?.entries.length >= 2 ? shortlists[0]?.id : null);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const saveReasonKeys = ["commute", "budget", "vibe", "trust", "moveIn"] as const;

  return (
    <Screen>
      <AppHeader />
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        caption={t("caption")}
      />

      <View style={styles.callout}>
        <Text style={[styles.calloutTitle, { textAlign: textAlignFor(isRTL) }]}>{t("callout.title")}</Text>
        <Text style={[styles.calloutCopy, { textAlign: textAlignFor(isRTL) }]}>{t("callout.copy")}</Text>
        <View style={[styles.calloutActions, { flexDirection: rowDirectionFor(isRTL) }]}>
          <Pill label={t("labels.compareLimit", { count: compareLimit })} tone="verified" />
          <Pill label={t("privacy.lockedDetails")} tone="quiet" />
        </View>
      </View>

      {shortlists.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={[styles.calloutTitle, { color: palette.ink, textAlign: textAlignFor(isRTL) }]}>{t("states.emptyTitle")}</Text>
          <Text style={[styles.summary, { textAlign: textAlignFor(isRTL) }]}>{t("states.emptyCopy")}</Text>
        </View>
      ) : (
        <View style={styles.stack}>
          {shortlists.map((shortlist) => (
            <View key={shortlist.id} style={styles.card}>
              <View style={[styles.row, { flexDirection: rowDirectionFor(isRTL) }]}>
                <View style={styles.cardHeading}>
                  <Text style={[styles.cardTitle, { textAlign: textAlignFor(isRTL) }]}>{shortlist.name}</Text>
                  <Text style={[styles.summary, { textAlign: textAlignFor(isRTL) }]}>{shortlist.description}</Text>
                </View>
                <Pill label={t("labels.entryCount", { count: shortlist.entries.length })} tone="verified" />
              </View>

              <View style={[styles.row, { flexDirection: rowDirectionFor(isRTL) }]}>
                <Text style={[styles.compareHint, { textAlign: textAlignFor(isRTL) }]}>
                  {shortlist.entries.length >= 2 ? t("labels.comparisonSet", { count: Math.min(shortlist.entries.length, compareLimit) }) : t("states.comparisonHint")}
                </Text>
                {shortlist.entries.length >= 2 ? (
                  <Pressable
                    onPress={() => setActiveComparisonId((current) => (current === shortlist.id ? null : shortlist.id))}
                    style={({ pressed }) => [styles.compareButton, pressed && styles.savedCardPressed]}
                  >
                    <Text style={styles.compareButtonText}>
                      {activeComparisonId === shortlist.id ? t("actions.hideComparison") : t("actions.compare")}
                    </Text>
                  </Pressable>
                ) : null}
              </View>

              {activeComparisonId === shortlist.id ? (
                <View style={styles.comparePanel}>
                  <Text style={[styles.compareTitle, { textAlign: textAlignFor(isRTL) }]}>{t("labels.comparisonTitle")}</Text>
                  <Text style={[styles.summary, { textAlign: textAlignFor(isRTL) }]}>{t("labels.comparisonCaption")}</Text>
                  <View style={styles.savedStack}>
                    {shortlist.entries.slice(0, compareLimit).map((entry) => (
                      <View key={`${entry.id}-compare`} style={styles.compareCard}>
                        <View style={[styles.row, { flexDirection: rowDirectionFor(isRTL) }]}>
                          <Text style={[styles.savedTitle, { textAlign: textAlignFor(isRTL) }]}>{entry.listing.title}</Text>
                          <Pressable
                            onPress={() => removeSavedListing(shortlist.id, entry.id)}
                            style={({ pressed }) => [styles.removeButton, pressed && styles.savedCardPressed]}
                          >
                            <Text style={styles.removeButtonText}>{t("actions.remove")}</Text>
                          </Pressable>
                        </View>
                        <View style={styles.compareRows}>
                          <View style={styles.compareRow}>
                            <Text style={[styles.compareLabel, { textAlign: textAlignFor(isRTL) }]}>{t("labels.price")}</Text>
                            <Text style={[styles.compareValue, { textAlign: textAlignFor(isRTL) }]}>
                              {formatSarValue(isRTL ? "ar" : "en", entry.listing.priceSar)}
                            </Text>
                          </View>
                          <View style={styles.compareRow}>
                            <Text style={[styles.compareLabel, { textAlign: textAlignFor(isRTL) }]}>{t("labels.includedCosts")}</Text>
                            <Text style={[styles.compareValue, { textAlign: textAlignFor(isRTL) }]}>{entry.listing.pricingSummary.includedSummary}</Text>
                          </View>
                          <View style={styles.compareRow}>
                            <Text style={[styles.compareLabel, { textAlign: textAlignFor(isRTL) }]}>{t("labels.trust")}</Text>
                            <Text style={[styles.compareValue, { textAlign: textAlignFor(isRTL) }]}>
                              {entry.listing.match.confidenceNote} · {entry.listing.trustSnapshot[0]?.label ?? ""}
                            </Text>
                          </View>
                          <View style={styles.compareRow}>
                            <Text style={[styles.compareLabel, { textAlign: textAlignFor(isRTL) }]}>{t("labels.household")}</Text>
                            <Text style={[styles.compareValue, { textAlign: textAlignFor(isRTL) }]}>{entry.listing.household.summaryLine}</Text>
                          </View>
                          <View style={styles.compareRow}>
                            <Text style={[styles.compareLabel, { textAlign: textAlignFor(isRTL) }]}>{t("labels.location")}</Text>
                            <Text style={[styles.compareValue, { textAlign: textAlignFor(isRTL) }]}>{entry.listing.locationSummary.label}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}

              <View style={styles.savedStack}>
                {shortlist.entries.map((entry) => (
                  <Pressable key={entry.id} onPress={() => router.push(`/room/${entry.listing.id}`)} style={({ pressed }) => [styles.savedCard, pressed && styles.savedCardPressed]}>
                    <View style={[styles.row, { flexDirection: rowDirectionFor(isRTL) }]}>
                      <Text style={[styles.savedTitle, { textAlign: textAlignFor(isRTL) }]}>{entry.listing.title}</Text>
                      <Text style={[styles.savedPrice, { textAlign: textAlignFor(isRTL) }]}>
                        {formatSarValue(isRTL ? "ar" : "en", entry.listing.priceSar)}
                      </Text>
                    </View>
                    <Text style={[styles.compatibility, { textAlign: textAlignFor(isRTL) }]}>
                      {entry.listing.match.confidenceNote} · {entry.listing.household.title}
                    </Text>
                    <Text style={[styles.summary, { textAlign: textAlignFor(isRTL) }]}>
                      {entry.listing.locationSummary.label} · {entry.listing.pricingSummary.includedSummary}
                    </Text>
                    <View style={styles.metaStrip}>
                      {saveReasonKeys.map((reasonKey) => (
                        <Pressable
                          key={`${entry.id}-${reasonKey}`}
                          onPress={() => updateSavedListingReason(shortlist.id, entry.id, reasonKey)}
                          style={({ pressed }) => [
                            styles.reasonChip,
                            entry.saveReasonKey === reasonKey && styles.reasonChipActive,
                            pressed && styles.savedCardPressed
                          ]}
                        >
                          <Text style={[styles.reasonChipText, entry.saveReasonKey === reasonKey && styles.reasonChipTextActive]}>
                            {t(`saveReasons.${reasonKey}`)}
                          </Text>
                        </Pressable>
                      ))}
                      <Pill label={entry.listing.trustSnapshot[0]?.label ?? entry.listing.match.confidenceNote} tone="quiet" />
                    </View>
                    <View style={styles.noteHeader}>
                      <Text style={[styles.noteLabel, { textAlign: textAlignFor(isRTL) }]}>{t("labels.privateNote")}</Text>
                      <Pressable
                        onPress={() => setEditingEntryId((current) => (current === entry.id ? null : entry.id))}
                        style={({ pressed }) => [styles.inlineAction, pressed && styles.savedCardPressed]}
                      >
                        <Text style={styles.inlineActionText}>
                          {editingEntryId === entry.id ? t("actions.doneEditing") : t("actions.editNote")}
                        </Text>
                      </Pressable>
                    </View>
                    {editingEntryId === entry.id ? (
                      <TextInput
                        defaultValue={entry.note}
                        multiline
                        onChangeText={(value) => updateSavedListingNote(shortlist.id, entry.id, value)}
                        placeholder={t("labels.notePlaceholder")}
                        placeholderTextColor={palette.clay}
                        style={[styles.noteInput, { textAlign: textAlignFor(isRTL) }]}
                      />
                    ) : (
                      <Text style={[styles.noteCopy, { textAlign: textAlignFor(isRTL) }]}>{entry.note}</Text>
                    )}
                    <Text style={[styles.savedAt, { textAlign: textAlignFor(isRTL) }]}>
                      {t("labels.savedAt")}: {entry.savedAtLabel}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      <Pressable
        onPress={() =>
          createShortlist({
            id: "shortlist-budget",
            name: t("saveReasons.defaultShortlistName"),
            description: t("saveReasons.defaultShortlistDescription")
          })
        }
        style={({ pressed }) => [styles.createButton, pressed && styles.savedCardPressed]}
      >
        <Text style={styles.createButtonText}>{t("actions.createShortlist")}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  callout: {
    borderRadius: radii.lg,
    backgroundColor: palette.palm,
    padding: spacing.lg,
    gap: spacing.sm
  },
  calloutActions: {
    gap: spacing.xs
  },
  calloutTitle: {
    color: palette.surface,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900"
  },
  calloutCopy: {
    color: palette.surface,
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.92
  },
  stack: {
    gap: spacing.md
  },
  emptyCard: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: spacing.lg,
    gap: spacing.xs
  },
  card: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: spacing.lg,
    gap: spacing.xs
  },
  compareHint: {
    flex: 1,
    color: palette.clay,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700"
  },
  compareButton: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: palette.palm,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 8
  },
  compareButtonText: {
    color: palette.palm,
    fontSize: 12,
    fontWeight: "900"
  },
  comparePanel: {
    borderRadius: radii.sm,
    backgroundColor: palette.elevated,
    padding: spacing.md,
    gap: spacing.sm
  },
  compareTitle: {
    color: palette.ink,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900"
  },
  row: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm
  },
  cardHeading: {
    flex: 1,
    gap: spacing.xs
  },
  cardTitle: {
    flex: 1,
    color: palette.ink,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900"
  },
  compatibility: {
    color: palette.clay,
    fontSize: 13,
    fontWeight: "800"
  },
  savedStack: {
    gap: spacing.sm
  },
  savedCard: {
    borderRadius: radii.sm,
    backgroundColor: palette.elevated,
    padding: spacing.md,
    gap: spacing.xs
  },
  savedCardPressed: {
    opacity: 0.93
  },
  compareCard: {
    borderRadius: radii.sm,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    padding: spacing.md,
    gap: spacing.sm
  },
  savedTitle: {
    flex: 1,
    color: palette.ink,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800"
  },
  savedPrice: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: "800"
  },
  metaStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  reasonChip: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 7
  },
  reasonChipActive: {
    borderColor: palette.palm,
    backgroundColor: palette.palm
  },
  reasonChipText: {
    color: palette.clay,
    fontSize: 12,
    fontWeight: "800"
  },
  reasonChipTextActive: {
    color: palette.surface
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  noteLabel: {
    flex: 1,
    color: palette.inkSoft,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700"
  },
  inlineAction: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 6
  },
  inlineActionText: {
    color: palette.palm,
    fontSize: 12,
    fontWeight: "800"
  },
  noteInput: {
    minHeight: 76,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    color: palette.ink,
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  noteCopy: {
    color: palette.inkSoft,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600"
  },
  savedAt: {
    color: palette.clay,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700"
  },
  summary: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22
  },
  compareRows: {
    gap: spacing.xs
  },
  compareRow: {
    gap: 4
  },
  compareLabel: {
    color: palette.clay,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  compareValue: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600"
  },
  removeButton: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.elevated,
    paddingHorizontal: spacing.md,
    paddingVertical: 8
  },
  removeButtonText: {
    color: palette.clay,
    fontSize: 12,
    fontWeight: "800"
  },
  createButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  createButtonText: {
    color: palette.palm,
    fontSize: 13,
    fontWeight: "900"
  }
});
