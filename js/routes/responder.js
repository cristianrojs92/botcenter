"use strict";
/*
 * responder.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouter = void 0;
const express_1 = require("express");
const responder_1 = require("../business/responder");
/**
 * Devuelve todas las rutas de este recurso
 */
function getRouter() {
    //Importamos el enrutador
    const router = express_1.Router();
    //Webhook donde llegaran los mensaje de twilio
    const nameRoute = '/demo-reply';
    router.post(nameRoute, responder_1.demoReply);
    console.log(`Se agrega ruta: ${nameRoute}`);
    return router;
}
exports.getRouter = getRouter;
//# sourceMappingURL=responder.js.map