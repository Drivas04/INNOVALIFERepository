import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Login } from '../../../../../core/models/login.interface';
import { LoginService } from '../../../services/login.service';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, ReactiveFormsModule, RouterLink, CommonModule, NgClass, FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  value!:string
  
  fb = inject(FormBuilder);
  loginS = inject(LoginService)
  router = inject(Router)

  formLogin: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
    password: ['', Validators.required]
  })
  
  
  
  ngOnInit(): void {  
  }
  
  
  formSubmit(){
    console.log(this.formLogin.value)
  } 
  
  
  userLogin(){
    if(this.formLogin.invalid) return;
    
    const objeto:Login = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    }
    
    this.loginS.loginUser(objeto).subscribe({
      next: (data: any) =>{
       const token = data.token
       const user = data.user
       this.loginS.setToken(token)
       this.loginS.setUser(user)
       console.log(data)
       this.router.navigate(['/user/userhome'])
      },
      error: (err) => {
        alert('Credenciales incorrectas')
        console.log(err)
      }
    })
    
    
    
    
  }
  
  hasErrors(field: string, typeError: string) {
    return this.formLogin.get(field)?.hasError(typeError) && this.formLogin.get(field)?.touched;
  }
  
}
