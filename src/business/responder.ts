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
import { processIncomingMessage, getInvoiceMenssage } from "./messages";
import { typeOutgoingMessage } from "message";

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

    if(incomingMessage === undefined) {
      console.log(`[responder.ts] [demoReply] Datos invalidos`);
      return;
    }

    //Verificamos que plantilla utilizaremos para la interaccion con el usuario

    //Se obtiene el mensaje del template
    outgoingMessage = processIncomingMessage(incomingMessage,typeOutgoingMessage.XML);

    //Si tenemos mensaje de respuesta
    if(outgoingMessage) {

      //Respondemos el mensaje.
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(outgoingMessage);
    }


    
  } catch (error) {
    console.error(error);
  }

 }


 /**
 * 
 * @param req Request
 * @param res Response
 */
export function wsWebResponder(req: Request, res: Response){

  try {

    //Obtenemos los datos del request
    const incomingMessage = getInvoiceMenssage(req.body);

    //Mensaje de respuesta
    let outgoingMessage: string;

    if(incomingMessage === undefined) {
      console.log(`[responder.ts] [demoReply] Datos invalidos`);
      return;
    }

    //Verificamos que plantilla utilizaremos para la interaccion con el usuario

    //Se obtiene el mensaje del template
    outgoingMessage = processIncomingMessage(incomingMessage,typeOutgoingMessage.JSON);

    //Si tenemos mensaje de respuesta
    if(outgoingMessage) {

      //Respondemos el mensaje.
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(outgoingMessage);
    }


    
  } catch (error) {
    console.error(error);
  }

 }