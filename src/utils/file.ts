  // Componentes
  import * as path from "path";

  // Dependencias
  import { DEV } from "../config"

  // Constantes
  const _BASEDIR_ : string = path.join(path.dirname(__filename), '..');



  /**
   * Retorna el path absoluto al directorio base
   *
   * @return                    path absoluto normalizado
   *
   */
  export function base() : string{
    return _BASEDIR_;
  }

  /**
   * Retorna el path absoluto al directorio/archivo
   *
   * @param p                   path a normalizar
   *
   * @return                    path absoluto normalizado
   *
   */
  export function absolute_path(p : string) : string{
    return path.join(_BASEDIR_, p);
  }

  /**
   * Retorna el path absoluto al directorio de configuraciones
   *
   * @return                    path absoluto normalizado
   *
   */
  export function config() : string {

    if (DEV === true) {
      return path.join(_BASEDIR_, "../dist/etc/");
    } 
    else {
      return path.join(_BASEDIR_, "../etc/");
    }

  }

