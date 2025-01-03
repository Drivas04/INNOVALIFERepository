import { ApplicationConfig,  provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { tokenInterceptor } from './core/interceptores/token.interceptor';
import { ErrorInterceptorStatus } from './core/interceptores/errorstatus.interceptor';




export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor, ErrorInterceptorStatus])),
    provideAnimationsAsync()
  ]
};
