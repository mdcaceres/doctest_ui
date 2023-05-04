import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  checkUsername(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${username}`, {withCredentials: true})
  }

  getById(id: string): Observable<User> {
    return this.http.get(`${environment.apiUrl}/user/id/${id}`, {withCredentials: true})
  }

  updateToken(id: string, token: string): Observable<any> {
    let fcmToken = {v: token}
    return this.http.put(`${environment.apiUrl}/user/${id}`, fcmToken, {withCredentials: true})
  }
}
