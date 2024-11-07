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
  isloggedIn = false;
  isLoginPage = false
  user!:any 
 
  ngOnInit(): void {

    this.checkCurrentRoute();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Solo escuchar cuando la navegación ha terminado
    ).subscribe(() => {
      this.checkCurrentRoute();
    });
    this.isloggedIn = this.loginS.isLoggedIn();
    
    this.user = this.loginS.getUser()
    this.loginS.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isloggedIn = this.loginS.isLoggedIn()
        this.user = this.loginS.getUser()
      }
    )
  }
  
  public logOut(){
    this.loginS.logOut()
  }

  public volver(){
    this.router.navigate(['/home'])
  }
  checkCurrentRoute(): void {
    // Detectar si la URL actual es la página de login o relacionada
    this.isLoginPage = this.router.url.startsWith('/auth/login') || this.router.url.startsWith('/auth/identify');
  }
 
   
}
  
  
  



