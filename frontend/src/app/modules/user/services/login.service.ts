import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Login } from '../../../core/models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  getUserInfo(): any {
    throw new Error('Method not implemented.');
  }

  private tokenKey = 'jwt'
  private apiUrl = `${environment.apiUrl}`

  constructor(private http: HttpClient, private router: Router) { }

  //iniciar sesion y establecer el token en localStorage
 
  public loginUser(user: Login): Observable<Login>{
    return this.http.post<Login>(`${this.apiUrl}/auth/login`, user)
  }

  public setToken(token: string){
    localStorage.setItem(`${this.tokenKey}`, token)
    return true
  }

  //validar que el usuario este conectado
  public isLoggedIn(){
    let tokenStr = localStorage.getItem(this.tokenKey);
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false
    }else{
      return true
    }
  }

  //cerrar sesion y eliminar token


  public logOut(){
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth'])
    
  }

  //obtener token
  public getToken(){
    return localStorage.getItem(this.tokenKey)
  }
  //dar usuario al localStorage
  public setUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //dar el usuario
  public getUser(){ 
  let userStr = localStorage.getItem('user')
  
  //validar si existe el suaurio, sino cerrar sesion
  if(userStr != null){
    return JSON.parse(userStr)
   }else{
    this.logOut
    return null
   }
  }

  



}
