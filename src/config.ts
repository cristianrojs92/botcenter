/*
 * config.ts
 *
 * Created on 6 de Marzo de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

//Puerto del servicio
export const APP_PORT = process.env.APP_PORT || 3001;

// App
export const DEV : boolean = (process.env.DEV === undefined) ? true : (process.env.DEV === "true" || process.env.DEV === "TRUE");

/**
 * @desc Retorna los datos de la Base de datos
 */
export const DATABASE_CONFIG = {

  database          : process.env.DBNAME || "botcenterdb",
  user              : process.env.DBUSER || "botcenteruser",
  password          : process.env.DBPASSWORD|| "",
  host              : process.env.DBHOST  || "127.0.0.1",
  port              : Number(process.env.DBPORT)             || 5432,
  max               : Number(process.env.MAX_CLIENTS)        || 10,
  idleTimeoutMillis : Number(process.env.IDLETIMEOUTMILLS)   || 30000

};


// Realiza un trace de las solicitudes enviadas y recibidas por el servicio API
export const API_TRACE = process.env.API_TRACE || true;
export const API_TRACE_BODY = process.env.API_TRACE_BODY || true;
