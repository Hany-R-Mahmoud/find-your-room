import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { useTranslations } from "@/i18n";
import { AuthGuard } from "@/auth/AuthGuard";
import { palette } from "@/ui/theme";

const icons = {
  discover: "search",
  matches: "favorite-border",
  inbox: "chat-bubble-outline",
  stay: "fact-check",
  profile: "person-outline"
} as const;

export default function TabsLayout() {
  const { t } = useTranslations<{ tabs: Record<string, string> }>("common");

  return (
    <AuthGuard>
      <Tabs
        initialRouteName="discover"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: palette.palm,
          tabBarInactiveTintColor: palette.inkSoft,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700"
          },
          tabBarStyle: {
            backgroundColor: palette.surface,
            borderTopColor: palette.line,
            height: 72,
            paddingTop: 8,
            paddingBottom: 16
          },
          tabBarItemStyle: {
            borderRadius: 4,
            marginHorizontal: 4,
            marginVertical: 6
          },
          tabBarIcon: ({ color, size }) => {
            const name = icons[route.name as keyof typeof icons];
            return <MaterialIcons color={color} name={name} size={size} />;
          }
        })}
      >
        <Tabs.Screen name="discover" options={{ title: t("tabs.discover") }} />
        <Tabs.Screen name="matches" options={{ title: t("tabs.matches") }} />
        <Tabs.Screen name="inbox" options={{ title: t("tabs.inbox") }} />
        <Tabs.Screen name="stay" options={{ title: t("tabs.stay") }} />
        <Tabs.Screen name="profile" options={{ title: t("tabs.profile") }} />
      </Tabs>
    </AuthGuard>
  );
}
