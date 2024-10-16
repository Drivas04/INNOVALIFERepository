// register.interceptor.ts


/*import {  HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('ErrorInterceptor caught an error');
      if (error.status === HttpStatusCode.Conflict) {
        // Usuario ya existe
        console.error('Error de registro:', error.error.mensaje);
      } else {
        console.error('Error no manejado:', error);
      }
      return throwError(() => error);
    })
  );
};*/