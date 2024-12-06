import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.interface';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Login } from '../../../core/models/login.interface';

import { LocalStorageService } from './localstorage.service';
import { currentUser } from '../../../core/models/currentuser.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();
  private usuarioActualSubject = new BehaviorSubject<any>(null);
  usuarioActual$ = this.usuarioActualSubject.asObservable();
 
  
  
  private userKey = 'usuario'
  private tokenKey = 'jwt'
  private apiUrl = `${environment.apiUrl}`


  constructor(private http: HttpClient, private router: Router, private localStorageS:LocalStorageService) {
    const usuarioAlmacenado = localStorage.getItem(this.userKey);
    if (usuarioAlmacenado) {
      this.usuarioActualSubject.next(JSON.parse(usuarioAlmacenado));
    }
   }

  //iniciar sesion y establecer el token en localStorage
  setUsuarioActual(usuario: any) {
    
    localStorage.setItem(this.userKey, JSON.stringify(usuario));
    this.usuarioActualSubject.next(usuario);
  }

  getUsuarioActual(): any {
    return this.usuarioActualSubject.value;
  }

  clearUsuarioActual() {
    localStorage.removeItem(this.userKey);
    this.usuarioActualSubject.next(null);
  }
 
  public loginUser(user: Login): Observable<Login>{
    return this.http.post<Login>(`${this.apiUrl}/auth/login`, user)
  }
  
  registerUser(user: User): Observable<User>{
    return this.http.post<any>(`${this.apiUrl}/auth/registrate`, user) 
   }

   getCurrentUser(){
    return this.http.get<currentUser>(`${this.apiUrl}/auth/usuario-actual`)
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
    localStorage.setItem(this.userKey, JSON.stringify(user));
    return true
  }

  //dar el usuario
  getUser() {   
    return JSON.parse(localStorage.getItem(this.userKey)!) 
  }

  



}
