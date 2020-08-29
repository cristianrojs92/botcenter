/*
 * db.ts
 *
 * Created on 14 de abril de 2020
 * Copyright (c) 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */


// Componentes
import * as pg from "pg";
import * as path from "path";
import * as fs from "fs";

//Dependencias
import * as file from "../utils/file";
import * as date from "../utils/date";

// Propiedades del modulo
let _initialized_ = false;
let _pool_: any;

// Constantes de configuración
import { DATABASE_CONFIG , DEV } from "../config";

// Funciones locales que exporta el modulo
export { execute, start };

/**
 * Inicia el servicio de acceso a bases de datos
 *
 * @return              true o false
 *
 */
async function start(): Promise<boolean> {

  let ret = false;

  // Si el modulo no fue inicializado
  if (_initialized_ === false) {

    try {

      console.debug(`(start): server initialize`);

      // Inicializa el pool de conexiones
      _pool_ = new pg.Pool(DATABASE_CONFIG);

      // Captura eventos de error del pool
      _pool_.on("error", (err: any, client: any) => {
        console.error(`(start): idle client error (${err.message})`);
      });

      // Define como inicializado al modulo
      _initialized_ = true;

      // Ejecuta scripts de inicio de la base de datos
      schema();

      ret = true;

    } catch (err) {
      console.error(`(start): error (${err.stack})`);
    }

  } else {
    ret = true;
  }

  return ret;

}

/**
 * Recibe un array sentencias SQL y las ejecuta en orden, retorna
 * un array con los resultados de cada una
 *
 * @param client                   instancia de la conexion o undefined para crear una nueva
 * @param queries                  lista de queries a ejecutar
 *
 * @return                         resultados de las consultas o false
 *
 */
async function bulk(client: any, queries: any): Promise<any> {

  let results: any = false;
  let abort = false;

  try {

    if (client !== undefined) {

      // Function para la ejecucion de una query
      const exec = async (query: string) => {

        try {

          // Ejecuta la consulta
          return await client.query(query);

        } catch (err) {

          console.error(`(bulk/exec): error (${err.message}) [${query}]`);
        }

      };

      // Ejecuta el set de consultas
      for (const query of queries) {

        const result = await exec(query);
        if (result !== undefined) {

          // Agrega el resultado
          if (results === false) {
            results = [];
          }
          results.push(result);

        } else {
          abort = true;
          break;
        }

      }

      // Si se aborta la ejecucion
      if (abort === true) {
        results = false;
      }

    }

    // Respondemos con error
    else {
      console.error(`(bulk): la instancia de la conexion a base de datos es invalida`);
    }

  } catch (err) {
    console.error(`(bulk): error (${err.stack})`);
  }

  return results;

}

/**
 * Ejecuta una query en la base de datos y retorna el resultado
 *
 * @param client                   instancia de la conexion o undefined para crear una nueva
 * @param sql                      sentencia/s que se requieren ejecutar
 * @param transaction              true si se ejecuta dentro de una transaccion
 *
 * @return                         resultados de las consultas o false
 *
 */
async function execute(client: any, sql: any, transaction: boolean): Promise<any> {

  let tmp = client;
  let ret = false;

  try {

    // Inicializa la conexion con la base de datos
    start();

    // Solicitamos una conexion al pool si es necesario
    if (tmp === undefined) {
      tmp = await _pool_.connect();
    }

    // Array para ejecucion de queries
    let queries = [];

    // Si requiere de una transaccion
    if (transaction === true) {
      queries.push("BEGIN;");
    }

    // Si es un array
    if (Array.isArray(sql) === true) {
      queries = queries.concat(sql);
    } else {
      queries.push(sql);
    }

    // Si requiere de una transaccion
    if (transaction === true) {
      queries.push("COMMIT;");
    }

    // Ejecuta la query/ies
    ret = await bulk(tmp, queries);

    // Si la ejecucion no fue correcta
    if (ret === false) {

      // Hace un rollback si esta en una transaccion
      if (transaction === true) {

        // Ejecuta la query/ies
        console.error(`(exec): ocurrio un error, se ejecuta un rollback de la transaction`);
        await bulk(tmp, ["ROLLBACK;"]);

      }

    }

    // Libera la conexion
    if (client === undefined) {
      await tmp.release();
    }

  } catch (err) {
    console.error(`(exec): error (${err.stack})`);
  }

  return ret;

}

/**
 * Inicia una transaccion en la base de datos y retorna una instancia
 * de la conexion para ser enviada en cada transaccion posterior, la
 * instancia de la base de datos se cierra en el commit o el rollback
 *
 * @return                         instancia de la conexion o false
 *
 */
export async function begin(): Promise<any> {

  // Inicializa la conexion con la base de datos
  start();

  try {

    // Solicitamos una conexion al pool
    const client = await _pool_.connect();
    if (client !== undefined) {

      // Ejecuta la query/ies
      const ret = await bulk(client, ["BEGIN;"]);
      if (ret === false) {

        console.error(`(begin): no es posible iniciar una transaccion en la base de datos`);

        // Libera la conexion
        await client.release(true);

      } else {
        return client;
      }

    } else {
      console.error(`(begin): no es posible obtener una instancia de la conexion a base de datos`);
    }

  } catch (err) {
    console.error(`(begin): error (${err.stack})`);
  }

  return false;

}

