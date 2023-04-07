import { Component } from '@angular/core';
import { MessagingService } from './service/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctest-app';
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  message: any

  constructor(private messagingService:MessagingService) {

  }

  ngOnInit(){
    this.messagingService.requestPermission(); 
    this.messagingService.receiveMessaging();
    this.message = this.messagingService.currentMessage;
  }
}
