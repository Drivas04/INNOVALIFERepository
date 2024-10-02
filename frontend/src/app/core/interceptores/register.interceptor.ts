// register.interceptor.ts

import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../../modules/user/services/snackbar.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('ErrorInterceptor caught an error');
      if (error.status === 409) {
        // Usuario ya existe
        console.error('Error de registro:', error.error.mensaje);
      } else {
        console.error('Error no manejado:', error);
      }
      return throwError(() => error);
    })
  );
};