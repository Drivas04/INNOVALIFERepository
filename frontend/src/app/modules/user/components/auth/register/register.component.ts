import { Component, inject, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../../core/models/user.interface';
import { CommonModule, NgClass } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LoginComponent, FooterComponent, HomeheaderComponent, NgClass, CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  
  fb= inject(FormBuilder)
  userS = inject(UserService)
  router = inject(Router)

  
  formRegistro: FormGroup = this.fb.group({
    username: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    names: ['', [Validators.required]],
    lastnames: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  
  

  
  ngOnInit(): void {
  }

  

  registerSubmit(){
    console.log(this.formRegistro.value)
  }

  registerUser(){
    
  }

  
}
