// src/views/ConfiguracionScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import ValidatedInput from "../components/ValidatedInput";
import PrimaryButton from "../components/PrimaryButton";
import useConfiguracion from "../viewmodels/useConfiguracion";

export default function ConfiguracionScreen() {
  const { configuracion, guardar } = useConfiguracion();

  const [frecuencia, setFrecuencia] = useState("");
  const [retencion, setRetencion] = useState("");
  const [soloCriticas, setSoloCriticas] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (configuracion) {
      setFrecuencia(String(configuracion.frecuencia_escaneo_min));
      setRetencion(String(configuracion.dias_retencion_historial));
      setSoloCriticas(configuracion.tipos_notificacion === "criticas");
    }
  }, [configuracion]);

  const validar = () => {
    const next = {};
    const freqNum = Number(frecuencia);
    const retNum = Number(retencion);

    if (!frecuencia || isNaN(freqNum) || freqNum <= 0) {
      next.frecuencia = "Ingresa un número de minutos mayor a 0.";
    }
    if (!retencion || isNaN(retNum) || retNum <= 0) {
      next.retencion = "Ingresa una cantidad de días mayor a 0.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onGuardar = () => {
    if (!validar()) return;
    guardar({
      frecuencia_escaneo_min: Number(frecuencia),
      tipos_notificacion: soloCriticas ? "criticas" : "todas",
      dias_retencion_historial: Number(retencion),
    });
    Alert.alert("Configuración guardada", "Tus preferencias se actualizaron correctamente.");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <ValidatedInput
            label="Frecuencia de escaneo (minutos)"
            value={frecuencia}
            onChangeText={setFrecuencia}
            keyboardType="numeric"
            placeholder="Ej. 5"
            error={errors.frecuencia}
          />
          <ValidatedInput
            label="Días de retención del historial"
            value={retencion}
            onChangeText={setRetencion}
            keyboardType="numeric"
            placeholder="Ej. 30"
            error={errors.retencion}
          />
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Notificar solo alertas críticas</Text>
            <Switch value={soloCriticas} onValueChange={setSoloCriticas} />
          </View>
          <PrimaryButton title="Guardar configuración" onPress={onGuardar} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },
  content: { padding: 16 },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  switchLabel: { fontSize: 14, color: "#374151", flex: 1, marginRight: 12 },
});
