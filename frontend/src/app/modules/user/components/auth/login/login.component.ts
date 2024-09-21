import { Component, inject, OnInit } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';




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

  form: FormGroup = this.fb.group({
    cedula: ['', [Validators.required, Validators.minLength(10)]],
    contraseña: ['', Validators.required]
  })

  
  
  ngOnInit(): void {  
  }
   
  
  formSubmit(){
    console.log(this.form.value)
  } 

  hasErrors(field: string, typeError: string) {
    return this.form.get(field)?.hasError(typeError) && this.form.get(field)?.touched;
    }

}
