/*
 * server.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

//Componentes
import * as express from "express";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
//import  routes from "./routes";

//Dependencias
import * as db from "./services/db";

//Constantes de configuracion
import * as config from "./config";

/**
 * Inicializa el servidor
 *
 */
async function start() {

  // Inicializa la base de datos
  await db.start();

  console.log(`server.js: server initialize (devel: ${config.DEV})`);

  //Intanciamos la aplicacion de express
  const app : express.Express = express();

  //Middleware de seguridad: protege los headers http del servidor.
  app.use(helmet());

  //Se parsea el body a json
  app.use(bodyParser.json());

  //Se agregan las rutas.
  //routes(app);

  //Inicia el servidor.
  app.listen(config.APP_PORT, () => {
    console.log(`server.js: El servidor esta corriendo en http://localhost:${config.APP_PORT}`);
  })

}

// Ejecuta la inicializacion
start();






