import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectInvitationComponent } from '../project-invitation/project-invitation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTestComponent } from '../../test/create-test/create-test.component';
import { ProjectService } from 'src/app/admin/service/project.service';
import { Project } from 'src/app/admin/interfaces/project';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  projectId!: string;
  project!: Project
  image!:string;
  @Output() projectChanged = new EventEmitter<Project>();

  constructor(
    private dialog: MatDialog, 
    private route: ActivatedRoute, 
    private projectService: ProjectService,
    private router : Router ) {

  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.projectService.get(this.projectId).subscribe({
      next: (resp:any) => {
        this.project = resp.data.project! as Project;
        this.image = this.project.image!.replace('uploads/', '');
        this.projectService.changeProject(this.project);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  openInvitagionDialog() {
    this.dialog.open(ProjectInvitationComponent, {
      data: {route: this.route}
    }); 
  }

  createTest() {
    this.router.navigate([`/admin/project/${this.projectId}/new_test`]);
  }

  createBug() {
    this.router.navigate([`/admin/project/${this.projectId}/new_bug`]);
  }

}
