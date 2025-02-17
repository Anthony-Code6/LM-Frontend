export interface Notas {
    idNotas: string;
    idUsuario: string;
    url: string;
    titulo: string;
    nota: string;
    fecha: string;
}

export interface NotasCreate {
    titulo: string;
    nota: string;
}


export interface NotasUpdate {
    idNotas: string;
    titulo: string;
    nota: string;
}
