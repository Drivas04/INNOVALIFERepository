import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.interface';
import { Login } from '../../../core/models/login.interface';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logins = inject(LoginService);
  http = inject(HttpClient);
  router = inject(Router);

  private apiUrl = `${environment.apiUrl}`;

  public updatePassword(email: string) {
    return this.http.put(
      `${this.apiUrl}/usuario/olvidoClave?email=${email}`,
      {},
      { responseType: 'text' }
    );
  }

  public updateData(cedula: string, updateData: any){
    return this.http.put(
      `${this.apiUrl}/usuario/actualizar-datos?cedula=${cedula}`,
      updateData
    )
  }

}
