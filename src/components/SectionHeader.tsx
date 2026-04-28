import { StyleSheet, Text, View } from "react-native";

import { textAlignFor, useLocale } from "@/i18n";
import { useColors } from "@/ui/ThemeContext";
import { spacing } from "@/ui/theme";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  caption?: string;
};

export function SectionHeader({ eyebrow, title, caption }: SectionHeaderProps) {
  const { isRTL } = useLocale();
  const colors = useColors();

  return (
    <View style={styles(colors).wrap}>
      {eyebrow ? <Text style={[styles(colors).eyebrow, { textAlign: textAlignFor(isRTL) }]}>{eyebrow}</Text> : null}
      <Text style={[styles(colors).title, { textAlign: textAlignFor(isRTL) }]}>{title}</Text>
      {caption ? <Text style={[styles(colors).caption, { textAlign: textAlignFor(isRTL) }]}>{caption}</Text> : null}
    </View>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    wrap: {
      gap: spacing.xs
    },
    eyebrow: {
      color: colors.clay,
      fontSize: 12,
      fontWeight: "700",
      letterSpacing: 0,
      textTransform: "uppercase"
    },
    title: {
      color: colors.ink,
      fontSize: 28,
      lineHeight: 34,
      fontWeight: "800"
    },
    caption: {
      color: colors.inkSoft,
      fontSize: 15,
      lineHeight: 22
    }
  });