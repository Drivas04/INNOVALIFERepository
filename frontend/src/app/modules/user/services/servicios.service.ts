import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Servicio } from '../../../core/models/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}`
  private router = inject(Router)

  
  getAllServices(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/servicios/listaServicios`)
  }
  
     
}
