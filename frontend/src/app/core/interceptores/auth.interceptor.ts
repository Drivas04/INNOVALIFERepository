import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginService } from '../../modules/user/services/login.service';
import { catchError, Observable, throwError,  } from 'rxjs';
import { SnackbarService } from '../../modules/user/services/snackbar.service';


export const LoginErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const _snackBar = inject(SnackbarService)
  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        _snackBar.showSnackBar('Credenciales incorrectas', 'OK');
      } else if (error.status === 403) {
        _snackBar.showSnackBar('Acceso denegado', 'OK');
      } else {
        console.log('Error en el login:', error.message);
      }
      return throwError(() => error);
    })
  );
};

