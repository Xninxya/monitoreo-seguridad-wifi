// src/viewmodels/useAlertaDetalle.js
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getAlertaById, marcarAlertaNotificada } from "../services/database";

export default function useAlertaDetalle(id) {
  const [alerta, setAlerta] = useState(null);

  const load = useCallback(() => setAlerta(getAlertaById(id)), [id]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const marcarRevisada = useCallback(() => {
    marcarAlertaNotificada(id);
    load();
  }, [id, load]);

  return { alerta, marcarRevisada };
}
