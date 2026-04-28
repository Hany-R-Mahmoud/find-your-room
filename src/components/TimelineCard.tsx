import { StyleSheet, Text, View } from "react-native";

import { rowDirectionFor, textAlignFor, useLocale } from "@/i18n";
import type { StayMilestone } from "@/data/find-your-room";
import { useColors } from "@/ui/ThemeContext";
import { spacing, radii } from "@/ui/theme";

type TimelineCardProps = {
  item: StayMilestone;
};

export function TimelineCard({ item }: TimelineCardProps) {
  const { isRTL } = useLocale();
  const colors = useColors();
  const markerColor =
    item.state === "done" ? colors.success : item.state === "current" ? colors.amber : colors.line;

  return (
    <View style={[styles(colors).row, { flexDirection: rowDirectionFor(isRTL) }]}>
      <View style={[styles(colors).marker, { backgroundColor: markerColor }]} />
      <View
        style={[
          styles(colors).card,
          item.state === "current" && styles(colors).cardCurrent,
          item.state === "done" && styles(colors).cardDone
        ]}
      >
        <Text style={[styles(colors).title, { textAlign: textAlignFor(isRTL) }]}>{item.title}</Text>
        <Text style={[styles(colors).description, { textAlign: textAlignFor(isRTL) }]}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "stretch",
      gap: spacing.md
    },
    marker: {
      width: 12,
      borderRadius: radii.pill
    },
    card: {
      flex: 1,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.line,
      backgroundColor: colors.surface,
      padding: spacing.md,
      gap: 6
    },
    cardCurrent: {
      borderColor: colors.amber,
      backgroundColor: colors.amberSoft
    },
    cardDone: {
      borderColor: colors.mistStrong,
      backgroundColor: colors.mist
    },
    title: {
      color: colors.ink,
      fontSize: 15,
      fontWeight: "800"
    },
    description: {
      color: colors.inkSoft,
      fontSize: 13,
      lineHeight: 20
    }
  });