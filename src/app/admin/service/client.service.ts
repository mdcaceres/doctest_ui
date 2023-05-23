import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  create(client: any, userId: string) {
    return this.http.post(`${environment.apiUrl}/clients/${userId}`, client, {withCredentials: true});
  }

  getAll(userId: string) {
    return this.http.get(`${environment.apiUrl}/clients/${userId}`, {withCredentials: true});
  }
}
