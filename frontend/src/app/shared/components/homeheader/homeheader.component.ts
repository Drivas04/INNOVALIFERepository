import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../modules/user/services/login.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-homeheader',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './homeheader.component.html',
  styleUrl: './homeheader.component.css'
})
export class HomeheaderComponent  implements OnInit{
  
  loginS = inject(LoginService)
  router = inject(Router)
  isloggedIn = false
 
  ngOnInit(): void {
    this.isloggedIn = this.loginS.isLoggedIn();
    this.loginS.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isloggedIn = this.loginS.isLoggedIn()
      }
    )
  }
  
  public logOut(){
    this.loginS.logOut()
  }
 
   
}
  
  
  



