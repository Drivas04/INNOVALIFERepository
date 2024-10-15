import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../../modules/user/services/login.service';


export function authGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
  const router = inject(Router);
  const authService = inject(LoginService);

  if (authService.isLoggedIn()) {
    if (state.url.startsWith('/auth')) {
      // Usuario autenticado intentando acceder a rutas de autenticación
      return router.createUrlTree(['/user']);
    }
    return true;
  }

  if (state.url.startsWith('/user')) {
    // Usuario no autenticado intentando acceder a rutas protegidas
    return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url }});
  }

  return true;
}
