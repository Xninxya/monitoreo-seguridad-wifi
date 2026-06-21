// src/views/DispositivosScreen.js
import React from "react";
import { FlatList, StyleSheet, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DeviceCard from "../components/DeviceCard";
import useDispositivos from "../viewmodels/useDispositivos";

export default function DispositivosScreen() {
  const { dispositivos, marcar } = useDispositivos();

  const onPressDevice = (device) => {
    Alert.alert(
      device.hostname || device.mac_address,
      "¿Cómo quieres marcar este dispositivo?",
      [
        { text: "Conocido", onPress: () => marcar(device.id_dispositivo, "conocido") },
        { text: "Sospechoso", onPress: () => marcar(device.id_dispositivo, "sospechoso") },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <FlatList
        data={dispositivos}
        keyExtractor={(item) => String(item.id_dispositivo)}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <DeviceCard device={item} onPress={() => onPressDevice(item)} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No se han detectado dispositivos.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },
  content: { padding: 16, flexGrow: 1 },
  empty: { color: "#6B7280", textAlign: "center", marginTop: 40 },
});
