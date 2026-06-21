// src/viewmodels/useAlertas.js
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getAlertas } from "../services/database";

export default function useAlertas() {
  const [alertas, setAlertas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setAlertas(getAlertas());
    }, [])
  );

  return { alertas };
}
