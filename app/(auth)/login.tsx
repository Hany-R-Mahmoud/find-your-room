import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { Screen } from "@/components/Screen";
import { useAuth } from "@/auth/useAuth";
import { useLocale } from "@/i18n";
import { useColors } from "@/ui/ThemeContext";
import { radii, spacing } from "@/ui/theme";

export default function LoginScreen() {
  const { login, isLoading, error, clearError } = useAuth();
  const { isRTL } = useLocale();
  const colors = useColors();
  const styles = getStyles(colors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      await login({ email, password });
      router.replace("/(tabs)/discover");
    } catch (err) {
      Alert.alert("Login Failed", error?.message || "An error occurred");
      clearError();
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to find your room</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.dusk}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={colors.dusk}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <Pressable
            onPress={() => router.push("/(auth)/forgot-password")}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </Pressable>

          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? "Signing in..." : "Sign In"}</Text>
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push("/(auth)/signup")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const getStyles = (colors: ReturnType<typeof useColors>) => StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.ink,
    marginBottom: spacing.xs
  },
  subtitle: {
    fontSize: 16,
    color: colors.inkSoft
  },
  form: {
    gap: spacing.lg
  },
  inputGroup: {
    gap: spacing.xs
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.ink
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.ink,
    backgroundColor: colors.surface
  },
  forgotPassword: {
    alignSelf: "flex-end"
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.clay,
    fontWeight: "600"
  },
  button: {
    height: 52,
    backgroundColor: colors.clay,
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md
  },
  buttonPressed: {
    opacity: 0.88
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.surface
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg
  },
  signupText: {
    fontSize: 14,
    color: colors.inkSoft
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.clay
  }
});
