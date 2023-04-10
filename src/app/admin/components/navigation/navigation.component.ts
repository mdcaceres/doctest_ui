import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MessagingService } from 'src/app/service/messaging.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  notifications! : Notification[]; 
  hidden = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private messaging : MessagingService) {
      
    }

  ngOnInit(): void {
    this.notifications = []; 
    this.getNotifications();
  }

  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  getNotifications(){
    this.messaging.getMessages().subscribe({
      next : (message) => {
        if(this.notifications.length == 0) {
          this.toggleBadgeVisibility();
        } else {
          this.hidden = false;
        }
        console.log("notificacion desde navigation");
        console.log(message);
        if (message != null) {
          this.notifications.push(message.notification as Notification);
        }
      
        console.log(this.notifications.length);
        console.log(JSON.stringify(this.notifications));
      },
      error : (err) => {
        console.log("error obtaining notifications");
      }
    })
  }

}
