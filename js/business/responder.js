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
const conversations_1 = require("../services/conversations");
const template_1 = require("./template");
/**
 *
 * @param req Request
 * @param res Response
 */
function demoReply(req, res) {
    try {
        //Obtenemos los datos del request
        const incomingMessage = getInvoiceMenssage(req.body);
        //Mensaje de respuesta
        let outgoingMessage;
        if (incomingMessage === undefined) {
            console.log(`[responder.ts] [demoReply] Datos invalidos`);
            return;
        }
        //Verificamos que plantilla utilizaremos para la interaccion con el usuario
        //Verificamos si el usuario se encuantra en el hilo conversacional 
        //TODO: Esto luego sera una consulta a la base de datos.
        const conversation = conversations_1.getConversation(incomingMessage.from);
        if (conversation !== undefined) {
        }
        else {
            //No se encontro conversacion se dispara envento principal
            const template = template_1.getTemplateByEvent(incomingMessage.accountSid, "MAIN" /* MAIN */);
            //Se obtiene el mensaje del template
            //const outgoingMessage = processTemplate(template);
        }
    }
    catch (error) {
        console.error(error);
    }
}
exports.demoReply = demoReply;
/**
 * Esta funcion se encarga de validar y obtener los mensajes entrantes.
 * @param resquest
 */
function getInvoiceMenssage(resquest) {
    try {
        let incomingMessage;
        /*
          SmsMessageSid,
          NumMedia: '0',
          SmsSid:,
          SmsStatus: 'received',
          Body: 'Hola',
          To:,
          NumSegments: '1',
          MessageSid: '',
          AccountSid: '',
          From: '',
          ApiVersion: '2010-04-01'
        */
        if (resquest.Body || resquest.AccountSid || resquest.To || resquest.From) {
            //Verificamos la cantidad de caracteres
            if (resquest.Body.length <= 500) {
                incomingMessage = {
                    accountSid: resquest.AccountSid,
                    body: resquest.Body,
                    to: resquest.To,
                    from: resquest.From
                };
            }
            {
                console.log(`[responder.ts][getInvoiceMenssage] El body sumera la cantidad de carateres permitidos. Logintud = ${resquest.Body.length}`);
            }
            return incomingMessage;
        }
    }
    catch (error) {
    }
}
function processTemplate(template) {
}
//# sourceMappingURL=responder.js.map