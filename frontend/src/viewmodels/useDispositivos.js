// src/viewmodels/useDispositivos.js
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getDispositivos, marcarDispositivo } from "../services/database";

export default function useDispositivos() {
  const [dispositivos, setDispositivos] = useState([]);

  const load = useCallback(() => setDispositivos(getDispositivos()), []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const marcar = useCallback(
    (id, estado) => {
      marcarDispositivo(id, estado);
      load();
    },
    [load]
  );

  return { dispositivos, marcar };
}
