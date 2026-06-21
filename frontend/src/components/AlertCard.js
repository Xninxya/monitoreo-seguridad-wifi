// src/components/AlertCard.js
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Card from "./Card";
import StatusBadge from "./StatusBadge";

const TIPO_LABEL = {
  arp_spoofing: "Posible ARP Spoofing",
  dispositivo_nuevo: "Dispositivo nuevo detectado",
  otro: "Evento de red",
};

export default function AlertCard({ alerta, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View style={styles.row}>
          <Text style={styles.title}>{TIPO_LABEL[alerta.tipo] || alerta.tipo}</Text>
          <StatusBadge status={alerta.notificada ? "conocido" : "sospechoso"} />
        </View>
        <Text style={styles.line}>{alerta.fecha_hora}</Text>
        <Text style={styles.line} numberOfLines={2}>
          {alerta.descripcion}
        </Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  title: { fontSize: 15, fontWeight: "700", color: "#1F2937", flexShrink: 1, marginRight: 8 },
  line: { fontSize: 13, color: "#4B5563", marginTop: 2 },
});
