import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const routes: Routes = 
[ 
    {
        path: 'login',
        component:LoginComponent
    },
    { 
        path:'confirmar',
        component:ConfirmationComponent
    },
    {
        path: '**',
        redirectTo: '/auth/login'
    }


]