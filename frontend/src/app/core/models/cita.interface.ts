import { Entidad } from "./entidad.interace";

export interface Cita {
    id: number;
    fechaRegistro: string;
    fechaCita: string;
    estado: string;
    usernameUsuario: {
      username: string;
      names: string;
    };
    idServicio: {
      id: number;
      nombre: string;
      nitEntidad: Entidad
    };

    
}
