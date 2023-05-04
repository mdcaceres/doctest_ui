import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/admin/interfaces/project';
import { ProjectService } from 'src/app/admin/service/project.service';
import { UserService } from 'src/app/admin/service/user.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  private sub: Subscription = new Subscription();
  projects: Project[] = []; 

  constructor(
    private projectService:ProjectService, 
    private userService: UserService) {}


  ngOnInit(): void {
    this.sub.add(
      this.projectService.getAll().subscribe({
        next: (resp:any) => {
          this.projects = resp.data.projects as Project[];
          console.log(this.projects);
        }
      })
    )
    
  }

}
