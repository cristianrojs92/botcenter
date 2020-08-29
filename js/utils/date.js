"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToDate = exports.decrDate = exports.incrDate = exports.readableTime = exports.toUnixtime = exports.getUnixtime = exports.getTime = exports.get = void 0;
/**
 * Obtiene la fecha actual del sistema con el formato especificado por parametro
 *
 * @param format              YYYYMMDD (numero)
 *                            YYYYMMDDHHMMSS (numero)
 *
 * @return                    fecha actual del sistema
 *
 */
function get(format) {
    let d = new Date();
    if (format === undefined || format === 'YYYYMMDD') {
        let date = 0;
        date = d.getFullYear() * 10000;
        date += (d.getMonth() + 1) * 100;
        date += d.getDate();
        return date;
    }
    else if (format === 'YYYYMMDDHHMMSS') {
        let date = 0;
        date = d.getFullYear() * 10000000000;
        date += (d.getMonth() + 1) * 100000000;
        date += d.getDate() * 1000000;
        date += d.getHours() * 10000;
        date += d.getMinutes() * 100;
        date += d.getSeconds();
        return date;
    }
}
exports.get = get;
/**
 * Obtiene la hora actual con el formato especificado por parametro
 *
 * @param format              HHMMSS (numero)
 *                            HHMM (numero)
 *
 * @return                    hora actual del sistema
 *
 */
function getTime(format) {
    let d = new Date();
    if (format === undefined || format === 'HHMMSS') {
        let time = 0;
        time += d.getHours() * 10000;
        time += d.getMinutes() * 100;
        time += d.getSeconds();
        return time;
    }
    else if (format === 'HHMM') {
        let time = 0;
        time += d.getHours() * 100;
        time += d.getMinutes();
        return time;
    }
}
exports.getTime = getTime;
/**
 * Retorna la cantidad de sec 1 January 1970 00:00:00 UTC.
 *
 * @return                    unixtime
 *
 */
function getUnixtime() {
    return Math.round((new Date()).getTime() / 1000);
}
exports.getUnixtime = getUnixtime;
/**
 * Convierte un timestamp a formato unix timestamp
 *
 * @param timestamp           en formato YYYYMMDDHHMMSS
 *
 * @return                    unixtime
 *
 */
function toUnixtime(timestamp, timezone) {
    if (timezone === undefined) {
        timezone = '-03:00'; // Argentina/Buenos_Aires
    }
    const iso = `${timestamp.slice(0, 4)}-${timestamp.slice(4, 6)}-${timestamp.slice(6, 8)}T${timestamp.slice(8, 10)}:${timestamp.slice(10, 12)}:${timestamp.slice(12, 14)}${timezone}`;
    let date = new Date(iso);
    return Math.round(date.getTime() / 1000);
}
exports.toUnixtime = toUnixtime;
/**
 * Retorna la letra que corresponde al dia de la semana
 *
 * @param date                objeto Date o undefined para la fecha actual
 *
 * @return                    letra que corresponda ("D", "L", "M", "X", "J", "V", "S")
 *
 */
exports.getDayLetter = function (date) {
    let days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    if (date === undefined) {
        date = new Date();
    }
    // Retorna el dia de la semana
    return days[date.getDay()];
};
/**
 * Obtiene una fecha en formato legible
 *
 * @param date                en formato YYYYMMDD o YYYYMMDDHHMMSS (numero)
 * @param full                true si incluye la hora (default false)
 *
 * @return                    fecha legible (DD/MM/YYYY)
 *
 */
exports.readable = function (date, full) {
    try {
        let tmp = '';
        // Si la fecha no esta definida la obtiene
        if (date === undefined) {
            tmp = get('YYYYMMDDHHMMSS').toString();
        }
        else {
            tmp = date;
        }
        // Si no es una fecha full
        if (full === undefined || full === false) {
            return `${tmp.slice(6, 8)}/${tmp.slice(4, 6)}/${tmp.slice(0, 4)}`;
        }
        else {
            return `${tmp.slice(6, 8)}/${tmp.slice(4, 6)}/${tmp.slice(0, 4)} ${tmp.slice(8, 10)}:${tmp.slice(10, 12)}:${tmp.slice(12, 14)}`;
        }
    }
    catch (err) {
        console.error(`date.js (readable): (${err.stack})`);
    }
    return date;
};
/**
 * Obtiene una hora en formato legible
 *
 * @param date                en formato YYYYMMDD o YYYYMMDDHHMMSS (numero)
 *
 * @return                    hora legible (HH:MM:SS)
 *
 */
