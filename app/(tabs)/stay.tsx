import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { TimelineCard } from "@/components/TimelineCard";
import { useFindYourRoomData } from "@/data/find-your-room";
import { textAlignFor, useTranslations } from "@/i18n";
import { palette, radii, spacing } from "@/ui/theme";

export default function StayScreen() {
  const { stayMilestones } = useFindYourRoomData();
  const { isRTL, t } = useTranslations<{
    eyebrow: string;
    title: string;
    caption: string;
    summary: { label: string; title: string; copy: string };
  }>("stay");

  return (
    <Screen>
      <AppHeader />
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        caption={t("caption")}
      />

      <View style={styles.stack}>
        {stayMilestones.map((item) => (
          <TimelineCard key={item.id} item={item} />
        ))}
      </View>

      <View style={styles.summaryCard}>
        <Text style={[styles.summaryLabel, { textAlign: textAlignFor(isRTL) }]}>{t("summary.label")}</Text>
        <Text style={[styles.summaryTitle, { textAlign: textAlignFor(isRTL) }]}>{t("summary.title")}</Text>
        <Text style={[styles.summaryCopy, { textAlign: textAlignFor(isRTL) }]}>{t("summary.copy")}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md
  },
  summaryCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: spacing.lg,
    gap: spacing.xs
  },
  summaryLabel: {
    color: palette.clay,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  summaryTitle: {
    color: palette.ink,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  summaryCopy: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22
  }
});
