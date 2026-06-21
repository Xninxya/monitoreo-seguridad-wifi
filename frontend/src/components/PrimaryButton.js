// src/components/PrimaryButton.js
import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  variant = "primary",
  disabled = false,
}) {
  const isOutline = variant === "outline";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.solid,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? "#2E75B6" : "#fff"} />
      ) : (
        <Text style={[styles.text, isOutline && styles.textOutline]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  solid: { backgroundColor: "#2E75B6" },
  outline: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: "#2E75B6" },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
  text: { color: "#fff", fontWeight: "700", fontSize: 15 },
  textOutline: { color: "#2E75B6" },
});
