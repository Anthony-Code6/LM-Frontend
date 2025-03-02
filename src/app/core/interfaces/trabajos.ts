export interface Trabajos {
    idTrabajos: string;
    idUsuario: string;
    url: string;
    nombre: string;
    fecha: string;

    Tareas: Tareas[]
}

export interface Tareas {
    idTareas: string;
    idTrabajo: string;
    tarea: string;
    orden: number;
    estado: boolean;
}

export interface TareasArray {
    tarea: string;
    estado: boolean;
}

export interface TrabajoCreate {
    nombre: string;
    tareas: TareasArray[]
}

export interface TareaUpdStatus{
    idTareas: string;
    idTrabajo: string;
    estado: boolean; 
}