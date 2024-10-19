import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Entidad } from '../../../core/models/entidad.interace';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

    
  http = inject(HttpClient)
  router = inject(Router)

  private apiUrl = `${environment.apiUrl}`


  getListEntities(): Observable<Entidad[]>{
    return this.http.get<Entidad[]>(`${this.apiUrl}/entidad/lista-entidades`, )
  }

  
}
