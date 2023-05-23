import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmailData } from '../interfaces/email_data';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http : HttpClient) { }

  sendMail(data : EmailData){
    return this.http.post(`${environment.apiUrl}/mail/simple`, data, {withCredentials: true})

  }


}
