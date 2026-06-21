import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { initDatabase } from "./src/services/database";

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      initDatabase();
      setReady(true);
    } catch (e) {
      console.error("Error inicializando la base de datos:", e);
      setError(e.message);
    }
  }, []);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>No se pudo iniciar la base de datos</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E75B6" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  errorTitle: { fontWeight: "700", fontSize: 16, marginBottom: 8, textAlign: "center" },
  errorText: { color: "#6B7280", textAlign: "center" },
});
