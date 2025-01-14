import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { LoginService } from '../../../services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent implements OnInit {
  userS = inject(UserService);
  perfilForm: FormGroup;
  username: string = '';

  constructor(private loginS: LoginService, private fb: FormBuilder, private router: Router) {
    this.perfilForm = this.fb.group({
      names: ['', Validators.required],
      lastNames: ['',  Validators.required],
      email: ['',  Validators.required],
      phone: ['',  Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginS.usuarioActual$.subscribe((usuario: any | null) => {
      if (usuario) {
        this.perfilForm.patchValue({
          names: usuario.names,
          lastNames: usuario.lastNames,
          email: usuario.email,
          phone: usuario.phone,
        });
      }
    });
    this.loadUsername()
    
  }

  loadUsername(){
    this.loginS.usuarioActual$.subscribe((usuario : any | null) => {
      if(usuario){
        this.username = usuario.username
      }
    })
  }

  updateData(): void {
    
    if(this.perfilForm.valid){
      this.userS.updateData(this.username, this.perfilForm.value).subscribe({
        next: (data: any) => {
          
        // Actualiza el usuario en el localStorage
        localStorage.setItem(this.loginS.userKey, JSON.stringify(data));

        // Actualiza el BehaviorSubject para notificar a toda la aplicación
        this.loginS.usuarioActualSubject.next(data);

        // Actualiza el formulario con los datos actualizados
        this.perfilForm.patchValue({
          nombre: data.names,
          apellido: data.lastNames,
          email: data.email,
          telefono: data.phone,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tu perfil ha sido actualizado",
          showConfirmButton: false,
          timer: 1500
        });
          this.router.navigate(['/home'])
        },
        error: (err) => {
          console.log("Error", err)
        }
      }
       
      )
    }
 }
}
