import { Component, inject, runInInjectionContext } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, FormsModule, RouterLink, SpinnerComponent, NgIf],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {

  userS = inject(UserService)
  _snackbar = inject(SnackbarService)
  router = inject(Router)
  loading: boolean = false
  email = ''
  

  updatePasswords(){
    this.loading = true
    this.userS.updatePassword(this.email).subscribe({
      next: (data) => {
        this.loading = false
        console.log(data)
      },
      error: (err) => {
        this.loading = false
        console.log(err)
      },
      complete: () => {
        this._snackbar.showSnackBar("Correo enviado con exito, revisa tu bandeja de entrada", "OK")
        
      }
    })
  }



}
