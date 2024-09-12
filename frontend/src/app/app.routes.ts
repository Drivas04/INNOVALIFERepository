import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/components/homepage/homepage.component';


export const routes: Routes = 
[
    {path: '', component: HomepageComponent},
    {path: 'home', component: HomepageComponent},
    {path: 'auth', loadChildren: () => import(`./modules/user/components/auth/auth.routes`).then(m => m.routes)},
    {path:'**', redirectTo: 'home'}
];
