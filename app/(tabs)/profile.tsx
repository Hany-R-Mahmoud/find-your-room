import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { useFindYourRoomData } from "@/data/find-your-room";
import { rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { palette, radii, spacing } from "@/ui/theme";

export default function ProfileScreen() {
  const { profilePreferences, verificationChecklist } = useFindYourRoomData();
  const { isRTL, t } = useTranslations<{
    eyebrow: string;
    title: string;
    caption: string;
    cards: { verification: string; preferences: string };
    hostMode: { label: string; title: string; copy: string };
  }>("profile");
  const { t: tc } = useTranslations<{ status: Record<string, string> }>("common");

  return (
    <Screen>
      <AppHeader />
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        caption={t("caption")}
      />

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { textAlign: textAlignFor(isRTL) }]}>{t("cards.verification")}</Text>
        <View style={styles.stack}>
          {verificationChecklist.map((item) => (
            <View key={item.label} style={[styles.row, { flexDirection: rowDirectionFor(isRTL) }]}>
              <Text style={[styles.rowLabel, { textAlign: textAlignFor(isRTL) }]}>{item.label}</Text>
              <Pill
                label={tc(`status.${item.stateKey}`)}
                tone={item.stateKey === "complete" ? "verified" : item.stateKey === "needed" ? "accent" : "quiet"}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { textAlign: textAlignFor(isRTL) }]}>{t("cards.preferences")}</Text>
        <View style={styles.stack}>
          {profilePreferences.map((item) => (
            <View key={item.label} style={styles.preferenceRow}>
              <Text style={[styles.preferenceLabel, { textAlign: textAlignFor(isRTL) }]}>{item.label}</Text>
              <Text style={[styles.preferenceValue, { textAlign: textAlignFor(isRTL) }]}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.hostModeCard}>
        <Text style={[styles.hostModeLabel, { textAlign: textAlignFor(isRTL) }]}>{t("hostMode.label")}</Text>
        <Text style={[styles.hostModeTitle, { textAlign: textAlignFor(isRTL) }]}>{t("hostMode.title")}</Text>
        <Text style={[styles.hostModeCopy, { textAlign: textAlignFor(isRTL) }]}>{t("hostMode.copy")}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: spacing.lg,
    gap: spacing.md
  },
  cardTitle: {
    color: palette.ink,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "900"
  },
  stack: {
    gap: spacing.sm
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md
  },
  rowLabel: {
    flex: 1,
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 21
  },
  preferenceRow: {
    gap: 4
  },
  preferenceLabel: {
    color: palette.clay,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase"
  },
  preferenceValue: {
    color: palette.ink,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700"
  },
  hostModeCard: {
    borderRadius: radii.lg,
    backgroundColor: palette.sand,
    padding: spacing.lg,
    gap: spacing.xs
  },
  hostModeLabel: {
    color: palette.palmSoft,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  hostModeTitle: {
    color: palette.ink,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  hostModeCopy: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22
  }
});
