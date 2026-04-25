import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocale } from "@/i18n";
import { layout, palette } from "@/ui/theme";

type ScreenProps = PropsWithChildren<{
  contentContainerStyle?: StyleProp<ViewStyle>;
}>;

export function Screen({ children, contentContainerStyle }: ScreenProps) {
  const { isRTL } = useLocale();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
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
    flex: 1,
    backgroundColor: palette.canvas
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
