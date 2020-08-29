"use strict";
/*
 * config.ts
 *
 * Created on 6 de Marzo de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_TRACE_BODY = exports.API_TRACE = exports.DATABASE_CONFIG = exports.DEV = exports.APP_PORT = void 0;
//Puerto del servicio
exports.APP_PORT = process.env.APP_PORT || 3001;
// App
exports.DEV = (process.env.DEV === undefined) ? true : (process.env.DEV === "true" || process.env.DEV === "TRUE");
/**
 * @desc Retorna los datos de la Base de datos
 */
exports.DATABASE_CONFIG = {
    database: process.env.DBNAME || "botcenterdb",
    user: process.env.DBUSER || "botcenteruser",
    password: process.env.DBPASSWORD || "",
    host: process.env.DBHOST || "127.0.0.1",
    port: Number(process.env.DBPORT) || 5432,
    max: Number(process.env.MAX_CLIENTS) || 10,
    idleTimeoutMillis: Number(process.env.IDLETIMEOUTMILLS) || 30000
};
// Realiza un trace de las solicitudes enviadas y recibidas por el servicio API
exports.API_TRACE = process.env.API_TRACE || true;
exports.API_TRACE_BODY = process.env.API_TRACE_BODY || true;
//# sourceMappingURL=config.js.map