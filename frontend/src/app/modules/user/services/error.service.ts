import { inject, Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  
  private _snackBar = inject(SnackbarService)

  msjError(e: HttpErrorResponse) {
    if(e.error.mensaje) {
      this._snackBar.showSnackBar(`${e.error.mensaje}`, "OK")
    }else{
      this._snackBar.showSnackBar("Error en el servidor, intente de nuevo mas tarde", "OK")
    }
  }
}
