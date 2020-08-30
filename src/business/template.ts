/*
 * template.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
//Dependencias
import * as fs from "fs";
import * as path from "path";
import e = require("express");

 //Constantes globales
const BOT_CONFIG = '../../dist/etc/conf/bot.json';
const PATH_TEMPLATES = '../../dist/etc/templates';
// Directorio base
const _BASEDIR_ = path.join(path.dirname(__filename), '.');

//Tipos
//import { templateEvent } from "../types/template";

/**
 * Devuelve una plantilla indicada para un evento
 * @param accountSid Cuenta
 * @param event Evento
 */
export function getTemplateByEvent(accountSid : string, event : templates.templateEvent) : template {
  let template : template;
  try {

    //Buscamos la lista de las plantillas
    const templates = getTemplates(accountSid);

    //Buscamo la platilla por el evento
    template = searchTemplateByEvent(event, templates);

    if(!template) {
      console.error(`[template.ts] [getTemplateEvent] Template nulo`);
    }

  } catch (error) {
    console.error(`[template.ts] [getTemplateEvent] ${error}`);
  }
  return template;
}

/**
 * Retorno una plantilla dependiendo el tipo de evento
 * @param event Evento
 * @param templates Listado de plantillas
 */
function searchTemplateByEvent(event : templates.templateEvent, templates: Array<template>): template {
  let template : template;
  try {

    //Realizamos la busqueda de la plantilla segun el evento
    template = templates.find((t) => t.event === event);

  } catch (error) {
    console.error(`[template.ts][searchTemplateByEvent] Error: ${error}`);
  }
  return template;

}

/**
 * Obtenemos las plantillas de una cuenta en particular
 * @param accountSid Numero de cuenta
 */
function getTemplates(accountSid: string): Array<template> {

  let templates: Array<template>; 
  try {
    
    if(accountSid) {
      accountSid = accountSid.trim();
      //Lectura al archivo de configuracion del bot
      const botConfig = JSON.parse((fs.readFileSync(path.join(_BASEDIR_, BOT_CONFIG)).toString()));

      //Verificamos si tenemos cuentas configuradas
      if(botConfig.accounts) {

        //Obtenemos el nombre del archivo del template.
        const botAcoount = botConfig.accounts.find((account : any) => account.accountSid === accountSid);

        //Obtenemos el nombre del archivo de template
        const nameTemplateFile = botAcoount.template;

        if(nameTemplateFile) {

          //Realizamos la lectura del template
          const templatesFile = JSON.parse((fs.readFileSync(path.join(_BASEDIR_, `${PATH_TEMPLATES}/${nameTemplateFile}`)).toString()));
          templates = templatesFile.templates;

        } else {
          console.error(`[template.ts][getTemplateConfig] Nombre del archivo del template vacio`);
        }

      } else {
        console.error(`[template.ts][getTemplateConfig] No se encontro configuracion de cuentas`);
      }
    } else {
      console.error(`[template.ts][getTemplateConfig] accountSid nulo`);
    }

  } catch (error) {
    console.error(`[template.ts][getTemplateConfig] Error: ${error}`);
  }

  return templates;
}

export function getMessageOptions(template : template) : string {
  let options : string;
  try {

    //Verificamos si el mensaje tine opciones
    if(template.options && Array.isArray(template.options)) {
      options = template.options.reduce((message, option) => {
        return message += option.message + '\n';
      }, '');
    }
    
  } catch (error) {
    console.error(`[template.ts][getMessageOptions] Error: ${error}`);
  }
  return options;
}