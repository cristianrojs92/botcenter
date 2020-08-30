/*
 * conversations.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */

import * as fs from "fs";
import * as path from "path";

//Constantes globales
const CONVERSATIONS_FILES = '../../tmp/conversations.json';
// Directorio base
const _BASEDIR_ = path.join(path.dirname(__filename), '.');

/**
 * Esta funcion devuelve todas las conversaciones realizadas.
 */
function getConversations() : Array<conversation> {
  try {

    //Obtenemos las conversaciones almacenadas
    const conversations = JSON.parse((fs.readFileSync(path.join(_BASEDIR_, CONVERSATIONS_FILES)).toString()));
    return conversations;

  } catch (error) {
    console.error(error);
    return [];
  }

}

/**
 * Esta funcion envia una conversacion realizada previamente con el usuario.
 */
export function getConversation(from : string) : conversation {
  try {

    //Obtenemos las conversaciones almacenadas
    const conversations = getConversations();

    /*TODO: Optimizar la busqueda de la conversacion*/;

    //Buscamos la conversacion
    const conversation = conversations.find(c => c.from === from);

    return conversation;

  } catch (error) {
    console.error(error);
    return undefined;
  } 
}

/**
 * Esta funcion se encarga de almacenar una conversacion con el usuario
 */
export function setConversation( from: string, template_id: string, template_type: string, date: string) {
  try {

    //Verificamos si la conversacion ya existe.
    let conversation = getConversation(from);

    //Obtenemos las conversaciones almacenadas
    let conversations = getConversations();
    
    //Si ya existe conversacion previa
    if(conversation){

      conversations = conversations.map( (c) => {
        if(c.from === conversation.from) {
          return { ...c,
                   template_type
                 };
        } 
        return c;
      });

    } else {
      conversations.push( { from, template_id, template_type, date });
    }

    //Almacenamos todas las conversaciones
    saveConversations(conversations)
    
  } catch (error) {
    console.log(error);
  }
}

/*
* Esta funcion se encarga de almacenar las conversaciones en un archivo
*/
function saveConversations(conversations : Array<conversation>) {

  try {
    
    //Si es un array de conversaciones
    if(Array.isArray(conversations)) {
      
      //Eliminamos el archivo previo
      fs.unlinkSync(path.join(_BASEDIR_, CONVERSATIONS_FILES));
  
      // Obtiene el template para el mensaje
      fs.writeFileSync(path.join(_BASEDIR_, CONVERSATIONS_FILES),JSON.stringify(conversations));
    }

  } catch (error) {
    console.error(error);
  }
}