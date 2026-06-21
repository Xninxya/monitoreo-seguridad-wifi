// src/components/DeviceCard.js
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Card from "./Card";
import StatusBadge from "./StatusBadge";

export default function DeviceCard({ device, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View style={styles.row}>
          <Text style={styles.title}>{device.hostname || "Dispositivo sin nombre"}</Text>
          <StatusBadge status={device.estado} />
        </View>
        <Text style={styles.line}>IP: {device.ip_address}</Text>
        <Text style={styles.line}>MAC: {device.mac_address}</Text>
        <Text style={styles.line}>Fabricante: {device.fabricante || "Desconocido"}</Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  title: { fontSize: 15, fontWeight: "700", color: "#1F2937", flexShrink: 1, marginRight: 8 },
  line: { fontSize: 13, color: "#4B5563", marginTop: 2 },
});
