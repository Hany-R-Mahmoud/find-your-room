import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { Screen } from "@/components/Screen";
import { useAuth } from "@/auth/useAuth";
import { useColors } from "@/ui/ThemeContext";
import { radii, spacing } from "@/ui/theme";

export default function ForgotPasswordScreen() {
  const { forgotPassword, isLoading } = useAuth();
  const colors = useColors();
  const styles = getStyles(colors);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      await forgotPassword({ email });
      setSubmitted(true);
    } catch (err) {
      Alert.alert("Error", "Failed to send reset email. Please try again.");
    }
  };

  if (submitted) {
    return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Check Your Email</Text>
            <Text style={styles.subtitle}>
              We've sent password reset instructions to {email}
            </Text>
          </View>

          <Pressable
            onPress={() => router.replace("/(auth)/login")}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>Back to Login</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you instructions to reset your password
          </Text>
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

          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>{isLoading ? "Sending..." : "Send Reset Link"}</Text>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back to Login</Text>
          </Pressable>
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
  backButton: {
    alignItems: "center",
    marginTop: spacing.lg
  },
  backButtonText: {
    fontSize: 14,
    color: colors.clay,
    fontWeight: "600"
  }
});
