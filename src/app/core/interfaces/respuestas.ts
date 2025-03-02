import { Notas } from "./notas";
import { Proyectos } from "./proyectos";
import { Trabajos } from "./trabajos";

export interface Respuestas {
    exito: boolean;
    mensajeError: string;
    mensaje?: string;
    _token?: string;
    _notas?: Notas[] | Notas
    _proyectos?: Proyectos[] | Proyectos
    _trabajo?: Trabajos[] | Trabajos
}
