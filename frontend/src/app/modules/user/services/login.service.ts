import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenKey = 'jwt'

  constructor(private http: HttpClient, private router: Router) { }

  //generar token
  public generateToken(loginData:any){
    return this.http.post(`https://reqres.in/api/login`, loginData)
  }

  //iniciar sesion y establecer el token en localStorage

  public loginUser(token:any){
    localStorage.setItem(`${this.tokenKey}`, token)
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

  //pasarle el usuario logeado
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user))
  }

  //cerrar sesion y eliminar token


  public logOut(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user')
    this.router.navigate(['/auth'])
    
  }

  //obtener token
  public getToken(){
    return localStorage.getItem(this.tokenKey)
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
