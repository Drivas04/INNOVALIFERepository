import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

http = inject(HttpClient)
router = inject(Router)

private apiUrl = `${environment.apiUrl}`


public updatePassword(email:string){
  return this.http.put(`${this.apiUrl}/usuario/olvidoClave?email=${email}`, {}, { responseType: 'text' })
}


}
