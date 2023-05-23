import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/admin/interfaces/project';
import { ProjectService } from 'src/app/admin/service/project.service';
import { UserService } from 'src/app/admin/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})

export class ProjectsListComponent implements OnInit {
  private sub: Subscription = new Subscription();
  projects: Project[] = [];
  displayedColumns: string[] = ['#', 'name', 'description', 'owner', 'action'];
  dataSource!: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private projectService:ProjectService, 
    private userService: UserService,
    private router: Router) {}


  ngOnInit(): void {
    this.sub.add(
      this.projectService.getAll().subscribe({
        next: (resp:any) => {
          this.projects = resp.data.projects as Project[];
          for(let project of this.projects) {
            project.image = project.image!.replace('uploads/', '');
          }
          console.log(this.projects);
          this.dataSource = new MatTableDataSource(this.projects);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      })
    );
  }

  goToDashboard(id:string) {
    this.router.navigate([`/admin/project/${id}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}