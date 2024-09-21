import { Component, inject, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../../core/models/user.interface';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent, FooterComponent, HomeheaderComponent, NgClass, CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  fb= inject(FormBuilder)
  
  formRegistro: FormGroup = this.fb.group({
    cedula: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    contraseña: ['', Validators.required]
  })
  
  ngOnInit(): void {
  }

  registerSubmit(){

    console.log(this.formRegistro.value)
  }
}
