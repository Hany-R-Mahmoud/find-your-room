import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Screen } from "@/components/Screen";
import { Pill } from "@/components/Pill";
import { SectionHeader } from "@/components/SectionHeader";
import { useRoomMatchData } from "@/data/roommatch";
import { forwardIconFor, rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { layout, palette, radii, shadows, spacing } from "@/ui/theme";

export default function LandingScreen() {
  const { heroMetrics, landingVisuals } = useRoomMatchData();
  const { isRTL, t } = useTranslations<{
    eyebrow: string;
    title: string;
    caption: string;
    chips: { riyadh: string; rooms: string };
    hero: { title: string; copy: string };
    nowCard: { label: string; title: string; copy: string };
    laterCard: { label: string; title: string; copy: string };
    buttons: { walk: string; open: string };
    visuals: { city: string; home: string };
  }>("landing");

  return (
    <Screen>
      <AppHeader />
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        caption={t("caption")}
      />

      <LinearGradient colors={["#efe2cf", "#2d5148"]} style={styles.hero}>
        <View style={[styles.heroTop, { flexDirection: rowDirectionFor(isRTL) }]}>
          <Pill label={t("chips.riyadh")} tone="quiet" />
          <Pill label={t("chips.rooms")} tone="accent" />
        </View>

        <View style={styles.heroBody}>
          <Text style={[styles.heroTitle, { textAlign: textAlignFor(isRTL) }]}>{t("hero.title")}</Text>
          <Text style={[styles.heroCopy, { textAlign: textAlignFor(isRTL) }]}>
            {t("hero.copy")}
          </Text>
        </View>

        <View style={styles.metricRow}>
          {heroMetrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <View style={[styles.visualRow, { flexDirection: rowDirectionFor(isRTL) }]}>
        {landingVisuals.map((visual, index) => (
          <ImageBackground key={visual.id} imageStyle={styles.visualImage} source={{ uri: visual.uri }} style={[styles.visualCard, index === 0 ? styles.visualTall : styles.visualShort]}>
            <LinearGradient colors={["rgba(17, 28, 25, 0.1)", "rgba(17, 28, 25, 0.72)"]} style={styles.visualOverlay}>
              <Text style={[styles.visualLabel, { textAlign: textAlignFor(isRTL) }]}>
                {index === 0 ? t("visuals.city") : t("visuals.home")}
              </Text>
            </LinearGradient>
          </ImageBackground>
        ))}
      </View>

      <View style={styles.dualColumn}>
        <View style={styles.noteCard}>
          <Text style={[styles.noteLabel, { textAlign: textAlignFor(isRTL) }]}>{t("nowCard.label")}</Text>
          <Text style={[styles.noteTitle, { textAlign: textAlignFor(isRTL) }]}>{t("nowCard.title")}</Text>
          <Text style={[styles.noteCopy, { textAlign: textAlignFor(isRTL) }]}>{t("nowCard.copy")}</Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={[styles.noteLabel, { textAlign: textAlignFor(isRTL) }]}>{t("laterCard.label")}</Text>
          <Text style={[styles.noteTitle, { textAlign: textAlignFor(isRTL) }]}>{t("laterCard.title")}</Text>
          <Text style={[styles.noteCopy, { textAlign: textAlignFor(isRTL) }]}>{t("laterCard.copy")}</Text>
        </View>
      </View>

      <View style={styles.actionStack}>
        <Pressable
          onPress={() => router.push("/onboarding")}
          style={({ pressed }) => [styles.primaryButton, { flexDirection: rowDirectionFor(isRTL) }, pressed && styles.buttonPressed]}
        >
          <Text style={styles.primaryButtonText}>{t("buttons.walk")}</Text>
          <MaterialIcons color={palette.surface} name={forwardIconFor(isRTL)} size={20} />
        </Pressable>

        <Pressable onPress={() => router.push("/discover")} style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}>
          <Text style={styles.secondaryButtonText}>{t("buttons.open")}</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.lg,
    ...shadows.card
  },
  heroTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  heroBody: {
    gap: spacing.sm
  },
  heroTitle: {
    color: palette.ink,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
    maxWidth: "85%"
  },
  heroCopy: {
    color: palette.surface,
    fontSize: 15,
    lineHeight: 23,
    maxWidth: "88%",
    opacity: 0.92
  },
  metricRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  metricCard: {
    minWidth: 98,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "rgba(255, 253, 250, 0.86)"
  },
  metricValue: {
    color: palette.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  metricLabel: {
    marginTop: 4,
    color: palette.inkSoft,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700"
  },
  dualColumn: {
    gap: spacing.md
  },
  visualRow: {
    gap: spacing.md
  },
  visualCard: {
    flex: 1,
    minHeight: 170,
    overflow: "hidden",
    borderRadius: radii.lg
  },
  visualTall: {
    minHeight: 200
  },
  visualShort: {
    minHeight: 200
  },
  visualImage: {
    borderRadius: radii.lg
  },
  visualOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.lg
  },
  visualLabel: {
    color: palette.surface,
    fontSize: 18,
    fontWeight: "900"
  },
  noteCard: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: spacing.lg,
    gap: spacing.xs
  },
  noteLabel: {
    color: palette.clay,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  noteTitle: {
    color: palette.ink,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900"
  },
  noteCopy: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22
  },
  actionStack: {
    gap: spacing.sm,
    paddingBottom: layout.pagePadding
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: radii.pill,
    backgroundColor: palette.palm,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "space-between"
  },
  primaryButtonText: {
    color: palette.surface,
    fontSize: 15,
    fontWeight: "800"
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.elevated,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryButtonText: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  buttonPressed: {
    opacity: 0.94
  }
});
