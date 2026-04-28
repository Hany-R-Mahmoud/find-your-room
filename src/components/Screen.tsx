import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocale } from "@/i18n";
import { useColors } from "@/ui/ThemeContext";
import { layout } from "@/ui/theme";

type ScreenProps = PropsWithChildren<{
  contentContainerStyle?: StyleProp<ViewStyle>;
}>;

export function Screen({ children, contentContainerStyle }: ScreenProps) {
  const { isRTL } = useLocale();
  const colors = useColors();

  return (
    <SafeAreaView edges={["top"]} style={[styles.safeArea, { backgroundColor: colors.canvas }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.inner, { direction: isRTL ? "rtl" : "ltr" }]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  content: {
    paddingBottom: layout.sectionGap * 2
  },
  inner: {
    paddingHorizontal: layout.pagePadding,
    paddingTop: 12,
    gap: layout.sectionGap
  }
});