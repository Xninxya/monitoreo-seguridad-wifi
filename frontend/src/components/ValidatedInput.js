// src/components/ValidatedInput.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function ValidatedInput({
  label,
  value,
  onChangeText,
  error,
  keyboardType = "default",
  placeholder,
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#111827",
  },
  inputError: { borderColor: "#C00000" },
  error: { color: "#C00000", fontSize: 12, marginTop: 4 },
});
