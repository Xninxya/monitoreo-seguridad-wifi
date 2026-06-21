// src/views/DashboardScreen.js
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import PrimaryButton from "../components/PrimaryButton";
import AlertCard from "../components/AlertCard";
import useDashboard from "../viewmodels/useDashboard";

export default function DashboardScreen({ navigation }) {
  const { summary, scanning, escanear } = useDashboard();

  if (!summary) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const { red, totalDispositivos, sospechosos, alertasRecientes } = summary;

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <Text style={styles.ssid}>{red?.ssid || "Sin red conectada"}</Text>
          <StatusBadge status={red?.estado_seguridad || "en_revision"} />

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{totalDispositivos}</Text>
              <Text style={styles.statLabel}>Dispositivos</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statNumber, sospechosos > 0 && styles.statDanger]}>
                {sospechosos}
              </Text>
              <Text style={styles.statLabel}>Sospechosos</Text>
            </View>
          </View>

          <PrimaryButton
            title={scanning ? "Escaneando..." : "Escanear red"}
            onPress={escanear}
            loading={scanning}
          />
        </Card>

        <View style={styles.actions}>
          <PrimaryButton
            title="Ver dispositivos"
            variant="outline"
            onPress={() => navigation.navigate("Dispositivos")}
          />
          <View style={{ height: 10 }} />
          <PrimaryButton
            title="Ver historial de alertas"
            variant="outline"
            onPress={() => navigation.navigate("Alertas")}
          />
          <View style={{ height: 10 }} />
          <PrimaryButton
            title="Configuración"
            variant="outline"
            onPress={() => navigation.navigate("Configuracion")}
          />
        </View>

        <Text style={styles.sectionTitle}>Alertas recientes</Text>
        {alertasRecientes.length === 0 ? (
          <Text style={styles.empty}>No hay alertas registradas todavía.</Text>
        ) : (
          alertasRecientes.map((a) => (
            <AlertCard
              key={a.id_alerta}
              alerta={a}
              onPress={() => navigation.navigate("AlertaDetalle", { id: a.id_alerta })}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  content: { padding: 16 },
  ssid: { fontSize: 18, fontWeight: "700", color: "#1F2937", marginBottom: 6 },
  statsRow: { flexDirection: "row", marginVertical: 14 },
  stat: { flex: 1, alignItems: "center" },
  statNumber: { fontSize: 24, fontWeight: "800", color: "#1F2937" },
  statDanger: { color: "#C00000" },
  statLabel: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  actions: { marginVertical: 16 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: "#1F2937", marginBottom: 10 },
  empty: { color: "#6B7280", fontSize: 13 },
});
