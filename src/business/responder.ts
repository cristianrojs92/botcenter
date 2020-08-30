/*
 * responder.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

//Dependencias
import { Request, Response } from "express";
import { getConversation, setConversation } from "../services/conversations";
import { getTemplateByEvent, getMessageOptions } from "./template";
import { twiml } from "twilio";

/**
 * 
 * @param req Request
 * @param res Response
 */
export function demoReply(req: Request, res: Response){

  try {


    //Obtenemos los datos del request
    const incomingMessage = getInvoiceMenssage(req.body);

    //Mensaje de respuesta
    let outgoingMessage: string;
    let template: template;

    if(incomingMessage === undefined) {
      console.log(`[responder.ts] [demoReply] Datos invalidos`);
      return;
    }

    //Verificamos que plantilla utilizaremos para la interaccion con el usuario


    //Verificamos si el usuario se encuantra en el hilo conversacional 
    //TODO: Esto luego sera una consulta a la base de datos.
    const conversation = getConversation(incomingMessage.from);
    if(conversation !== undefined) {

    } else {

      //No se encontro conversacion se dispara envento principal
      template = getTemplateByEvent(incomingMessage.accountSid, templates.templateEvent.MAIN);

      //Se obtiene el mensaje del template
      outgoingMessage = getOutgoingMessage(template);
    }

    //Si tenemos mensaje de respuesta
    if(outgoingMessage) {

      //Almacenamos la conversacion
      setConversation(incomingMessage.from, template.id, template.type, Date.now().toString());

      //Respondemos el mensaje.
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(outgoingMessage);
    }


    
  } catch (error) {
    console.error(error);
  }

 }

 /**
  * Esta funcion se encarga de validar y obtener los mensajes entrantes.
  * @param resquest 
  */
 function getInvoiceMenssage(resquest: any) : incomingMessage {
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
        } {
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