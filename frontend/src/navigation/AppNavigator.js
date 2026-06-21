// src/navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../views/DashboardScreen";
import DispositivosScreen from "../views/DispositivosScreen";
import AlertasScreen from "../views/AlertasScreen";
import AlertaDetalleScreen from "../views/AlertaDetalleScreen";
import ConfiguracionScreen from "../views/ConfiguracionScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: { backgroundColor: "#2E75B6" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: "Monitoreo Wi-Fi" }}
      />
      <Stack.Screen
        name="Dispositivos"
        component={DispositivosScreen}
        options={{ title: "Dispositivos conectados" }}
      />
      <Stack.Screen
        name="Alertas"
        component={AlertasScreen}
        options={{ title: "Historial de alertas" }}
      />
      <Stack.Screen
        name="AlertaDetalle"
        component={AlertaDetalleScreen}
        options={{ title: "Detalle de alerta" }}
      />
      <Stack.Screen
        name="Configuracion"
        component={ConfiguracionScreen}
        options={{ title: "Configuración" }}
      />
    </Stack.Navigator>
  );
}
