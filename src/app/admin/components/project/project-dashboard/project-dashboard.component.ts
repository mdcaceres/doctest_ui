import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectInvitationComponent } from '../project-invitation/project-invitation.component';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent {

  constructor(private dialog: MatDialog) {

  }

  openInvitagionDialog() {
    this.dialog.open(ProjectInvitationComponent); 
  }

}
