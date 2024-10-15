import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = 
[
    {path: '', component: HomepageComponent},
    {path: 'home', component: HomepageComponent},
    {path: 'user', loadChildren: () => import(`./modules/user/user.routes`).then(m => m.routes), canActivate: [authGuard]},
    {path: 'auth', loadChildren: () => import(`./modules/user/components/auth/auth.routes`).then(m => m.routes), canActivate: [authGuard]},
    {path:'**', redirectTo: 'home'}
];
