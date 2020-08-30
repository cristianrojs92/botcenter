"use strict";
/*
 * server.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
//Componentes
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
//Constantes de configuracion
const config = require("./config");
/**
 * Inicializa el servidor
 *
 */
async function start() {
    console.log(`server.js: server initialize (devel: ${config.DEV})`);
    //Intanciamos la aplicacion de express
    const app = express();
    //Middleware de seguridad: protege los headers http del servidor.
    app.use(helmet());
    //Se parsea el body a json
    app.use(bodyParser.json());
    //Se agregan las rutas.
    routes_1.default(app);
    //Inicia el servidor.
    app.listen(config.APP_PORT, () => {
        console.log(`server.js: El servidor esta corriendo en http://localhost:${config.APP_PORT}`);
    });
}
// Ejecuta la inicializacion
start();
//# sourceMappingURL=server.js.map