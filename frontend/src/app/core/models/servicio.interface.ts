import { Entidad } from "./entidad.interace";

export interface Servicio{
    id: number;
    nombre: string;
    descripcion: string;
    nitEntidad: Entidad;
}