/**
 * Finaliza la transaccion y cierra la conexion con la base de datos
 *
 * @param client                   instancia de la conexion
 *
 * @return                         true o false
 *
 */
export async function commit(client: any): Promise<boolean> {

  let ret = false;

  try {

    // Solicitamos una conexion al pool
    if (client !== undefined) {

      // Ejecuta la query/ies
      if (await bulk(client, ["COMMIT;"]) === false) {
        console.error(`(commit): no es posible finalizar la transaccion en la base de datos`);
      } else {
        ret = true;
      }

      // Libera la conexion
      await client.release(true);

    } else {

      // Respondemos con error
      console.error(`(commit): la instancia de la conexion a base de datos es invalida`);
    }

  } catch (err) {
    console.error(`(commit): error (${err.stack})`);
  }

  return ret;

}

/**
 * Cancela la transaccion y cierra la conexion con la base de datos
 *
 * @param client                   instancia de la conexion
 *
 * @return                         true o false
 *
 */
export async function rollback(client: any): Promise<boolean> {

  let ret = false;

  try {

    // Solicitamos una conexion al pool
    if (client !== undefined) {

      // Ejecuta la query/ies
      if (await bulk(client, ["ROLLBACK;"]) === false) {
        console.error(`(rollback): no es posible cancelar la transaccion en la base de datos`);
      } else {
        ret = true;
      }

      // Libera la conexion
      await client.release(true);

    } else {

      // Respondemos con error
      console.error(`(rollback): la instancia de la conexion a base de datos es invalida`);
    }

  } catch (err) {
    console.error(`(rollback): error (${err.stack})`);
  }

  return ret;

}

/**
 * Funcion para sanitizar una cadena de texto antes de insertarla dentro de la query
 *
 * @param text                     string a sanitizar
 *
 * @return                         string sanitizado
 *
 */
export function sanitize(text: string): string {

  try {

    // Si no se encuentra undefined
    if (text !== undefined && typeof text === "string") {
      return text.replace(/'/g, "''");
    }

  } catch (err) {
    console.error(`(sanitize): error (${err.stack})`);
  }

  return text;

}

/**
 * Funcion para formatear un valor booleano a uno compatible con la base de datos
 *
 * @param value                    valor a formatear
 *
 * @return                         valor formateado
 *
 */
export function formatBoolean(value: boolean): number {

  return (value === true) ? 1 : 0;

}

/**
 * Funcion para crear el esquema de la base de datos
 *
 *
 * @return                         esquema creado
 *
 */
export async function schema() : Promise<boolean> {

  let ret = false;

  try {
    // Si el modulo no fue inicializado
    if (_initialized_ === false) { await start(); }

    // Solicitamos una conexion al pool
    let client = await _pool_.connect();
    if (client !== undefined) {

      //
      // Obtiene del directorio de scripts la lista de scripts para procesar
      //

      // Prepara el path del archivo
      let filedir = path.join(file.config(), "db");

      // Si no existe el archivo/directorio de scripts
      if (fs.existsSync(filedir) === false) {
        fs.mkdirSync(filedir,0o775); 
      }

      // Si no existe el archivo/directorio de scripts ejecutados lo crea
      if (fs.existsSync(path.join(filedir, "parsed")) === false) {
        fs.mkdirSync(path.join(filedir, "parsed"), 0o775); 
      }

      // Obtiene la lista de archivos del directorio
      let scripts = fs.readdirSync(filedir);
      if (scripts !== undefined && scripts.length > 0) {

        // Function para la ejecucion de un script sql
        let execute = async function(script : string) {

          let ret = false;

          // Si se trata de un script
          if (script.toLowerCase().trim().endsWith('.sql')) {

            try {

              // Obtiene el contenido del script
              let data = fs.readFileSync(path.join(filedir, script));
              
              // Ejecuta el script
              await client.query(data.toString());
              ret = true;
              
              console.info(`db.js (schema/execute): se ejecuto el script (script: ${script})`);

              // Obtiene un timestamp para el archivo
              let timestamp = date.get('YYYYMMDDHHMMSS');

              // Mueve el archivo procesado
              if (DEV !== true) {
                fs.renameSync(path.join(filedir, script), path.join(filedir, "parsed", `${script}.${timestamp}`));                            
              }

            } catch (err) {
              console.error(`db.js (schema/execute): error (${err.message})`);
            }
          
          } else {
            ret = true;
          }

          return ret;

        };

        // Ordena los archivos por nombre
        scripts.sort(function(a,b) {return (a > b) ? 1 : ((b > a) ? -1 : 0);});
        
        // Ejecuta el set de scripts
        for (let i = 0; i < scripts.length; i++) {
          await execute(scripts[i]);
        }
      }

      // Libera la conexion
      await client.release(true);

      console.log(`db.js (schema): database structure verified`);
      ret = true;

    } else {
      console.error(`db.js (schema): no es posible obtener una instancia de la conexion a base de datos`);
    } 

  } catch (err){
    console.error(`db.js (schema): error (${err.stack})`);
  }

  return ret;
}