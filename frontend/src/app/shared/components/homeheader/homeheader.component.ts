
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { LoginService } from '../../../modules/user/services/login.service';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../../modules/user/components/auth/login/login.component';

@Component({
  selector: 'app-homeheader',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './homeheader.component.html',
  styleUrl: './homeheader.component.css'
})
export class HomeheaderComponent  implements OnInit{

  nombreUsuario: string = '';
  private subscription!: Subscription;
  loginS = inject(LoginService)
  router = inject(Router)
  isloggedIn = false;
  isLoginPage = false
  user:any 
  isOpen = false;
  

 
  ngOnInit(): void {
    this.subscription = this.loginS.usuarioActual$
    .subscribe(usuario => {
      this.nombreUsuario = usuario ? usuario.names : '';
    });
    
    this.checkCurrentRoute();
    this.isloggedIn = this.loginS.isLoggedIn();

    this.loginS.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isloggedIn = this.loginS.isLoggedIn()
      }
    )
  }


  ngOnDestroy() {
    this.subscription!.unsubscribe();
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
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
 
  getProfile(){
    this.router.navigate(['/user/profile'])
  }

  getActivities(){
    this.router.navigate(['/user/activity'])
  }
   
}
  
  
  



