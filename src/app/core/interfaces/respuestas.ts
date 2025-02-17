import { Notas } from "./notas";
import { Proyectos } from "./proyectos";

export interface Respuestas {
    exito: boolean;
    mensajeError: string;
    mensaje?: string;
    _token?: string;
    _notas?: Notas[] | Notas
    _proyectos?: Proyectos[] | Proyectos
}
