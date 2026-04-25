import { StyleSheet, Text, View } from "react-native";

import { textAlignFor, useLocale } from "@/i18n";
import { palette, spacing } from "@/ui/theme";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  caption?: string;
};

export function SectionHeader({ eyebrow, title, caption }: SectionHeaderProps) {
  const { isRTL } = useLocale();

  return (
    <View style={styles.wrap}>
      {eyebrow ? <Text style={[styles.eyebrow, { textAlign: textAlignFor(isRTL) }]}>{eyebrow}</Text> : null}
      <Text style={[styles.title, { textAlign: textAlignFor(isRTL) }]}>{title}</Text>
      {caption ? <Text style={[styles.caption, { textAlign: textAlignFor(isRTL) }]}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs
  },
  eyebrow: {
    color: palette.clay,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  title: {
    color: palette.ink,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800"
  },
  caption: {
    color: palette.inkSoft,
    fontSize: 15,
    lineHeight: 22
  }
});
