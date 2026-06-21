// src/services/database.js
//
// Capa de acceso a datos (SQLite local), siguiendo el patron de arquitectura
// MVVM definido en la Ficha de Clinica Tecnica (Semana 3) y el esquema
// definido en la Ficha BD y Prototipo (Semana 4).
//
// Tablas: RedWifi, Dispositivo, Alerta, ConfiguracionUsuario.

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("monitoreo_seguridad_wifi.db");

export function initDatabase() {
  db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS RedWifi (
      id_red INTEGER PRIMARY KEY AUTOINCREMENT,
      ssid TEXT NOT NULL,
      fecha_conexion TEXT NOT NULL,
      estado_seguridad TEXT NOT NULL CHECK (estado_seguridad IN ('seguro','inseguro','en_revision'))
    );

    CREATE TABLE IF NOT EXISTS Dispositivo (
      id_dispositivo INTEGER PRIMARY KEY AUTOINCREMENT,
      id_red INTEGER NOT NULL,
      mac_address TEXT NOT NULL,
      ip_address TEXT NOT NULL,
      hostname TEXT,
      fabricante TEXT,
      estado TEXT NOT NULL CHECK (estado IN ('conocido','desconocido','sospechoso')) DEFAULT 'desconocido',
      FOREIGN KEY (id_red) REFERENCES RedWifi(id_red)
    );

    CREATE TABLE IF NOT EXISTS Alerta (
      id_alerta INTEGER PRIMARY KEY AUTOINCREMENT,
      id_dispositivo INTEGER NOT NULL,
      tipo TEXT NOT NULL CHECK (tipo IN ('arp_spoofing','dispositivo_nuevo','otro')),
      fecha_hora TEXT NOT NULL,
      ip_afectada TEXT NOT NULL,
      mac_anterior TEXT,
      mac_nueva TEXT,
      descripcion TEXT NOT NULL,
      notificada INTEGER NOT NULL DEFAULT 0 CHECK (notificada IN (0,1)),
      FOREIGN KEY (id_dispositivo) REFERENCES Dispositivo(id_dispositivo)
    );

    CREATE TABLE IF NOT EXISTS ConfiguracionUsuario (
      id_configuracion INTEGER PRIMARY KEY AUTOINCREMENT,
      frecuencia_escaneo_min INTEGER NOT NULL DEFAULT 5,
      tipos_notificacion TEXT NOT NULL DEFAULT 'criticas',
      dias_retencion_historial INTEGER NOT NULL DEFAULT 30
    );
  `);

  seedIfEmpty();
}

function seedIfEmpty() {
  const row = db.getFirstSync("SELECT COUNT(*) as count FROM RedWifi");
  if (row.count > 0) return;

  db.runSync(
    `INSERT INTO RedWifi (ssid, fecha_conexion, estado_seguridad) VALUES (?, datetime('now'), ?)`,
    ["CasaFerreira_5G", "seguro"]
  );

  db.runSync(
    `INSERT INTO Dispositivo (id_red, mac_address, ip_address, hostname, fabricante, estado) VALUES (1, ?, ?, ?, ?, ?)`,
    ["3C:5A:B4:11:22:33", "192.168.1.10", "router-principal", "TP-Link", "conocido"]
  );
  db.runSync(
    `INSERT INTO Dispositivo (id_red, mac_address, ip_address, hostname, fabricante, estado) VALUES (1, ?, ?, ?, ?, ?)`,
    ["A4:5E:60:44:55:66", "192.168.1.15", "iphone-francisco", "Apple", "conocido"]
  );
  db.runSync(
    `INSERT INTO Dispositivo (id_red, mac_address, ip_address, hostname, fabricante, estado) VALUES (1, ?, ?, ?, ?, ?)`,
    ["00:1A:2B:3C:4D:5E", "192.168.1.42", null, "Desconocido", "sospechoso"]
  );

  db.runSync(
    `INSERT INTO Alerta (id_dispositivo, tipo, fecha_hora, ip_afectada, mac_anterior, mac_nueva, descripcion, notificada)
     VALUES (3, 'arp_spoofing', datetime('now'), '192.168.1.1', '00:11:22:33:44:55', '00:1A:2B:3C:4D:5E', 'Se detecto un cambio inesperado en la MAC asociada a la puerta de enlace.', 0)`
  );
  db.runSync(
    `INSERT INTO Alerta (id_dispositivo, tipo, fecha_hora, ip_afectada, mac_anterior, mac_nueva, descripcion, notificada)
     VALUES (3, 'dispositivo_nuevo', datetime('now'), '192.168.1.42', NULL, NULL, 'Nuevo dispositivo no reconocido se conecto a la red.', 1)`
  );

  db.runSync(
    `INSERT INTO ConfiguracionUsuario (frecuencia_escaneo_min, tipos_notificacion, dias_retencion_historial) VALUES (5, 'criticas', 30)`
  );
}

// ---------- Dashboard ----------

export function getDashboardSummary() {
  const red = db.getFirstSync("SELECT * FROM RedWifi ORDER BY id_red DESC LIMIT 1");
  const totalDispositivos = db.getFirstSync("SELECT COUNT(*) as count FROM Dispositivo").count;
  const sospechosos = db.getFirstSync(
    "SELECT COUNT(*) as count FROM Dispositivo WHERE estado = 'sospechoso'"
  ).count;
  const alertasRecientes = db.getAllSync(
    "SELECT * FROM Alerta ORDER BY fecha_hora DESC LIMIT 3"
  );
  return { red, totalDispositivos, sospechosos, alertasRecientes };
}

// Simula el resultado de un escaneo de red.
// NOTA: el escaneo real (lectura de la tabla ARP / mDNS del sistema operativo)
// requiere un modulo nativo y permisos de red local; no esta implementado
// en este prototipo. Ver README.md, seccion "Proximos pasos".
export function simularEscaneo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      db.runSync(
        `UPDATE RedWifi SET fecha_conexion = datetime('now')
         WHERE id_red = (SELECT id_red FROM RedWifi ORDER BY id_red DESC LIMIT 1)`
      );
      resolve();
    }, 1000);
  });
}

// ---------- Dispositivos ----------

export function getDispositivos() {
  return db.getAllSync("SELECT * FROM Dispositivo ORDER BY estado DESC, id_dispositivo");
}

export function marcarDispositivo(id_dispositivo, estado) {
  db.runSync("UPDATE Dispositivo SET estado = ? WHERE id_dispositivo = ?", [estado, id_dispositivo]);
}

// ---------- Alertas ----------

export function getAlertas() {
  return db.getAllSync("SELECT * FROM Alerta ORDER BY fecha_hora DESC");
}

export function getAlertaById(id_alerta) {
  return db.getFirstSync("SELECT * FROM Alerta WHERE id_alerta = ?", [id_alerta]);
}

export function marcarAlertaNotificada(id_alerta) {
  db.runSync("UPDATE Alerta SET notificada = 1 WHERE id_alerta = ?", [id_alerta]);
}

// ---------- Configuracion ----------

export function getConfiguracion() {
  return db.getFirstSync("SELECT * FROM ConfiguracionUsuario ORDER BY id_configuracion DESC LIMIT 1");
}

export function guardarConfiguracion({ frecuencia_escaneo_min, tipos_notificacion, dias_retencion_historial }) {
  const existing = db.getFirstSync(
    "SELECT id_configuracion FROM ConfiguracionUsuario ORDER BY id_configuracion DESC LIMIT 1"
  );
  if (existing) {
    db.runSync(
      `UPDATE ConfiguracionUsuario
       SET frecuencia_escaneo_min = ?, tipos_notificacion = ?, dias_retencion_historial = ?
       WHERE id_configuracion = ?`,
      [frecuencia_escaneo_min, tipos_notificacion, dias_retencion_historial, existing.id_configuracion]
    );
  } else {
    db.runSync(
      `INSERT INTO ConfiguracionUsuario (frecuencia_escaneo_min, tipos_notificacion, dias_retencion_historial)
       VALUES (?, ?, ?)`,
      [frecuencia_escaneo_min, tipos_notificacion, dias_retencion_historial]
    );
  }
}
