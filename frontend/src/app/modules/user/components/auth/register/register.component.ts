import { Component, inject, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../../core/models/user.interface';
import { CommonModule, NgClass } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent, FooterComponent, HomeheaderComponent, NgClass, CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  fb= inject(FormBuilder)
  userS = inject(LoginService)
  router = inject(Router)
  _snackBar = inject(SnackbarService)

  
  formRegistro: FormGroup = this.fb.group({
    username: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
    names: ['', [Validators.required]],
    lastnames: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  
  

  
  ngOnInit(): void {
  }

  registerUser(){
   if(this.formRegistro.invalid) return;

   const objeto:User = {
    username: this.formRegistro.value.username,
    names: this.formRegistro.value.names,
    lastnames: this.formRegistro.value.lastnames,
    phone: this.formRegistro.value.phone,
    email: this.formRegistro.value.email,
    password: this.formRegistro.value.password
   }
   
   this.userS.registerUser(objeto).subscribe({
    next: (data: any) => {
      const token = data.token
      if (data.token) {
        
        this._snackBar.showSnackBar("Has sido registrado con éxito", "OK");
        this.router.navigate(['/auth']);
      } else {
        
        this._snackBar.showSnackBar("Usuario ya existe", "OK");
      }
    },
    error: (error) => {
      
      console.log("Error", error);
    }
  });
  
  
 

  }

  hasErrors(field: string, typeError: string) {
    return this.formRegistro.get(field)?.hasError(typeError) && this.formRegistro.get(field)?.touched;
  } 
}
