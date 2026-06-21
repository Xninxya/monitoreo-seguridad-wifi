// src/components/StatusBadge.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PALETTE = {
  seguro: { bg: "#E2EFDA", text: "#375623" },
  conocido: { bg: "#E2EFDA", text: "#375623" },
  en_revision: { bg: "#FFF2CC", text: "#7F6000" },
  desconocido: { bg: "#FFF2CC", text: "#7F6000" },
  inseguro: { bg: "#FCE4E4", text: "#C00000" },
  sospechoso: { bg: "#FCE4E4", text: "#C00000" },
};

const LABELS = {
  seguro: "Seguro",
  conocido: "Conocido",
  en_revision: "En revisión",
  desconocido: "Desconocido",
  inseguro: "Inseguro",
  sospechoso: "Sospechoso",
};

export default function StatusBadge({ status }) {
  const palette = PALETTE[status] || PALETTE.en_revision;
  return (
    <View style={[styles.badge, { backgroundColor: palette.bg }]}>
      <Text style={[styles.text, { color: palette.text }]}>{LABELS[status] || status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: { fontSize: 12, fontWeight: "600" },
});
