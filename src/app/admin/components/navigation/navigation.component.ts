import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MessagingService } from 'src/app/service/messaging.service';
import { MatMenuTrigger } from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import { CreateProjectComponent } from '../project/create-project/create-project.component';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../service/project.service';
import { TermsAndConditionComponent } from '../terms-and-condition/terms-and-condition.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
logOut() {
  localStorage.removeItem('roles');
  localStorage.clear();
}
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  notifications! : Notification[]; 
  hidden = false;
  userName!: string;
  userId! : string; 
  project!: Project;
  imgSrc!: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private messagingService:MessagingService,
    private angularFireMessaging:AngularFireMessaging,
    public projectService: ProjectService) {
      
    }

  ngOnInit(): void {
    this.projectService.currentProject.subscribe(project => {
      let obj = {};
      if (project !== obj) {
        this.project = project as Project;
        this.imgSrc = this.imgSrc != null ? "http://localhost:8080/img/" + this.project.image!.replace('uploads/', '')! : "";
      }
    });

    this.messagingService.requestPermission(this.userId); 
    this.notifications = []; 

    this.angularFireMessaging.messages.subscribe({
      next : (message) => {
        if(this.notifications.length < 1) {
          this.toggleBadgeVisibility();
        } else {
          this.hidden = false;
        }
        if (message != null) {
          this.notifications.push(message.notification as Notification);
        }
      },
      error : (err:any) => {
        console.log("error obtaining notifications");
      }
    })

    this.userName = localStorage.getItem('userName')!;
    this.userId = localStorage.getItem('userId')!;
  }

  
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  openDialog() {
    this.dialog.open(CreateProjectComponent);
  }

  openTerms() {
    this.dialog.open(TermsAndConditionComponent);
  }

  addProject(project: any) {
    this.project = project;
    this.imgSrc = "localhost:8080/" + this.project.image!.replace('uploads/', '');
  }

  isProjectaSelected() {
    let isSelected = false;
    this.projectService.currentProject.subscribe(p => {
    let selected = p as Project; 
     if (selected.id !== undefined) 
     isSelected = true;
    })
    return isSelected;
  }


}
