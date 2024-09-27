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
  
  isAuthenticated: boolean = false;
  userInfo: any = null;

  ngOnInit(): void {
   
  }
  
  
  logout(): void {
    this.loginS.logOut;
    this.router.navigate(['/auth']);
  }
}


