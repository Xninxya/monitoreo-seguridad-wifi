// src/viewmodels/useConfiguracion.js
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getConfiguracion, guardarConfiguracion } from "../services/database";

export default function useConfiguracion() {
  const [configuracion, setConfiguracion] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setConfiguracion(getConfiguracion());
    }, [])
  );

  const guardar = useCallback((valores) => {
    guardarConfiguracion(valores);
    setConfiguracion(getConfiguracion());
  }, []);

  return { configuracion, guardar };
}
