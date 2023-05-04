import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectInvitationComponent } from '../project-invitation/project-invitation.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  projectId!: string;

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
  }

  openInvitagionDialog() {
    this.dialog.open(ProjectInvitationComponent, {
      data: {route: this.route}
    }); 
  }

}
