"use strict";
/*
 * conversations.ts
 *
 * Created on 29 de Agosto de 2020
 * Copyright © 2020
 * Author Cristian Rojas <b>cristianrojs92@gmail.com</b>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConversation = exports.getConversation = void 0;
const fs = require("fs");
const path = require("path");
//Constantes globales
const CONVERSATIONS_FILES = '../../tmp/conversations.json';
// Directorio base
const _BASEDIR_ = path.join(path.dirname(__filename), '.');
/**
 * Esta funcion devuelve todas las conversaciones realizadas.
 */
function getConversations() {
    let conversations = [];
    try {
        const conversationsJson = fs.readFileSync(path.join(_BASEDIR_, CONVERSATIONS_FILES));
        if (conversationsJson) {
            //Obtenemos las conversaciones almacenadas
            conversations = JSON.parse((conversationsJson.toString()));
        }
    }
    catch (error) {
        console.error(error);
    }
    return conversations;
}
/**
 * Esta funcion envia una conversacion realizada previamente con el usuario.
 */
function getConversation(from) {
    try {
        //Obtenemos las conversaciones almacenadas
        const conversations = getConversations();
        /*TODO: Optimizar la busqueda de la conversacion*/ ;
        //Buscamos la conversacion
        const conversation = conversations.find(c => c.from === from);
        return conversation;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
}
exports.getConversation = getConversation;
/**
 * Esta funcion se encarga de almacenar una conversacion con el usuario
 */
function setConversation(from, template_id, template_type, date) {
    try {
        //Verificamos si la conversacion ya existe.
        let conversation = getConversation(from);
        //Obtenemos las conversaciones almacenadas
        let conversations = getConversations();
        //Si ya existe conversacion previa
        if (conversation) {
            conversations = conversations.map((c) => {
                if (c.from === conversation.from) {
                    return Object.assign(Object.assign({}, c), { template_type,
                        template_id,
                        date });
                }
                return c;
            });
        }
        else {
            conversations.push({ from, template_id, template_type, date });
        }
        //Almacenamos todas las conversaciones
        saveConversations(conversations);
    }
    catch (error) {
        console.log(error);
    }
}
exports.setConversation = setConversation;
/*
* Esta funcion se encarga de almacenar las conversaciones en un archivo
*/
function saveConversations(conversations) {
    try {
        //Si es un array de conversaciones
        if (Array.isArray(conversations)) {
            //Eliminamos el archivo previo
            fs.unlinkSync(path.join(_BASEDIR_, CONVERSATIONS_FILES));
            // Obtiene el template para el mensaje
            fs.writeFileSync(path.join(_BASEDIR_, CONVERSATIONS_FILES), JSON.stringify(conversations));
        }
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=conversations.js.map