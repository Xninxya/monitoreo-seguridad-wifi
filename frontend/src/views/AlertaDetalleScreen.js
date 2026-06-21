// src/views/AlertaDetalleScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import PrimaryButton from "../components/PrimaryButton";
import useAlertaDetalle from "../viewmodels/useAlertaDetalle";

const TIPO_LABEL = {
  arp_spoofing: "Posible ARP Spoofing",
  dispositivo_nuevo: "Dispositivo nuevo detectado",
  otro: "Evento de red",
};

export default function AlertaDetalleScreen({ route }) {
  const { id } = route.params;
  const { alerta, marcarRevisada } = useAlertaDetalle(id);

  if (!alerta) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <Text style={styles.title}>{TIPO_LABEL[alerta.tipo] || alerta.tipo}</Text>
          <StatusBadge status={alerta.notificada ? "conocido" : "sospechoso"} />
          <Text style={styles.desc}>{alerta.descripcion}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha y hora</Text>
            <Text style={styles.value}>{alerta.fecha_hora}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>IP afectada</Text>
            <Text style={styles.value}>{alerta.ip_afectada}</Text>
          </View>
          {alerta.mac_anterior ? (
            <View style={styles.row}>
              <Text style={styles.label}>MAC anterior</Text>
              <Text style={styles.value}>{alerta.mac_anterior}</Text>
            </View>
          ) : null}
          {alerta.mac_nueva ? (
            <View style={styles.row}>
              <Text style={styles.label}>MAC nueva</Text>
              <Text style={styles.value}>{alerta.mac_nueva}</Text>
            </View>
          ) : null}

          <View style={{ height: 16 }} />
          <PrimaryButton
            title={alerta.notificada ? "Notificación enviada" : "Marcar como revisada"}
            onPress={marcarRevisada}
            disabled={!!alerta.notificada}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  content: { padding: 16 },
  title: { fontSize: 17, fontWeight: "700", color: "#1F2937", marginBottom: 8 },
  desc: { fontSize: 14, color: "#374151", marginVertical: 12, lineHeight: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  label: { color: "#6B7280", fontSize: 13 },
  value: { color: "#1F2937", fontSize: 13, fontWeight: "600" },
});
