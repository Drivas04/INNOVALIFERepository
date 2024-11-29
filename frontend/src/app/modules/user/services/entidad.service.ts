import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Entidad } from '../../../core/models/entidad.interace';
import { Personal } from '../../../core/models/personal.interface';

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

  getPersonalPorNit(nit: string): Observable<Personal[]> {
    return this.http.get<Personal[]>(`${this.apiUrl}/personal/lista-personal`)
      .pipe(
        map(personal => personal.filter(p => p.nitEntidad.nit === nit ))
      );
  }

  
}
