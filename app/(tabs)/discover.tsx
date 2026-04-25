import { router } from "expo-router";
import { ImageBackground, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { ListingCard } from "@/components/ListingCard";
import { Pill } from "@/components/Pill";
import { SectionHeader } from "@/components/SectionHeader";
import { useRoomMatchData } from "@/data/roommatch";
import { rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { layout, palette, radii, spacing } from "@/ui/theme";

export default function DiscoverScreen() {
  const { discoverFilters, heroMetrics, listings, discoverVisual } = useRoomMatchData();
  const { isRTL, t } = useTranslations<{
    eyebrow: string;
    title: string;
    caption: string;
    segments: { rooms: string; people: string };
    banner: { title: string; copy: string };
    feedNote: string;
  }>("discover");

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id}
        renderItem={({ item }) => (
          <ListingCard listing={item} onPress={() => router.push(`/room/${item.id}`)} />
        )}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
        style={styles.list}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={[styles.headerContent, { direction: isRTL ? "rtl" : "ltr" }]}>
            <AppHeader />
            <SectionHeader eyebrow={t("eyebrow")} title={t("title")} caption={t("caption")} />

            <View style={styles.summaryCard}>
              <View style={[styles.segmentedRow, { flexDirection: rowDirectionFor(isRTL) }]}>
                <Pill label={t("segments.rooms")} tone="accent" />
                <Pill label={t("segments.people")} tone="quiet" />
              </View>

              <View style={styles.metricRow}>
                {heroMetrics.map((metric) => (
                  <View key={metric.label} style={styles.metricMiniCard}>
                    <Text style={styles.metricMiniValue}>{metric.value}</Text>
                    <Text style={styles.metricMiniLabel}>{metric.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <ImageBackground imageStyle={styles.bannerImage} source={{ uri: discoverVisual.uri }} style={styles.bannerCard}>
              <View style={styles.bannerOverlay}>
                <Text style={[styles.bannerTitle, { textAlign: textAlignFor(isRTL) }]}>{t("banner.title")}</Text>
                <Text style={[styles.bannerCopy, { textAlign: textAlignFor(isRTL) }]}>{t("banner.copy")}</Text>
              </View>
            </ImageBackground>

            <View style={styles.filterWrap}>
              {discoverFilters.map((filter) => (
                <Pill key={filter.id} label={filter.label} tone={filter.tone} />
              ))}
            </View>

            <Text style={[styles.feedNote, { textAlign: textAlignFor(isRTL) }]}>{t("feedNote")}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.canvas
  },
  list: {
    flex: 1
  },
  content: {
    paddingHorizontal: layout.pagePadding,
    paddingTop: 12,
    paddingBottom: layout.sectionGap * 2
  },
  headerContent: {
    gap: layout.sectionGap,
    marginBottom: spacing.lg
  },
  separator: {
    height: spacing.lg
  },
  summaryCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: spacing.lg,
    gap: spacing.md
  },
  segmentedRow: {
    gap: spacing.xs
  },
  metricRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  metricMiniCard: {
    minWidth: 98,
    borderRadius: radii.md,
    backgroundColor: palette.elevated,
    padding: spacing.md
  },
  metricMiniValue: {
    color: palette.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  metricMiniLabel: {
    marginTop: 4,
    color: palette.inkSoft,
    fontSize: 12,
    fontWeight: "700"
  },
  filterWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  feedNote: {
    color: palette.dusk,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600"
  },
  bannerCard: {
    minHeight: 180,
    overflow: "hidden",
    borderRadius: radii.lg
  },
  bannerImage: {
    borderRadius: radii.lg
  },
  bannerOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(23, 35, 32, 0.25)",
    padding: spacing.lg,
    gap: spacing.xs
  },
  bannerTitle: {
    color: palette.surface,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  bannerCopy: {
    color: palette.surface,
    fontSize: 14,
    lineHeight: 21
  }
});
