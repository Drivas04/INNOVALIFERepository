import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Cita } from '../../../core/models/cita.interface';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private citaData: any = {}
  
  http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}`
  

  constructor() { }

  setCitaData(data: any) {
    this.citaData = { ...this.citaData, ...data}
  }
  
  
  obtenerMisCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/citas/mis-citas`);
  }

  
  agendarCita(citaPayload: any) {
    return this.http.post(`${this.apiUrl}/citas/agendar-cita`, citaPayload , {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  

}


