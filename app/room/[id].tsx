import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { getListingById, useRoomMatchData } from "@/data/roommatch";
import { forwardIconFor, rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { useShortlists } from "@/shortlists";
import { defaultSaveReasonForShortlist } from "@/shortlists/rules";
import { palette, radii, spacing } from "@/ui/theme";

function toneForSource(sourceKey: "roommatch" | "host" | "later") {
  switch (sourceKey) {
    case "roommatch":
      return "sourceRoomMatch" as const;
    case "host":
      return "sourceHost" as const;
    case "later":
      return "sourceLater" as const;
  }
}

export default function RoomDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const { listings, formatSar } = useRoomMatchData();
  const { isRTL, t } = useTranslations<{
    notFound: { title: string; copy: string };
    decisionHeader: { eyebrow: string; caption: string };
    sections: { offer: string; fit: string; trust: string; household: string; highlights: string; rules: string };
    trustNote: string;
    trustSectionLabels: { source: string; reviewed: string; provided: string; later: string };
    hostCard: { title: string; caption: string };
    button: string;
  }>("room");
  const { t: tc } = useTranslations<{
    labels: Record<string, string>;
    trustSources: Record<"roommatch" | "host" | "later", string>;
    hostDisclosure: Record<"roleOnly" | "managedContact", string>;
  }>("common");
  const { shortlists, saveListing } = useShortlists();
  const { t: ts } = useTranslations<{
    actions: { save: string; saved: string };
    labels: { savedJustNow: string };
    privacy: { note: string; lockedDetails: string };
  }>("shortlists");
  const listing = params.id ? getListingById(params.id, listings) : undefined;

  if (!listing) {
    return (
      <Screen>
        <AppHeader showBack />
        <Text style={[styles.emptyTitle, { textAlign: textAlignFor(isRTL) }]}>{t("notFound.title")}</Text>
        <Text style={[styles.emptyCopy, { textAlign: textAlignFor(isRTL) }]}>{t("notFound.copy")}</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <AppHeader showBack />

      <View style={[styles.headerRow, { flexDirection: rowDirectionFor(isRTL) }]}>
        <View />
        <Pill label={listing.match.confidenceNote} tone="verified" />
      </View>

      <ImageBackground imageStyle={styles.heroImage} source={{ uri: listing.imageUri }} style={styles.heroWrap}>
        <LinearGradient colors={["rgba(16, 24, 22, 0.08)", "rgba(16, 24, 22, 0.82)"]} style={styles.hero}>
          <View style={[styles.heroChipRow, { flexDirection: rowDirectionFor(isRTL) }]}>
            <Pill label={listing.media.reviewedLabel} tone="quiet" />
            <Pill label={tc("labels.approximateArea")} tone="sourceLater" />
          </View>
          <Text style={[styles.heroDistrict, { textAlign: textAlignFor(isRTL) }]}>{listing.district}</Text>
          <Text style={[styles.heroTitle, { textAlign: textAlignFor(isRTL) }]}>{listing.title}</Text>
          <Text style={[styles.heroMeta, { textAlign: textAlignFor(isRTL) }]}>
            {tc("labels.location")}: {listing.locationSummary.label}
          </Text>
          <Text style={[styles.heroCopy, { textAlign: textAlignFor(isRTL) }]}>{listing.intro}</Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.decisionCard}>
        <Text style={[styles.cardEyebrow, { textAlign: textAlignFor(isRTL) }]}>{t("decisionHeader.eyebrow")}</Text>
        <Text style={[styles.price, { textAlign: textAlignFor(isRTL) }]}>{listing.pricingSummary.headline}</Text>
        <Text style={[styles.priceMetaStrong, { textAlign: textAlignFor(isRTL) }]}>
          {listing.match.confidenceNote} · {listing.match.scoreLabel}
        </Text>
        <Text style={[styles.bodyText, { textAlign: textAlignFor(isRTL) }]}>{listing.match.rationale}</Text>
        <Text style={[styles.priceMeta, { textAlign: textAlignFor(isRTL) }]}>{listing.commute}</Text>
        <Text style={[styles.priceMeta, { textAlign: textAlignFor(isRTL) }]}>{listing.availability}</Text>
        <Text style={[styles.priceMeta, { textAlign: textAlignFor(isRTL) }]}>{t("decisionHeader.caption")}</Text>
        <View style={styles.pillWrap}>
          {listing.trustSnapshot.map((item) => (
            <Pill key={item.id} label={item.label} tone={toneForSource(item.sourceKey)} />
          ))}
        </View>
        <Text style={[styles.privacyNote, { textAlign: textAlignFor(isRTL) }]}>
          {tc("labels.privacyNote")}: {listing.locationSummary.privacyNote}
        </Text>
        <View style={styles.shortlistWrap}>
          {shortlists.map((shortlist) => {
            const isSaved = shortlist.entries.some((entry) => entry.listingId === listing.id);

            return (
              <Pressable
                key={shortlist.id}
                onPress={() =>
                  saveListing({
                    listing,
                    shortlistId: shortlist.id,
                    saveReasonKey: defaultSaveReasonForShortlist(shortlist.id),
                    savedAtLabel: ts("labels.savedJustNow")
                  })
                }
                style={({ pressed }) => [
                  styles.shortlistButton,
                  isSaved && styles.shortlistButtonSaved,
                  pressed && styles.buttonPressed
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
        <Text style={[styles.groupNote, { textAlign: textAlignFor(isRTL) }]}>{ts("privacy.note")}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { textAlign: textAlignFor(isRTL) }]}>{t("sections.fit")}</Text>
        <Text style={[styles.bodyStrong, { textAlign: textAlignFor(isRTL) }]}>{listing.match.confidenceNote}</Text>
        <Text style={[styles.bodyText, { textAlign: textAlignFor(isRTL) }]}>{listing.match.rationale}</Text>
        <View style={styles.pillWrap}>
          {listing.fitReasons.map((reason) => (
            <Pill key={reason} label={reason} tone="quiet" />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { textAlign: textAlignFor(isRTL) }]}>{t("sections.trust")}</Text>
        <Text style={[styles.bodyText, { textAlign: textAlignFor(isRTL) }]}>{t("trustNote")}</Text>

        <View style={styles.groupCard}>
          <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("trustSectionLabels.reviewed")}</Text>
          <Text style={[styles.groupTitle, { textAlign: textAlignFor(isRTL) }]}>{listing.trustSections.verified.title}</Text>
          <Pill label={tc("trustSources.roommatch")} tone="sourceRoomMatch" />
          {listing.trustSections.verified.items.map((item) => (
            <Text key={item} style={[styles.bulletText, { textAlign: textAlignFor(isRTL) }]}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.groupCard}>
          <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("trustSectionLabels.provided")}</Text>
          <Text style={[styles.groupTitle, { textAlign: textAlignFor(isRTL) }]}>{listing.trustSections.hostProvided.title}</Text>
          <Pill label={tc("trustSources.host")} tone="sourceHost" />
          {listing.trustSections.hostProvided.items.map((item) => (
            <Text key={item} style={[styles.bulletText, { textAlign: textAlignFor(isRTL) }]}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.groupCard}>
          <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("trustSectionLabels.later")}</Text>
          <Text style={[styles.groupTitle, { textAlign: textAlignFor(isRTL) }]}>{listing.trustSections.gated.title}</Text>
          <Pill label={tc("trustSources.later")} tone="sourceLater" />
          {listing.trustSections.gated.items.map((item) => (
            <Text key={item} style={[styles.bulletText, { textAlign: textAlignFor(isRTL) }]}>
              • {item}
            </Text>
          ))}
          <Text style={[styles.groupNote, { textAlign: textAlignFor(isRTL) }]}>{listing.trustSections.gated.note}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { textAlign: textAlignFor(isRTL) }]}>{t("sections.offer")}</Text>
        <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("pricingLabels.headline")}</Text>
        <Text style={[styles.offerPrice, { textAlign: textAlignFor(isRTL) }]}>{listing.pricingSummary.headline}</Text>
        <Text style={[styles.bodyText, { textAlign: textAlignFor(isRTL) }]}>{listing.pricing.stayLength}</Text>

        <View style={styles.infoCard}>
          <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("pricingLabels.includedSummary")}</Text>
          <Text style={[styles.bodyStrong, { textAlign: textAlignFor(isRTL) }]}>{listing.pricingSummary.includedSummary}</Text>
          {listing.pricing.included.map((item) => (
            <Text key={item} style={[styles.bulletText, { textAlign: textAlignFor(isRTL) }]}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("pricingLabels.excludedSummary")}</Text>
          <Text style={[styles.bodyText, { textAlign: textAlignFor(isRTL) }]}>{listing.pricingSummary.excludedSummary}</Text>
          {listing.pricing.excluded.map((item) => (
            <Text key={item} style={[styles.bulletText, { textAlign: textAlignFor(isRTL) }]}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("pricingLabels.deposit")}</Text>
          <Text style={[styles.bodyText, { textAlign: textAlignFor(isRTL) }]}>{listing.pricingSummary.disclosureNote}</Text>
          <Text style={[styles.groupNote, { textAlign: textAlignFor(isRTL) }]}>{listing.pricing.deposit}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { textAlign: textAlignFor(isRTL) }]}>{t("sections.household")}</Text>
        <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("householdLabels.summary")}</Text>
        <Text style={[styles.bodyStrong, { textAlign: textAlignFor(isRTL) }]}>{listing.household.title}</Text>
        <Text style={[styles.bodyText, { textAlign: textAlignFor(isRTL) }]}>{listing.household.summaryLine}</Text>

        <View style={[styles.detailGrid, { flexDirection: rowDirectionFor(isRTL) }]}>
          <View style={styles.detailCard}>
            <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("householdLabels.residents")}</Text>
            <Text style={[styles.detailValue, { textAlign: textAlignFor(isRTL) }]}>{listing.household.residents}</Text>
          </View>
          <View style={styles.detailCard}>
            <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{t("householdLabels.vibe")}</Text>
            <Text style={[styles.detailValue, { textAlign: textAlignFor(isRTL) }]}>{listing.household.vibe}</Text>
          </View>
        </View>

        <Text style={[styles.bodyText, { textAlign: textAlignFor(isRTL) }]}>
          {tc("labels.languages")}: {listing.household.languages.join(isRTL ? "، " : ", ")}
        </Text>
        <Text style={[styles.metaLabel, { textAlign: textAlignFor(isRTL) }]}>{tc("labels.expectations")}</Text>
        {listing.household.expectations.map((expectation) => (
          <Text key={expectation} style={[styles.bulletText, { textAlign: textAlignFor(isRTL) }]}>
            • {expectation}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { textAlign: textAlignFor(isRTL) }]}>{t("sections.highlights")}</Text>
        {listing.highlights.map((highlight) => (
          <Text key={highlight} style={[styles.bulletText, { textAlign: textAlignFor(isRTL) }]}>
            • {highlight}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { textAlign: textAlignFor(isRTL) }]}>{t("sections.rules")}</Text>
        {listing.houseRules.map((rule) => (
          <Text key={rule} style={[styles.bulletText, { textAlign: textAlignFor(isRTL) }]}>
            • {rule}
          </Text>
        ))}
      </View>

      <View style={styles.hostCard}>
        <Text style={[styles.hostLabel, { textAlign: textAlignFor(isRTL) }]}>{t("hostCard.title")}</Text>
        <Text style={[styles.hostTitle, { textAlign: textAlignFor(isRTL) }]}>{listing.host.safeName}</Text>
        <Text style={[styles.hostRole, { textAlign: textAlignFor(isRTL) }]}>{listing.host.role}</Text>
        <Text style={[styles.hostCopy, { textAlign: textAlignFor(isRTL) }]}>
          {listing.host.verification} · {listing.host.responseTime}
        </Text>
        <Text style={[styles.hostCopy, { textAlign: textAlignFor(isRTL) }]}>
          {tc(`hostDisclosure.${listing.host.disclosureLevel}`)}
        </Text>
        <Text style={[styles.hostNote, { textAlign: textAlignFor(isRTL) }]}>{t("hostCard.caption")}</Text>
        <Text style={[styles.hostNote, { textAlign: textAlignFor(isRTL) }]}>{listing.host.note}</Text>
      </View>

      <Pressable
        onPress={() => router.push("/matches")}
        style={({ pressed }) => [styles.primaryButton, { flexDirection: rowDirectionFor(isRTL) }, pressed && styles.buttonPressed]}
      >
        <Text style={styles.primaryButtonText}>{t("button")}</Text>
        <MaterialIcons color={palette.surface} name={forwardIconFor(isRTL)} size={20} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  heroWrap: {
    minHeight: 280,
    overflow: "hidden",
    borderRadius: radii.lg
  },
  heroImage: {
    borderRadius: radii.lg
  },
  hero: {
    minHeight: 280,
    padding: spacing.lg,
    justifyContent: "flex-end",
    gap: spacing.sm
  },
  heroChipRow: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  heroDistrict: {
    color: palette.sand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  heroTitle: {
    color: palette.surface,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "900"
  },
  heroCopy: {
    color: palette.surface,
    fontSize: 15,
    lineHeight: 23,
    opacity: 0.92
  },
  heroMeta: {
    color: palette.surface,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700",
    opacity: 0.94
  },
  decisionCard: {
    borderRadius: radii.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    padding: spacing.lg,
    gap: spacing.xs
  },
  shortlistWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.xs
  },
  shortlistButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.elevated,
    paddingHorizontal: spacing.md,
    paddingVertical: 8
  },
  shortlistButtonSaved: {
    borderColor: palette.palm,
    backgroundColor: palette.palm
  },
  shortlistButtonText: {
    color: palette.palm,
    fontSize: 12,
    fontWeight: "800"
  },
  shortlistButtonTextSaved: {
    color: palette.surface
  },
  cardEyebrow: {
    color: palette.clay,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  price: {
    color: palette.ink,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900"
  },
  offerPrice: {
    color: palette.ink,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  priceMeta: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22
  },
  priceMetaStrong: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "700"
  },
  privacyNote: {
    color: palette.dusk,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600"
  },
  section: {
    borderRadius: radii.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    padding: spacing.lg,
    gap: spacing.sm
  },
  sectionTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  pillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  bodyStrong: {
    color: palette.ink,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800"
  },
  bodyText: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22
  },
  bulletText: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22
  },
  groupCard: {
    borderRadius: radii.sm,
    backgroundColor: palette.elevated,
    padding: spacing.md,
    gap: 6
  },
  infoCard: {
    borderRadius: radii.sm,
    backgroundColor: palette.elevated,
    padding: spacing.md,
    gap: spacing.xs
  },
  groupTitle: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800"
  },
  groupNote: {
    color: palette.palmSoft,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600"
  },
  metaLabel: {
    color: palette.clay,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  detailGrid: {
    gap: spacing.sm
  },
  detailCard: {
    flex: 1,
    borderRadius: radii.sm,
    backgroundColor: palette.elevated,
    padding: spacing.md,
    gap: spacing.xs
  },
  detailValue: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700"
  },
  hostCard: {
    borderRadius: radii.lg,
    backgroundColor: palette.palm,
    padding: spacing.lg,
    gap: spacing.xs
  },
  hostLabel: {
    color: palette.sand,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  hostTitle: {
    color: palette.surface,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  hostCopy: {
    color: palette.surface,
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.92
  },
  hostRole: {
    color: palette.sand,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  },
  hostNote: {
    color: palette.surface,
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.82
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: radii.pill,
    backgroundColor: palette.clay,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "space-between"
  },
  primaryButtonText: {
    color: palette.surface,
    fontSize: 15,
    fontWeight: "800"
  },
  buttonPressed: {
    opacity: 0.94
  },
  emptyTitle: {
    color: palette.ink,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900"
  },
  emptyCopy: {
    color: palette.inkSoft,
    fontSize: 15,
    lineHeight: 23
  }
});
