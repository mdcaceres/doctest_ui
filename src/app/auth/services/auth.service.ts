import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, user, { withCredentials: true })
  }

  signup(user:any) {
    return this.http.post<User>(`${environment.apiUrl}/auth/signup`, user, {withCredentials: true})
  }
}
