import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { LocaleProvider } from "@/i18n";
import { ShortlistsProvider } from "@/shortlists";
import { palette } from "@/ui/theme";

export default function RootLayout() {
  return (
    <LocaleProvider>
      <ShortlistsProvider>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: palette.canvas }}>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: palette.canvas }
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="room/[id]"
              options={{
                animation: "slide_from_right"
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </ShortlistsProvider>
    </LocaleProvider>
  );
}
