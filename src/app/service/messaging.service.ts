import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject<any>(null);

  constructor(private angularFireMessaging:AngularFireMessaging) { }

  /*
  requestPermission(){
    this.angularFireMessaging.requestToken.subscribe((token) => {
      return token
    },
    (err) => {
      console.log("Unable to get permission to notifications", err)
    });
  }
  */

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe({
      next : (token) => {
        return token
      },
      error : (error) => {
        console.log("Unable to get permission to notifications", error)
      }
    })
  }

  receiveMessaging(){
    this.angularFireMessaging.messages.subscribe((payload) => {
      this.currentMessage.next(payload)
    })
  }

  getMessages() {
    return this.currentMessage; 
  }
}
