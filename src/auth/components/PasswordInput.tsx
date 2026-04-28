import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  getPasswordStrength,
  PASSWORD_REQUIREMENTS,
  type PasswordStrength
} from "../passwordPolicy";
import { useColors } from "@/ui/ThemeContext";
import { radii, spacing } from "@/ui/theme";

interface PasswordInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showRequirements?: boolean;
  error?: string;
}

export function PasswordInput({
  label = "Password",
  value,
  onChangeText,
  placeholder = "Enter password",
  showRequirements = false,
  error
}: PasswordInputProps) {
  const colors = useColors();
  const [isVisible, setIsVisible] = useState(false);
  const strength = getPasswordStrength(value);
  const strengthConfigByTone: Record<
    PasswordStrength,
    { label: string; color: string; barColor: string }
  > = {
    empty: { label: "", color: colors.line, barColor: "transparent" },
    weak: { label: "Weak", color: colors.rose, barColor: "#e63946" },
    medium: { label: "Medium", color: colors.amber, barColor: colors.amber },
    strong: { label: "Strong", color: colors.success, barColor: colors.success }
  };
  const strengthConfig = strengthConfigByTone[strength];
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.dusk}
          secureTextEntry={!isVisible}
          autoComplete="password-new"
        />
        <Pressable
          onPress={() => setIsVisible((v) => !v)}
          style={styles.toggle}
          hitSlop={8}
        >
          <Ionicons
            name={isVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.inkSoft}
          />
        </Pressable>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {value.length > 0 && strength !== "empty" && (
        <View style={styles.strengthRow}>
          <View style={styles.strengthBar}>
            <View
              style={[
                styles.strengthFill,
                { backgroundColor: strengthConfig.barColor, width: "100%" }
              ]}
            />
          </View>
          <Text style={[styles.strengthLabel, { color: strengthConfig.color }]}>
            {strengthConfig.label}
          </Text>
        </View>
      )}

      {showRequirements && value.length > 0 && (
        <View style={styles.requirements}>
          {PASSWORD_REQUIREMENTS.map((req, i) => {
            const met = req.test(value);
            return (
              <View key={i} style={styles.requirementRow}>
                <Ionicons
                  name={met ? "checkmark-circle" : "ellipse-outline"}
                  size={14}
                  color={met ? colors.success : colors.line}
                />
                <Text
                  style={[
                    styles.requirementText,
                    met ? styles.requirementMet : null
                  ]}
                >
                  {req.label}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const getStyles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: {
      gap: spacing.xs
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.ink
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      height: 52,
      borderWidth: 1,
      borderColor: colors.line,
      borderRadius: radii.md,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.md
    },
    inputError: {
      borderColor: colors.rose
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.ink,
      padding: 0
    },
    toggle: {
      padding: spacing.xs
    },
    errorText: {
      fontSize: 12,
      color: colors.rose,
      marginTop: -spacing.xs
    },
    strengthRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm
    },
    strengthBar: {
      flex: 1,
      height: 3,
      borderRadius: 2,
      backgroundColor: colors.limestone,
      overflow: "hidden"
    },
    strengthFill: {
      height: "100%",
      borderRadius: 2
    },
    strengthLabel: {
      fontSize: 12,
      fontWeight: "600",
      width: 52,
      textAlign: "right"
    },
    requirements: {
      gap: spacing.xs,
      paddingTop: spacing.xs
    },
    requirementRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm
    },
    requirementText: {
      fontSize: 12,
      color: colors.inkSoft
    },
    requirementMet: {
      color: colors.success,
      textDecorationLine: "line-through",
      textDecorationStyle: "solid"
    }
  });
