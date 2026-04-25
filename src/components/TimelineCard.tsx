import { StyleSheet, Text, View } from "react-native";

import { rowDirectionFor, textAlignFor, useLocale } from "@/i18n";
import type { StayMilestone } from "@/data/roommatch";
import { palette, radii, spacing } from "@/ui/theme";

type TimelineCardProps = {
  item: StayMilestone;
};

export function TimelineCard({ item }: TimelineCardProps) {
  const { isRTL } = useLocale();
  const markerColor =
    item.state === "done" ? palette.success : item.state === "current" ? palette.clay : palette.line;

  return (
    <View style={[styles.row, { flexDirection: rowDirectionFor(isRTL) }]}>
      <View style={[styles.marker, { backgroundColor: markerColor }]} />
      <View
        style={[
          styles.card,
          item.state === "current" && styles.cardCurrent,
          item.state === "done" && styles.cardDone
        ]}
      >
        <Text style={[styles.title, { textAlign: textAlignFor(isRTL) }]}>{item.title}</Text>
        <Text style={[styles.description, { textAlign: textAlignFor(isRTL) }]}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: palette.line,
    backgroundColor: palette.surface,
    padding: spacing.md,
    gap: 6
  },
  cardCurrent: {
    borderColor: palette.clay,
    backgroundColor: "#fff5f0"
  },
  cardDone: {
    borderColor: "#bcd1c6",
    backgroundColor: palette.mist
  },
  title: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  description: {
    color: palette.inkSoft,
    fontSize: 13,
    lineHeight: 20
  }
});
