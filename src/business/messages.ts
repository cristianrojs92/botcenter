/*
 * messages.ts
 *
 * Created on 20 de Septiembre de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

 //Dependencias
 import { twiml } from "twilio";
import { getConversation, setConversation } from "../services/conversations";
import { getTemplateByEvent, getTemplateByIncomingMessage, getMessageOptions } from "./template";

 /**
  * 
  */
 export function processIncomingMessage( incomingMessage : any) : string {

   let outgoingMessage;
   try {

    let template: template;

    //Verificamos si el usuario se encuantra en el hilo conversacional 
    //TODO: Esto luego sera una consulta a la base de datos.
    const conversation = getConversation(incomingMessage.from);
    if(conversation !== undefined) {

      //Se busca el template dependiendo el template anterior
      template = getTemplateByIncomingMessage(incomingMessage.accountSid, incomingMessage.body, conversation.template_id);
    } else {

      //Se busca el template del evento principal
      template = getTemplateByEvent(incomingMessage.accountSid, templates.templateEvent.MAIN);
    }

    //Si no se obtuvo un template, se obtiene un mensaje random
    if(template === undefined) {

      //Se busca el template del evento random
      template = getTemplateByEvent(incomingMessage.accountSid, templates.templateEvent.RANDOM);
    }

    //Se obtiene el mensaje del template
    outgoingMessage = getOutgoingMessage(template);

    if(outgoingMessage) {

      //Almacenamos la conversacion
      setConversation(incomingMessage.from, template.id, template.type, Date.now().toString());
    }
     
   } catch (error) {
     
   }
   return outgoingMessage;
 }


 /**
  * Esta funcion se encarga de validar y obtener los mensajes entrantes.
  * @param resquest 
  */
 export function getInvoiceMenssage(resquest: any) : incomingMessage {
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
    if(resquest.Body|| resquest.AccountSid || resquest.To || resquest.From ) {

      //Verificamos la cantidad de caracteres
      if(resquest.Body.length <= 1600) {
        incomingMessage = {
          accountSid: resquest.AccountSid,
          body: resquest.Body,
          to: resquest.To,
          from: resquest.From
        }
      } else {
        console.log(`[responder.ts][getInvoiceMenssage] El body sumera la cantidad de carateres permitidos. Logintud = ${resquest.Body.length}`)
      }
      return incomingMessage;
    }
    
  } catch (error) {
    
  }
}

/**
* Retorna el mensaje de una plantilla
* @param template Plantilla
*/
function getOutgoingMessage(template: template) : string {

let outgoingMessage : string;
try {

  const messagingResponse = new twiml.MessagingResponse();

  messagingResponse.message(template.message);

  //Obtenemos las opciones
  const optionMessage = getMessageOptions(template);

  //Si tenemos opciones
  if(optionMessage) {
    messagingResponse.message(optionMessage);
  }

  outgoingMessage = messagingResponse.toString();

  
} catch (error) {
  
}
return outgoingMessage;
}