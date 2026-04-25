import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

import { rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { formatSarValue, type Listing } from "@/data/find-your-room";
import { useShortlists } from "@/shortlists";
import { defaultSaveReasonForShortlist } from "@/shortlists/rules";
import { palette, radii, shadows, spacing } from "@/ui/theme";
import { Pill } from "./Pill";

type ListingCardProps = {
  listing: Listing;
  onPress: () => void;
};

function toneForSource(sourceKey: Listing["trustSnapshot"][number]["sourceKey"]) {
  switch (sourceKey) {
    case "find-your-room":
      return "sourceFindYourRoom" as const;
    case "host":
      return "sourceHost" as const;
    case "later":
      return "sourceLater" as const;
  }
}

export function ListingCard({ listing, onPress }: ListingCardProps) {
  const { isRTL, t } = useTranslations<{
    labels: {
      fit: string;
      fitSignal: string;
      approximateArea: string;
      languages: string;
      location: string;
      photos: string;
      reviewedPhotos: string;
      pricingHeadline: string;
      pricingDisclosure: string;
      householdSummary: string;
      privacyNote: string;
      included: string;
      separate: string;
      expectations: string;
    };
    trustSources: Record<"find-your-room" | "host" | "later", string>;
  }>("common");
  const { shortlists, saveListing } = useShortlists();
  const { t: ts } = useTranslations<{
    actions: { save: string; saved: string };
    labels: { savedJustNow: string };
  }>("shortlists");
  const shortlistOptions = shortlists.slice(0, 2);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <ImageBackground imageStyle={styles.heroImage} source={{ uri: listing.imageUri }} style={styles.heroImageWrap}>
        <View style={styles.hero}>
          <View style={[styles.heroChipRow, { flexDirection: rowDirectionFor(isRTL) }]}>
            <Pill label={listing.match.confidenceNote} tone="verified" />
            <Pill label={listing.media.reviewedLabel} tone="quiet" />
          </View>
          <View style={[styles.heroChipRow, { flexDirection: rowDirectionFor(isRTL) }]}>
            <Pill label={t("labels.approximateArea")} tone="sourceLater" />
          </View>
        </View>
      </ImageBackground>

      <View style={styles.body}>
        <View style={styles.titleGroup}>
          <Text style={[styles.district, { textAlign: textAlignFor(isRTL) }]}>{listing.district}</Text>
          <Text style={[styles.title, { textAlign: textAlignFor(isRTL) }]}>{listing.title}</Text>
          <Text style={[styles.commute, { textAlign: textAlignFor(isRTL) }]}>
            {t("labels.location")}: {listing.locationSummary.label}
          </Text>
        </View>

        <View style={[styles.row, { flexDirection: rowDirectionFor(isRTL) }]}>
          <Text style={[styles.price, { textAlign: textAlignFor(isRTL) }]}>{formatSarValue(isRTL ? "ar" : "en", listing.priceSar)}</Text>
          <Text style={[styles.availability, { textAlign: textAlignFor(isRTL) }]}>{listing.availability}</Text>
        </View>

        <View style={styles.shortlistRow}>
          {shortlistOptions.map((shortlist) => {
            const isSaved = shortlist.entries.some((entry) => entry.listingId === listing.id);

            return (
              <Pressable
                key={shortlist.id}
                onPress={(event) => {
                  event.stopPropagation();
                  saveListing({
                    listing,
                    shortlistId: shortlist.id,
                    saveReasonKey: defaultSaveReasonForShortlist(shortlist.id),
                    savedAtLabel: ts("labels.savedJustNow")
                  });
                }}
                style={({ pressed }) => [
                  styles.shortlistButton,
                  isSaved && styles.shortlistButtonSaved,
                  pressed && styles.shortlistButtonPressed
                ]}
              >
                <MaterialIcons
                  color={isSaved ? palette.surface : palette.palm}
                  name={isSaved ? "favorite" : "favorite-border"}
                  size={16}
                />
                <Text style={[styles.shortlistButtonText, isSaved && styles.shortlistButtonTextSaved]}>
                  {isSaved ? ts("actions.saved") : ts("actions.save")} {shortlist.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.trustCard}>
          <View style={styles.trustStrip}>
            {listing.trustSnapshot.slice(0, 3).map((item) => (
              <Pill key={item.id} label={item.label} tone={toneForSource(item.sourceKey)} />
            ))}
          </View>
          <Text style={[styles.privacyNote, { textAlign: textAlignFor(isRTL) }]}>
            {t("labels.privacyNote")}: {listing.locationSummary.privacyNote}
          </Text>
        </View>

        <View style={styles.metaGroup}>
          <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("labels.fitSignal")}</Text>
          <Text style={[styles.fitLabel, { textAlign: textAlignFor(isRTL) }]}>
            {listing.match.confidenceNote} · {listing.match.scoreLabel}
          </Text>
          <Text style={[styles.metaText, { textAlign: textAlignFor(isRTL) }]}>{listing.match.rationale}</Text>
          <View style={styles.pillRow}>
            {listing.fitReasons.slice(0, 2).map((reason) => (
              <Pill key={reason} label={reason} tone="quiet" />
            ))}
          </View>
        </View>

        <View style={styles.offerCard}>
          <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("labels.pricingHeadline")}</Text>
          <Text style={[styles.offerHeadline, { textAlign: textAlignFor(isRTL) }]}>{listing.pricingSummary.headline}</Text>
          <Text style={[styles.metaText, { textAlign: textAlignFor(isRTL) }]}>{listing.pricingSummary.includedSummary}</Text>
          <Text style={[styles.metaSubtle, { textAlign: textAlignFor(isRTL) }]}>{listing.pricingSummary.excludedSummary}</Text>

          <View style={styles.divider} />

          <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("labels.householdSummary")}</Text>
          <Text style={[styles.metaHeading, { textAlign: textAlignFor(isRTL) }]}>{listing.household.title}</Text>
          <Text style={[styles.metaText, { textAlign: textAlignFor(isRTL) }]}>{listing.household.summaryLine}</Text>
          <Text style={[styles.metaSubtle, { textAlign: textAlignFor(isRTL) }]}>
            {t("labels.expectations")}: {listing.household.expectations.slice(0, 1).join(isRTL ? "، " : ", ")}
          </Text>
          <Text style={[styles.intro, { textAlign: textAlignFor(isRTL) }]}>
            {listing.host.responseTime} · {listing.media.reviewedLabel} · {listing.pricing.stayLength}
          </Text>
          <Text style={[styles.sourceSummary, { textAlign: textAlignFor(isRTL) }]}>
            {t(`trustSources.${listing.trustSnapshot[0]?.sourceKey ?? "find-your-room"}`)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: radii.lg,
    backgroundColor: palette.elevated,
    ...shadows.card
  },
  cardPressed: {
    opacity: 0.94
  },
  heroImageWrap: {
    minHeight: 210
  },
  heroImage: {
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg
  },
  hero: {
    minHeight: 210,
    padding: spacing.lg,
    justifyContent: "space-between",
    backgroundColor: "rgba(25, 28, 29, 0.08)"
  },
  heroChipRow: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  titleGroup: {
    gap: 6
  },
  district: {
    color: palette.palmSoft,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  title: {
    color: palette.ink,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "900"
  },
  commute: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600"
  },
  body: {
    padding: spacing.lg,
    gap: spacing.md
  },
  shortlistRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  shortlistButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 8
  },
  shortlistButtonSaved: {
    borderColor: palette.palm,
    backgroundColor: palette.palm
  },
  shortlistButtonPressed: {
    opacity: 0.92
  },
  shortlistButtonText: {
    color: palette.palm,
    fontSize: 12,
    fontWeight: "800"
  },
  shortlistButtonTextSaved: {
    color: palette.surface
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  price: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: "800"
  },
  availability: {
    color: palette.clay,
    fontSize: 13,
    fontWeight: "700"
  },
  intro: {
    color: palette.inkSoft,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600"
  },
  metaLabel: {
    color: palette.clay,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0
  },
  trustCard: {
    borderRadius: radii.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    padding: spacing.md,
    gap: spacing.xs
  },
  trustStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  privacyNote: {
    color: palette.dusk,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600"
  },
  fitLabel: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "700"
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  offerCard: {
    borderRadius: radii.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    padding: spacing.md,
    gap: 4
  },
  metaGroup: {
    gap: spacing.xs
  },
  metaHeading: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  offerHeadline: {
    color: palette.ink,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900"
  },
  metaText: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 21
  },
  metaSubtle: {
    color: palette.palmSoft,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600"
  },
  sourceSummary: {
    color: palette.clay,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700"
  },
  divider: {
    height: 1,
    backgroundColor: palette.line,
    marginVertical: spacing.xs
  }
});
