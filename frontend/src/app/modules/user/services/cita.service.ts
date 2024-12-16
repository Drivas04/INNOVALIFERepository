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
  
  
  obtenerMisCitas(page: number, size: number): Observable<{content: Cita[]; totalElements: number; totalPages: number}> {
    return this.http.get<{content: Cita[]; totalElements: number; totalPages: number }>(`${this.apiUrl}/citas/mis-citas?page=${page}&size=${size}`);
  }

  
  agendarCita(citaPayload: any) {
    return this.http.post(`${this.apiUrl}/citas/agendar-cita`, citaPayload , {
      headers: { 'Content-Type': 'application/json' },
    });   
  }

  deleteCita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/citas/eliminar-cita/${id}`);
  }
  
  

}


