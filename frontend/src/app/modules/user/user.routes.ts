import { Routes } from '@angular/router';
import { UserhomeComponent } from './components/homeuser/userhome/userhome.component';
import { UseractivityComponent } from './components/activityuser/useractivity/useractivity.component';
import { ServicesuseComponent } from './components/formuser/servicesuse/servicesuse.component';
import { ScheduleappoinmentComponent } from './components/formuser/scheduleappoinment/scheduleappoinment.component';
import { DataappoinmentComponent } from './components/formuser/dataappoinment/dataappoinment.component';
import { DataconfirmComponent } from './components/formuser/dataconfirm/dataconfirm.component';
import { UserprofileComponent } from './components/profile/userprofile/userprofile.component';

export const routes:Routes=
[ 
    {path: 'userhome', component: UserhomeComponent},
    {path: 'activity', component: UseractivityComponent},
    {path: 'profile', component: UserprofileComponent},
    {path: 'services', component: ServicesuseComponent},
    {path: 'form' , component: ScheduleappoinmentComponent},
    {path: 'data', component: DataappoinmentComponent},
    {path: 'dataconfirm', component: DataconfirmComponent},
    {path: '**', redirectTo: '/user/userhome'}
]
