"use strict";
/*
 * index.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos las rutas
const responder = require("./responder");
/**
 * Esta funcion se encarga de agregar las rutas del servidor http
 * @param app Aplicacion de Express
 */
function add(app) {
    //Importamos las rutas de responder
    app.use(responder.getRouter());
}
exports.default = add;
//# sourceMappingURL=index.js.map