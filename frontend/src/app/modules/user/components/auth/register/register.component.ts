import { Component, inject, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../../core/models/user.interface';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { LoginService } from '../../../services/login.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FooterComponent, HomeheaderComponent, CommonModule,FormsModule, ReactiveFormsModule],
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
    password: ['', Validators.required],
    repeatPassword: ['', [Validators.required]]
  }, {validators: this.passwordMatchValidator})

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      form.get('repeatPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('repeatPassword')?.setErrors(null);
    }
  }
  
  

  
  ngOnInit(): void {
  }

  registerUser(){
   if(this.formRegistro.invalid) return;
   
   
 

   const objeto:User = {
    username: this.formRegistro.value.username,
    names: this.formRegistro.value.names,
    last_names: this.formRegistro.value.lastnames,
    phone: this.formRegistro.value.phone,
    email: this.formRegistro.value.email,
    password: this.formRegistro.value.password,
    repeatPassword: this.formRegistro.value.repeatPassword
   }
   
   
   this.userS.registerUser(objeto).subscribe({
    next: (data: any) => {
      const token = data.token
      if (data.token) {
        
        this._snackBar.showSnackBar("Has sido registrado con éxito", "OK");
        this.router.navigate(['/auth']);
      } else {
        
        this._snackBar.showSnackBar("Este usuario ya existe en nuestra base de datos, porfavor intenta con otro", "OK");
      }
    },
    error: (error) => {
      this._snackBar.showSnackBar("Error con el servidor, por favor intenta mas tarde", "OK")
      console.log("Error", error);
    }
  });
  
  
 

  }

  hasErrors(field: string, typeError: string) {
    return this.formRegistro.get(field)?.hasError(typeError) && this.formRegistro.get(field)?.touched;
  } 
}
