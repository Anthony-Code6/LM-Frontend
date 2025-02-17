export interface Proyectos {
    idProyectos: string;
    idUsuario: string;
    url: string;
    link: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    estado: boolean;

}

export interface ProyectosCreate {
    link: string;
    titulo: string;
    descripcion: string;
    estado: boolean;
}

export interface ProyectosUpdate {
    idProyectos: string;
    link: string;
    titulo: string;
    descripcion: string;
    estado: boolean;
}