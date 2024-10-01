import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.interface';
import { ResponseAcceso } from '../../../core/models/responseAccess.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

http = inject(HttpClient)
router = inject(Router)

private apiUrl = `${environment.apiUrl}`
//private urlRegister = `${environment.auth.registerUrl}`



}
