import { HttpEvent, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { SnackbarService } from '../../modules/user/services/snackbar.service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(SnackbarService);
  const token = localStorage.getItem('jwt')
  if(token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  }

  return next(req)
};



