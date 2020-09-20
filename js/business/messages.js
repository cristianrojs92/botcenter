"use strict";
/*
 * responder.ts
 *
 * Created on 20 de Septiembre de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoiceMenssage = exports.processIncomingMessage = void 0;
//Dependencias
const twilio_1 = require("twilio");
const conversations_1 = require("../services/conversations");
const template_1 = require("./template");
/**
 *
 */
function processIncomingMessage(incomingMessage) {
    let outgoingMessage;
    try {
        let template;
        //Verificamos si el usuario se encuantra en el hilo conversacional 
        //TODO: Esto luego sera una consulta a la base de datos.
        const conversation = conversations_1.getConversation(incomingMessage.from);
        if (conversation !== undefined) {
            //Se busca el template dependiendo el template anterior
            template = template_1.getTemplateByIncomingMessage(incomingMessage.accountSid, incomingMessage.body, conversation.template_id);
        }
        else {
            //Se busca el template del evento principal
            template = template_1.getTemplateByEvent(incomingMessage.accountSid, "MAIN" /* MAIN */);
        }
        //Si no se obtuvo un template, se obtiene un mensaje random
        if (template === undefined) {
            //Se busca el template del evento random
            template = template_1.getTemplateByEvent(incomingMessage.accountSid, "RANDOM" /* RANDOM */);
        }
        //Se obtiene el mensaje del template
        outgoingMessage = getOutgoingMessage(template);
        if (outgoingMessage) {
            //Almacenamos la conversacion
            conversations_1.setConversation(incomingMessage.from, template.id, template.type, Date.now().toString());
        }
    }
    catch (error) {
    }
    return outgoingMessage;
}
exports.processIncomingMessage = processIncomingMessage;
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
            if (resquest.Body.length <= 1600) {
                incomingMessage = {
                    accountSid: resquest.AccountSid,
                    body: resquest.Body,
                    to: resquest.To,
                    from: resquest.From
                };
            }
            else {
                console.log(`[responder.ts][getInvoiceMenssage] El body sumera la cantidad de carateres permitidos. Logintud = ${resquest.Body.length}`);
            }
            return incomingMessage;
        }
    }
    catch (error) {
    }
}
exports.getInvoiceMenssage = getInvoiceMenssage;
/**
* Retorna el mensaje de una plantilla
* @param template Plantilla
*/
function getOutgoingMessage(template) {
    let outgoingMessage;
    try {
        const messagingResponse = new twilio_1.twiml.MessagingResponse();
        messagingResponse.message(template.message);
        //Obtenemos las opciones
        const optionMessage = template_1.getMessageOptions(template);
        //Si tenemos opciones
        if (optionMessage) {
            messagingResponse.message(optionMessage);
        }
        outgoingMessage = messagingResponse.toString();
    }
    catch (error) {
    }
    return outgoingMessage;
}
//# sourceMappingURL=messages.js.map