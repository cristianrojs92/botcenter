"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.absolute_path = exports.base = void 0;
// Componentes
const path = require("path");
// Dependencias
const config_1 = require("../config");
// Constantes
const _BASEDIR_ = path.join(path.dirname(__filename), '..');
/**
 * Retorna el path absoluto al directorio base
 *
 * @return                    path absoluto normalizado
 *
 */
function base() {
    return _BASEDIR_;
}
exports.base = base;
/**
 * Retorna el path absoluto al directorio/archivo
 *
 * @param p                   path a normalizar
 *
 * @return                    path absoluto normalizado
 *
 */
function absolute_path(p) {
    return path.join(_BASEDIR_, p);
}
exports.absolute_path = absolute_path;
/**
 * Retorna el path absoluto al directorio de configuraciones
 *
 * @return                    path absoluto normalizado
 *
 */
function config() {
    if (config_1.DEV === true) {
        return path.join(_BASEDIR_, "../dist/etc/");
    }
    else {
        return path.join(_BASEDIR_, "../etc/");
    }
}
exports.config = config;
//# sourceMappingURL=file.js.map