// src/views/AlertasScreen.js
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AlertCard from "../components/AlertCard";
import useAlertas from "../viewmodels/useAlertas";

export default function AlertasScreen({ navigation }) {
  const { alertas } = useAlertas();

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <FlatList
        data={alertas}
        keyExtractor={(item) => String(item.id_alerta)}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <AlertCard
            alerta={item}
            onPress={() => navigation.navigate("AlertaDetalle", { id: item.id_alerta })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay alertas registradas.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },
  content: { padding: 16, flexGrow: 1 },
  empty: { color: "#6B7280", textAlign: "center", marginTop: 40 },
});
