import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent, FooterComponent, HomeheaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
