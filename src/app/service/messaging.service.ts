import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging'
import { UserService } from '../admin/service/user.service';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(private angularFireMessaging:AngularFireMessaging, private user: UserService) {
   }

 requestPermission(id:string) {
    this.angularFireMessaging.requestToken.subscribe({
      next : (token) => {
        this.user.updateToken(id, token!).subscribe({
          next: (response) => {
            console.log("put fcm token");
          },
          error: (error) => {
            console.log("Error while updating token");
          }
        });
      },
      error : (error) => {
        console.log("Unable to get permission to notifications", error)
      }
    })
  }

}
