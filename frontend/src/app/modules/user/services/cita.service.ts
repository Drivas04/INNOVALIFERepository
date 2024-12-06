import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

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

  getCitaData(): any {
    return this.citaData
  }

  clearCitaData() : void {
    this.citaData = {}
  }

  agendarCita(citaPayload: any) {
    return this.http.post(`${this.apiUrl}/citas/agendar-cita`, citaPayload , {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
