import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { useFindYourRoomData } from "@/data/find-your-room";
import { forwardIconFor, rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { palette, radii, spacing } from "@/ui/theme";

export default function OnboardingScreen() {
  const { onboardingCards } = useFindYourRoomData();
  const { isRTL, t } = useTranslations<{
    pill: string;
    eyebrow: string;
    title: string;
    caption: string;
    choices: { room: string; roommate: string; both: string };
    signal: { title: string; line1: string; line2: string; line3: string };
    button: string;
  }>("onboarding");

  return (
    <Screen>
      <AppHeader showBack />

      <View style={[styles.headerRow, { flexDirection: rowDirectionFor(isRTL) }]}>
        <View />
        <Pill label={t("pill")} tone="verified" />
      </View>

      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        caption={t("caption")}
      />

      <View style={[styles.choiceRow, { flexDirection: rowDirectionFor(isRTL) }]}>
        <Pill label={t("choices.room")} tone="accent" />
        <Pill label={t("choices.roommate")} tone="quiet" />
        <Pill label={t("choices.both")} tone="quiet" />
      </View>

      <View style={styles.signalCard}>
        <Text style={[styles.signalTitle, { textAlign: textAlignFor(isRTL) }]}>{t("signal.title")}</Text>
        <View style={styles.signalList}>
          <Text style={[styles.signalLine, { textAlign: textAlignFor(isRTL) }]}>{t("signal.line1")}</Text>
          <Text style={[styles.signalLine, { textAlign: textAlignFor(isRTL) }]}>{t("signal.line2")}</Text>
          <Text style={[styles.signalLine, { textAlign: textAlignFor(isRTL) }]}>{t("signal.line3")}</Text>
        </View>
      </View>

      <View style={styles.cardStack}>
        {onboardingCards.map((card, index) => (
          <View key={card.title} style={[styles.featureCard, { flexDirection: rowDirectionFor(isRTL) }]}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepValue}>0{index + 1}</Text>
            </View>
            <View style={styles.featureBody}>
              <Text style={[styles.featureTitle, { textAlign: textAlignFor(isRTL) }]}>{card.title}</Text>
              <Text style={[styles.featureCopy, { textAlign: textAlignFor(isRTL) }]}>{card.body}</Text>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        onPress={() => router.replace("/discover")}
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
  choiceRow: {
    flexWrap: "wrap",
    gap: spacing.xs
  },
  signalCard: {
    borderRadius: radii.lg,
    backgroundColor: palette.palm,
    padding: spacing.lg,
    gap: spacing.sm
  },
  signalTitle: {
    color: palette.surface,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900"
  },
  signalList: {
    gap: 8
  },
  signalLine: {
    color: palette.surface,
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.92
  },
  cardStack: {
    gap: spacing.md
  },
  featureCard: {
    gap: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: spacing.lg
  },
  stepBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.sand,
    alignItems: "center",
    justifyContent: "center"
  },
  stepValue: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  featureBody: {
    flex: 1,
    gap: spacing.xs
  },
  featureTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: "800"
  },
  featureCopy: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22
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
  }
});
