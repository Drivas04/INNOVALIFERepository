import { Component, inject } from '@angular/core';
import { HomeheaderComponent } from '../../../../../shared/components/homeheader/homeheader.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [HomeheaderComponent, FooterComponent, FormsModule, RouterLink],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {

  userS = inject(UserService)
  _snackbar = inject(SnackbarService)

  email = ''
  

  updatePasswords(){
    console.log("Email", this.email)
    this.userS.updatePassword(this.email).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this._snackbar.showSnackBar("Correo enviado con exito, revisa tu bandeja de entrada", "OK")
      }
    })
  }



}
