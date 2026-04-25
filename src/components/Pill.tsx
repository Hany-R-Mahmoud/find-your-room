import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { rowDirectionFor, useLocale } from "@/i18n";
import { palette, radii, spacing } from "@/ui/theme";

type Tone =
  | "neutral"
  | "accent"
  | "verified"
  | "quiet"
  | "sourceRoomMatch"
  | "sourceHost"
  | "sourceLater";

const toneStyles: Record<Tone, { backgroundColor: string; borderColor: string; color: string }> = {
  neutral: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    color: palette.ink
  },
  accent: {
    backgroundColor: palette.rose,
    borderColor: palette.rose,
    color: palette.clay
  },
  verified: {
    backgroundColor: palette.mist,
    borderColor: palette.mistStrong,
    color: palette.palm
  },
  quiet: {
    backgroundColor: palette.sand,
    borderColor: palette.line,
    color: palette.ink
  },
  sourceRoomMatch: {
    backgroundColor: palette.mist,
    borderColor: palette.mistStrong,
    color: palette.palm
  },
  sourceHost: {
    backgroundColor: palette.roseSoft,
    borderColor: palette.rose,
    color: palette.clay
  },
  sourceLater: {
    backgroundColor: palette.surface,
    borderColor: palette.line,
    color: palette.ink
  }
};

type PillProps = {
  label: string;
  tone?: Tone;
  icon?: ReactNode;
};

export function Pill({ label, tone = "neutral", icon }: PillProps) {
  const { isRTL } = useLocale();

  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: toneStyles[tone].backgroundColor,
          borderColor: toneStyles[tone].borderColor,
          flexDirection: rowDirectionFor(isRTL)
        }
      ]}
    >
      {icon}
      <Text style={[styles.text, { color: toneStyles[tone].color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2
  }
});
