import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)

  constructor(){}

  public NewUser(user:any){
    
  }


}
