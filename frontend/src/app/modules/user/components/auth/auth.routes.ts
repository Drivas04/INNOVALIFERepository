import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import path from 'path';
import { RegisterComponent } from './register/register.component';
import { authGuard } from '../../../../core/guards/auth.guard';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';

export const routes: Routes = 
[ 
    {
        path: 'login',
        component:LoginComponent,
        
    },
    { 
        path:'confirm',
        component:ConfirmationComponent
    },
    {
        path:'register',
        component: RegisterComponent,
        
    },
    {
        path:'identify',
        component: RecuperacionComponent
    },
    {
        path: '**',
        redirectTo: '/auth/login'
    }


]