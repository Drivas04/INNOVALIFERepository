// errorStatus.interceptor.ts


import {  HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const ErrorInterceptorStatus: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        // Error de autenticación
        return throwError(() => new Error('Credenciales invalidas, por favor ingresa bien tus credenciales'));
      }
      // Manejar otros tipos de errores
      return throwError(() => new Error('Error con el servidor, por favor intenta mas tarde'));
    })
  );

}


