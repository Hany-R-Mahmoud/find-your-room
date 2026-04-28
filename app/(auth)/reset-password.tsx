import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Screen } from "@/components/Screen";
import { PasswordInput } from "@/auth/components/PasswordInput";
import { useAuth } from "@/auth/useAuth";
import { isPasswordValid } from "@/auth/passwordPolicy";
import { useColors } from "@/ui/ThemeContext";
import { radii, spacing } from "@/ui/theme";

export default function ResetPasswordScreen() {
  const { resetPassword, isLoading } = useAuth();
  const { token } = useLocalSearchParams<{ token?: string }>();
  const colors = useColors();
  const styles = getStyles(colors);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async () => {
    if (!token) {
      setPasswordError("Invalid reset link");
      return;
    }

    if (!isPasswordValid(newPassword)) {
      setPasswordError("Password does not meet all requirements");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ resetToken: token, newPassword });
      setSuccess(true);
    } catch {
      setPasswordError("Failed to reset password. Please try again.");
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (passwordError) setPasswordError("");
  };

  if (success) {
    return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Password Reset</Text>
            <Text style={styles.subtitle}>
              Your password has been reset successfully
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
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your new password
          </Text>
        </View>

        <View style={styles.form}>
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              if (passwordError) setPasswordError("");
            }}
            placeholder="Enter new password"
            showRequirements
            error={newPassword.length > 0 && !isPasswordValid(newPassword) ? passwordError : undefined}
          />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[
                styles.input,
                confirmPassword.length > 0 && newPassword !== confirmPassword
                  ? styles.inputBorderError
                  : null
              ]}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              placeholder="Confirm new password"
              placeholderTextColor={colors.dusk}
              secureTextEntry
              autoComplete="password-new"
            />
          </View>

          {passwordError && newPassword.length > 0 ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Text>
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
  inputBorderError: {
    borderColor: colors.rose
  },
  errorText: {
    fontSize: 12,
    color: colors.rose
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
