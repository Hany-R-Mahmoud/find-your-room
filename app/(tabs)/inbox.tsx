import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { useRoomMatchData } from "@/data/roommatch";
import { rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { palette, radii, spacing } from "@/ui/theme";

export default function InboxScreen() {
  const { conversations } = useRoomMatchData();
  const { isRTL, t } = useTranslations<{
    eyebrow: string;
    title: string;
    caption: string;
    support: { title: string; copy: string };
  }>("inbox");
  const { t: tc } = useTranslations<{ status: Record<string, string> }>("common");

  return (
    <Screen>
      <AppHeader />
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        caption={t("caption")}
      />

      <View style={styles.stack}>
        {conversations.map((conversation) => (
          <View key={conversation.id} style={styles.card}>
            <View style={[styles.row, { flexDirection: rowDirectionFor(isRTL) }]}>
              <View style={styles.cardBody}>
                <Text style={[styles.name, { textAlign: textAlignFor(isRTL) }]}>{conversation.name}</Text>
                <Text style={[styles.role, { textAlign: textAlignFor(isRTL) }]}>{conversation.role}</Text>
              </View>
              <View style={[styles.cardMeta, { alignItems: isRTL ? "flex-start" : "flex-end" }]}>
                <Text style={[styles.time, { textAlign: textAlignFor(isRTL) }]}>{conversation.time}</Text>
                {conversation.unread ? <Pill label={tc("status.new")} tone="accent" /> : null}
              </View>
            </View>
            <Text style={[styles.snippet, { textAlign: textAlignFor(isRTL) }]}>{conversation.snippet}</Text>
          </View>
        ))}
      </View>

      <View style={styles.supportCard}>
        <Text style={[styles.supportTitle, { textAlign: textAlignFor(isRTL) }]}>{t("support.title")}</Text>
        <Text style={[styles.supportCopy, { textAlign: textAlignFor(isRTL) }]}>{t("support.copy")}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md
  },
  card: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: spacing.lg,
    gap: spacing.sm
  },
  row: {
    justifyContent: "space-between",
    gap: spacing.md
  },
  cardBody: {
    flex: 1,
    gap: 4
  },
  cardMeta: {
    alignItems: "flex-end",
    gap: spacing.xs
  },
  name: {
    color: palette.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  role: {
    color: palette.palmSoft,
    fontSize: 12,
    fontWeight: "700"
  },
  time: {
    color: palette.inkSoft,
    fontSize: 12,
    fontWeight: "700"
  },
  snippet: {
    color: palette.inkSoft,
    fontSize: 14,
    lineHeight: 22
  },
  supportCard: {
    borderRadius: radii.lg,
    backgroundColor: palette.rose,
    padding: spacing.lg,
    gap: spacing.sm
  },
  supportTitle: {
    color: palette.clay,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900"
  },
  supportCopy: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 22
  }
});
