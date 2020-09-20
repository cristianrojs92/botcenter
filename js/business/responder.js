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
exports.demoReply = void 0;
const messages_1 = require("./messages");
/**
 *
 * @param req Request
 * @param res Response
 */
function demoReply(req, res) {
    try {
        //Obtenemos los datos del request
        const incomingMessage = messages_1.getInvoiceMenssage(req.body);
        //Mensaje de respuesta
        let outgoingMessage;
        if (incomingMessage === undefined) {
            console.log(`[responder.ts] [demoReply] Datos invalidos`);
            return;
        }
        //Verificamos que plantilla utilizaremos para la interaccion con el usuario
        //Se obtiene el mensaje del template
        outgoingMessage = messages_1.processIncomingMessage(incomingMessage);
        //Si tenemos mensaje de respuesta
        if (outgoingMessage) {
            //Respondemos el mensaje.
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(outgoingMessage);
        }
    }
    catch (error) {
        console.error(error);
    }
}
exports.demoReply = demoReply;
//# sourceMappingURL=responder.js.map