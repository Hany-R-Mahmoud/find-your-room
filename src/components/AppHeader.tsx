import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { backIconFor, rowDirectionFor, textAlignFor, useTranslations } from "@/i18n";
import { useColors } from "@/ui/ThemeContext";
import { palette, radii, spacing } from "@/ui/theme";

type AppHeaderProps = {
  showBack?: boolean;
};

export function AppHeader({ showBack = false }: AppHeaderProps) {
  const { isRTL, t, toggleLocale } = useTranslations<{ appName: string; brandTag: string; languageToggle: { label: string; short: string } }>("common");
  const colors = useColors();

  return (
    <View style={[styles.row, { flexDirection: rowDirectionFor(isRTL), borderBottomColor: colors.line }]}>
      <View style={[styles.leading, { flexDirection: rowDirectionFor(isRTL) }]}>
        {showBack ? (
          <Pressable accessibilityLabel={t("actions.back")} onPress={() => router.back()} style={[styles.backButton, { borderColor: colors.line, backgroundColor: colors.surface }]}>
            <MaterialIcons color={colors.ink} name={backIconFor(isRTL)} size={18} />
          </Pressable>
        ) : null}

        <View style={styles.brandWrap}>
          <Text style={[styles.brand, { textAlign: textAlignFor(isRTL), color: colors.palm }]}>{t("appName")}</Text>
          <Text style={[styles.tag, { textAlign: textAlignFor(isRTL), color: colors.inkSoft }]}>{t("brandTag")}</Text>
        </View>
      </View>

      <Pressable accessibilityLabel={t("languageToggle.label")} onPress={toggleLocale} style={[styles.localeButton, { flexDirection: rowDirectionFor(isRTL), borderColor: colors.line, backgroundColor: colors.surface }]}>
        <MaterialIcons color={colors.palm} name="language" size={18} />
        <Text style={[styles.localeText, { color: colors.palm }]}>{t("languageToggle.short")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    borderBottomWidth: 1,
    paddingBottom: spacing.md
  },
  leading: {
    flex: 1,
    alignItems: "center",
    gap: spacing.sm
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: radii.sm,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  brandWrap: {
    flex: 1,
    gap: 2
  },
  brand: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  tag: {
    fontSize: 12,
    fontWeight: "600"
  },
  localeButton: {
    alignItems: "center",
    gap: 8,
    borderRadius: radii.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 10
  },
  localeText: {
    fontSize: 12,
    fontWeight: "900"
  }
});