function readableTime(date) {
    try {
        let tmp = '';
        // Si la fecha no esta definida la obtiene
        if (date === undefined) {
            tmp = get('YYYYMMDDHHMMSS').toString();
        }
        else {
            tmp = date;
        }
        return `${tmp.slice(8, 10)}:${tmp.slice(10, 12)}:${tmp.slice(12, 14)}`;
    }
    catch (err) {
        console.error(`date.js (readableTime): (${err.stack})`);
    }
    return date;
}
exports.readableTime = readableTime;
/**
 * Incrementa y retorna un string de fecha con formato YYYYMMDD
 *
 * @param date                en formato YYYYMMDD
 * @param days                cantidad de dias a adicionar
 *
 * @return                    fecha incrementada en un dia YYYYMMDD
 *
 */
function incrDate(date, days) {
    try {
        let new_date = 0;
        let tmp = date;
        // Obtiene el objeto de fecha
        let d = new Date(parseInt(tmp.slice(0, 4)), parseInt(tmp.slice(4, 6)) - 1, parseInt(tmp.slice(6, 8)));
        d.setDate(d.getDate() + days);
        // Compone la nueva fecha
        new_date = d.getFullYear() * 10000;
        new_date += (d.getMonth() + 1) * 100;
        new_date += d.getDate();
        return new_date;
    }
    catch (err) {
        console.error(`date.js (incrDate): error (${err.stack})`);
    }
    return date;
}
exports.incrDate = incrDate;
/**
 * Decrementa y retorna un string de fecha con formato YYYYMMDD
 *
 * @param date                en formato YYYYMMDD
 * @param days                cantidad de dias a adicionar
 *
 * @return                    fecha incrementada en un dia YYYYMMDD
 *
 */
function decrDate(date, days) {
    try {
        let new_date = 0;
        let tmp = date;
        // Obtiene el objeto de fecha
        let d = new Date(parseInt(tmp.slice(0, 4)), parseInt(tmp.slice(4, 6)) - 1, parseInt(tmp.slice(6, 8)));
        d.setDate(d.getDate() - days);
        // Compone la nueva fecha
        new_date = d.getFullYear() * 10000;
        new_date += (d.getMonth() + 1) * 100;
        new_date += d.getDate();
        return new_date;
    }
    catch (err) {
        console.error(`date.js (decrDate): error (${err.stack})`);
    }
    return date;
}
exports.decrDate = decrDate;
/**
 * Retorna un objeto Date a partir de un string
 *
 * @param date                en formato YYYYMMDDHHMMSS
 *
 * @return                    objeto Date
 *
 */
function stringToDate(date) {
    try {
        let year = Number(date.substring(0, 4));
        let month = Number(date.substring(4, 6));
        let day = Number(date.substring(6, 8));
        let hour = Number(date.substring(8, 10));
        let minutes = Number(date.substring(10, 12));
        let seconds = Number(date.substring(12, 14));
        return new Date(year, month - 1, day, hour, minutes, seconds);
    }
    catch (err) {
        console.error(`date.js (stringToDate): (${err.stack})`);
    }
    return date;
}
exports.stringToDate = stringToDate;
/**
 * Retorna true si es el ultimo dia del mes
 *
 * @param date                en formato YYYYMMDDHHMMSS
 *
 * @return                    true o false
 *
 */
exports.isLastDayofMonth = function (date) {
    try {
        let tmp = date.toString();
        let year = Number(tmp.substring(0, 4));
        let month = Number(tmp.substring(4, 6));
        let day = Number(tmp.substring(6, 8));
        // Obtiene el ultimo dia del mes
        let lastDay = new Date(year, month, 0).getDate();
        return (day == lastDay);
    }
    catch (err) {
        console.error(`date.js (isLastDayofMonth): (${err.stack})`);
    }
    return false;
};
//# sourceMappingURL=date.js.map