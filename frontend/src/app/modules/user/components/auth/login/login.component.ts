import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { FormBuilder, FormControl, FormGroup, NgControl, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

 

  constructor(private formb:FormBuilder){}

  formLogin = new FormGroup({
     email: new FormGroup('', Validators.required)
  })

  ngOnInit(): void {
  }

  formBuilder(){
    console.log(this.formLogin.value)
  } 

  

}
