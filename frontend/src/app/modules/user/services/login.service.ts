import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.interface';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Login } from '../../../core/models/login.interface';
import { ResponseAcceso } from '../../../core/models/responseAccess.interface';
import { response } from 'express';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubjec = new Subject<boolean>();
  
  private userKey = 'user'
  private tokenKey = 'jwt'
  private apiUrl = `${environment.apiUrl}`

  constructor(private http: HttpClient, private router: Router, private localStorageS:LocalStorageService) { }

  //iniciar sesion y establecer el token en localStorage
 
  public loginUser(user: Login): Observable<Login>{
    return this.http.post<Login>(`${this.apiUrl}/auth/login`, user)
  }
  
  registerUser(user: User): Observable<User>{
    return this.http.post<any>(`${this.apiUrl}/auth/registrate`, user) 
   }

   getCurrentUser(){
    return this.http.get(`${this.apiUrl}/auth/usuario-actual`)
   }

  public setToken(token: string){
    this.localStorageS.set(`${this.tokenKey}`, token)
    return true
  }

  //validar que el usuario este conectado
  public isLoggedIn(): boolean{
    
    const tokenStr = this.localStorageS.get(this.tokenKey);
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false
    }else{
      return true
    }
  
  }

  //cerrar sesion y eliminar token


  public logOut(){
    this.localStorageS.remove(this.tokenKey);
    this.localStorageS.remove(this.userKey);   
    this.router.navigate(['/auth']) 
  } 

  //obtener token
  public getToken(){
    return localStorage.getItem(this.tokenKey)
  }
  //dar usuario al localStorage
  public setUser(user: any){
    return this.localStorageS.set('user', JSON.stringify(user));
  }

  //dar el usuario
  getUser() {
    if(this.userKey != null){
      return JSON.parse(this.localStorageS.get(this.userKey)!)
    }else{
      this.logOut()
      return null
    }
      // Aquí puedes acceder de manera segura al localStorage
      // Manejar el caso cuando no se encuentra el localStorage
    
  }

  



}
