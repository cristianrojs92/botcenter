/*
 * responder.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

import { Router } from "express";
import { demoReply } from "../business/responder";

/**
 * Devuelve todas las rutas de este recurso
 */

export function getRouter() : Router {

  //Importamos el enrutador
  const router: Router = Router();

  //Webhook donde llegaran los mensaje de twilio
  const nameRoute = '/demo-reply';
  router.post(nameRoute, demoReply);
  console.log(`Se agrega ruta: ${nameRoute}`)

  return router;
}