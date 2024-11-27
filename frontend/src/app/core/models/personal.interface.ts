import { Entidad } from "./entidad.interace";

export interface Personal {
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    email: string;
    cargo: string;
    nitEntidad: Entidad;
  }