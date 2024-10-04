import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { HomeheaderComponent } from '../homeheader/homeheader.component';
import { FooterComponent } from '../footer/footer.component';

import { LoginService } from '../../../modules/user/services/login.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  ngOnInit(): void {

  }
  
  loginS = inject(LoginService)
  router = inject(Router)

navigate(){
  if(this.loginS.isLoggedIn()){
    this.router.navigate(['/user/userhome'])
  }else{
    this.router.navigate(['/auth'])
  }
}
}

