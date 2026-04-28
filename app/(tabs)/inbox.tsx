import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { useFindYourRoomData } from "@/data/find-your-room";
import { rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { useColors } from "@/ui/ThemeContext";
import { spacing, radii } from "@/ui/theme";

export default function InboxScreen() {
  const { conversations } = useFindYourRoomData();
  const { isRTL, t } = useTranslations<{
    eyebrow: string;
    title: string;
    caption: string;
    support: { title: string; copy: string };
  }>("inbox");
  const { t: tc } = useTranslations<{ status: Record<string, string> }>("common");
  const colors = useColors();

  return (
    <Screen>
      <AppHeader />
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        caption={t("caption")}
      />

      <View style={styles(colors).stack}>
        {conversations.map((conversation) => (
          <View key={conversation.id} style={styles(colors).card}>
            <View style={[styles(colors).row, { flexDirection: rowDirectionFor(isRTL) }]}>
              <View style={styles(colors).cardBody}>
                <Text style={[styles(colors).name, { textAlign: textAlignFor(isRTL) }]}>{conversation.name}</Text>
                <Text style={[styles(colors).role, { textAlign: textAlignFor(isRTL) }]}>{conversation.role}</Text>
              </View>
              <View style={[styles(colors).cardMeta, { alignItems: isRTL ? "flex-start" : "flex-end" }]}>
                <Text style={[styles(colors).time, { textAlign: textAlignFor(isRTL) }]}>{conversation.time}</Text>
                {conversation.unread ? <Pill label={tc("status.new")} tone="accent" /> : null}
              </View>
            </View>
            <Text style={[styles(colors).snippet, { textAlign: textAlignFor(isRTL) }]}>{conversation.snippet}</Text>
          </View>
        ))}
      </View>

      <View style={styles(colors).supportCard}>
        <Text style={[styles(colors).supportTitle, { textAlign: textAlignFor(isRTL) }]}>{t("support.title")}</Text>
        <Text style={[styles(colors).supportCopy, { textAlign: textAlignFor(isRTL) }]}>{t("support.copy")}</Text>
      </View>
    </Screen>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    stack: {
      gap: spacing.md
    },
    card: {
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.line,
      backgroundColor: colors.surface,
      padding: spacing.lg,
      gap: spacing.sm,
      overflow: "hidden"
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
      color: colors.ink,
      fontSize: 17,
      fontWeight: "900"
    },
    role: {
      color: colors.palmSoft,
      fontSize: 12,
      fontWeight: "700"
    },
    time: {
      color: colors.inkSoft,
      fontSize: 12,
      fontWeight: "700"
    },
    snippet: {
      color: colors.inkSoft,
      fontSize: 14,
      lineHeight: 22
    },
    supportCard: {
      borderRadius: radii.lg,
      backgroundColor: colors.rose,
      padding: spacing.lg,
      gap: spacing.sm
    },
    supportTitle: {
      color: colors.clay,
      fontSize: 22,
      lineHeight: 28,
      fontWeight: "900"
    },
    supportCopy: {
      color: colors.ink,
      fontSize: 14,
      lineHeight: 22
    }
  });