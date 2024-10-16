import { HttpEvent, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { SnackbarService } from '../../modules/user/services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(SnackbarService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      

      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            snackBar.showSnackBar('Credenciales incorrectas', "Ok")
            break;
          case 403:
            snackBar.showSnackBar('Credenciales incorrectas', "Ok")
            break;
          case 409:
            snackBar.showSnackBar('El usuario ya existe', "Ok")
            break;                    
          default:
            snackBar.showSnackBar("Error inesperado","OK")
        }

        // Mostrar snackbar con el error
        snackBar.showSnackBar("Error, credenciales invalidas", "OK")
      }

      return throwError(error);
    })
  );
};



