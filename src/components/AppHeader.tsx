import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { backIconFor, rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { palette, radii, spacing } from "@/ui/theme";

type AppHeaderProps = {
  showBack?: boolean;
};

export function AppHeader({ showBack = false }: AppHeaderProps) {
  const { isRTL, t, toggleLocale } = useTranslations<{ appName: string; brandTag: string; languageToggle: { label: string; short: string } }>("common");

  return (
    <View style={[styles.row, { flexDirection: rowDirectionFor(isRTL) }]}>
      <View style={[styles.leading, { flexDirection: rowDirectionFor(isRTL) }]}>
        {showBack ? (
          <Pressable accessibilityLabel={t("actions.back")} onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons color={palette.ink} name={backIconFor(isRTL)} size={18} />
          </Pressable>
        ) : null}

        <View style={styles.brandWrap}>
          <Text style={[styles.brand, { textAlign: textAlignFor(isRTL) }]}>{t("appName")}</Text>
          <Text style={[styles.tag, { textAlign: textAlignFor(isRTL) }]}>{t("brandTag")}</Text>
        </View>
      </View>

      <Pressable onPress={toggleLocale} style={[styles.localeButton, { flexDirection: rowDirectionFor(isRTL) }]}>
        <MaterialIcons color={palette.palm} name="language" size={18} />
        <Text style={styles.localeText}>{t("languageToggle.short")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  leading: {
    flex: 1,
    alignItems: "center",
    gap: spacing.sm
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    alignItems: "center",
    justifyContent: "center"
  },
  brandWrap: {
    flex: 1,
    gap: 2
  },
  brand: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  tag: {
    color: palette.inkSoft,
    fontSize: 12,
    fontWeight: "600"
  },
  localeButton: {
    alignItems: "center",
    gap: 8,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 10
  },
  localeText: {
    color: palette.palm,
    fontSize: 12,
    fontWeight: "900"
  }
});

