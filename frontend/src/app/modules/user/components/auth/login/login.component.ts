import { Component } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
