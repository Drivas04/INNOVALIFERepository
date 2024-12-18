import { Component, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { LoginService } from '../../../services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, ReactiveFormsModule, ],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  
  
  perfilForm: FormGroup;

  constructor(private loginS: LoginService, private fb: FormBuilder){
      this.perfilForm = this.fb.group({
        nombre:[''],
        apellido: [''],
        email: [''],
        telefono: ['']
      })  
  }
  
  ngOnInit(): void {
    this.loginS.usuarioActual$.subscribe((usuario: any | null) => {
      if (usuario) {
        this.perfilForm.patchValue({
          nombre: usuario.names,
          apellido: usuario.lastNames,
          email: usuario.email,
          telefono: usuario.phone,
        });
      }
    });
  }


}
