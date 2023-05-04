import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Invitation } from '../interfaces/invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient) { }

  send(invitation: Invitation) {
    return this.http.post(`${environment.apiUrl}/project/invitation`, invitation, {withCredentials:true})
  }


}
