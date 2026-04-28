import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { Screen } from "@/components/Screen";
import { PasswordInput } from "@/auth/components/PasswordInput";
import { useAuth } from "@/auth/useAuth";
import { isPasswordValid } from "@/auth/passwordPolicy";
import { useColors } from "@/ui/ThemeContext";
import { radii, spacing } from "@/ui/theme";

export default function SignupScreen() {
  const { signup, isLoading, error, clearError } = useAuth();
  const colors = useColors();
  const styles = getStyles(colors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fieldError, setFieldError] = useState("");

  const validateFields = (): boolean => {
    if (!displayName.trim()) {
      setFieldError("Please enter your name");
      return false;
    }
    if (!email.trim()) {
      setFieldError("Please enter your email");
      return false;
    }
    if (!isPasswordValid(password)) {
      setPasswordError("Password does not meet all requirements");
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    setFieldError("");
    return true;
  };

  const handleSignup = async () => {
    if (!validateFields()) return;

    try {
      await signup({ email, password, displayName: displayName.trim() });
      router.replace("/(tabs)/discover");
    } catch {
      setFieldError("An error occurred. Please try again.");
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (fieldError) setFieldError("");
  };

  const handleDisplayNameChange = (text: string) => {
    setDisplayName(text);
    if (fieldError) setFieldError("");
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (passwordError) setPasswordError("");
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Find Your Room today</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={handleDisplayNameChange}
              placeholder="Enter your name"
              placeholderTextColor={colors.dusk}
              autoComplete="name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Enter your email"
              placeholderTextColor={colors.dusk}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <PasswordInput
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError("");
            }}
            placeholder="Create a password"
            showRequirements
            error={password.length > 0 && !isPasswordValid(password) ? passwordError : undefined}
          />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[
                styles.input,
                confirmPassword.length > 0 && password !== confirmPassword
                  ? styles.inputBorderError
                  : null
              ]}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              placeholderTextColor={colors.dusk}
              secureTextEntry
              autoComplete="password-new"
            />
          </View>

          {fieldError ? (
            <Text style={styles.fieldError}>{fieldError}</Text>
          ) : null}

          <Pressable
            onPress={handleSignup}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Text>
          </Pressable>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.loginLink}>Sign In</Text>
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
  inputBorderError: {
    borderColor: colors.rose
  },
  fieldError: {
    fontSize: 12,
    color: colors.rose,
    marginTop: -spacing.sm
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
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg
  },
  loginText: {
    fontSize: 14,
    color: colors.inkSoft
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.clay
  }
});
