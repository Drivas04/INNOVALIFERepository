import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../../modules/user/services/login.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const _loginService = inject(LoginService)
  let authReq =  req
  const token = _loginService.getToken()

  if(token != null){
    authReq = authReq.clone({
      setHeaders: {Authorization:`Bearer ${token}`}
    })
  }
  
  return next(authReq)
};
