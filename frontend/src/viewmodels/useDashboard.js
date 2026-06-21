// src/viewmodels/useDashboard.js
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getDashboardSummary, simularEscaneo } from "../services/database";

export default function useDashboard() {
  const [summary, setSummary] = useState(null);
  const [scanning, setScanning] = useState(false);

  const load = useCallback(() => {
    setSummary(getDashboardSummary());
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const escanear = useCallback(async () => {
    setScanning(true);
    await simularEscaneo();
    load();
    setScanning(false);
  }, [load]);

  return { summary, scanning, escanear, reload: load };
}
