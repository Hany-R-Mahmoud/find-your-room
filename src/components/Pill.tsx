import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { rowDirectionFor, useLocale } from "@/i18n";
import { useColors } from "@/ui/ThemeContext";
import { radii, spacing } from "@/ui/theme";

type Tone =
  | "neutral"
  | "accent"
  | "verified"
  | "quiet"
  | "sourceFindYourRoom"
  | "sourceHost"
  | "sourceLater";

const toneStyles: Record<Tone, { backgroundColor: string; borderColor: string; color: string }> = {
  neutral: {
    backgroundColor: "surface",
    borderColor: "line",
    color: "ink"
  },
  accent: {
    backgroundColor: "amberSoft",
    borderColor: "amber",
    color: "clay"
  },
  verified: {
    backgroundColor: "palm",
    borderColor: "palm",
    color: "surface"
  },
  quiet: {
    backgroundColor: "elevated",
    borderColor: "line",
    color: "ink"
  },
  sourceFindYourRoom: {
    backgroundColor: "mist",
    borderColor: "palm",
    color: "palm"
  },
  sourceHost: {
    backgroundColor: "amberSoft",
    borderColor: "clay",
    color: "clay"
  },
  sourceLater: {
    backgroundColor: "limestone",
    borderColor: "line",
    color: "inkSoft"
  }
};

type PillProps = {
  label: string;
  tone?: Tone;
  icon?: ReactNode;
};

export function Pill({ label, tone = "neutral", icon }: PillProps) {
  const { isRTL } = useLocale();
  const colors = useColors();
  const ts = toneStyles[tone];

  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: colors[ts.backgroundColor as keyof typeof colors],
          borderColor: colors[ts.borderColor as keyof typeof colors],
          flexDirection: rowDirectionFor(isRTL)
        }
      ]}
    >
      {icon}
      <Text style={[styles.text, { color: colors[ts.color as keyof typeof colors] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: radii.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7
  },
  text: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0
  }
});