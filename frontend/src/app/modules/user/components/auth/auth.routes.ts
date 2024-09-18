import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import path from 'path';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = 
[ 
    {
        path: 'login',
        component:LoginComponent
    },
    { 
        path:'confirm',
        component:ConfirmationComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path: '**',
        redirectTo: '/auth/login'
    }


]