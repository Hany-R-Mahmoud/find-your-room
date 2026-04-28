import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { LocaleProvider } from "@/i18n";
import { ThemeProvider, useColors } from "@/ui/ThemeContext";
import { ShortlistsProvider } from "@/shortlists";
import { AuthProvider } from "@/auth/AuthContext";

function RootContent() {
  const colors = useColors();

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.canvas }}>
      <StatusBar style={colors.theme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.canvas }
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="room/[id]"
          options={{
            animation: "slide_from_right"
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <LocaleProvider>
      <AuthProvider>
        <ThemeProvider>
          <ShortlistsProvider>
            <RootContent />
          </ShortlistsProvider>
        </ThemeProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}