import { Component, inject, OnInit, signal } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass,  } from '@angular/common';
import { Login } from '../../../../../core/models/login.interface';
import { LoginService } from '../../../services/login.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { UserService } from '../../../services/user.service';
import { error } from 'console';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, ReactiveFormsModule, RouterLink, CommonModule, NgClass, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  hide = signal(true);
  snackBars= inject(SnackbarService)
  fb = inject(FormBuilder);
  loginS = inject(LoginService)
  router = inject(Router)
  
  formLogin: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
    password: ['', Validators.required]
  })
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  
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
        if(data.token) {
          this.loginS.setToken(token); 
          this.router.navigate(['/user/userhome'])
          this.snackBars.showSnackBar("Bienvenido¡¡", "OK")
        }
        this.loginS.getCurrentUser().subscribe({
          next: (user: any) => {
            this.loginS.setUser(user)     
          }
        })
       
      },     
      error: (err) => {   
        this.snackBars.showSnackBar(err.message, "OK")
        
      },
      
    })
    
    
    
    
  }
  
  hasErrors(field: string, typeError: string) {
    return this.formLogin.get(field)?.hasError(typeError) && this.formLogin.get(field)?.touched;
  }
  
}
