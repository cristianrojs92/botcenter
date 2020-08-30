/*
 * index.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

 //Dependencias
 import * as express from "express";

 //Importamos las rutas
 import * as responder from './responder';

/**
 * Esta funcion se encarga de agregar las rutas del servidor http
 * @param app Aplicacion de Express
 */
export default function add(app : express.Express) {

  //Importamos las rutas de responder
  app.use(responder.getRouter());

 }