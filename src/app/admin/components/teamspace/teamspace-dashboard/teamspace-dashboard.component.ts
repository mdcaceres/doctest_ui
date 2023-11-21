import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/admin/interfaces/project';
import { ProjectService } from 'src/app/admin/service/project.service';
import { UserService } from 'src/app/admin/service/user.service';
import { ProjectDashboardComponent } from '../../project/project-dashboard/project-dashboard.component';
import { Img } from 'src/app/admin/interfaces/img';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObserversModule } from '@angular/cdk/observers';
import { PostService } from 'src/app/admin/service/post.service';
import { Post } from 'src/app/admin/interfaces/post';

@Component({
  selector: 'app-teamspace-dashboard',
  templateUrl: './teamspace-dashboard.component.html',
  styleUrls: ['./teamspace-dashboard.component.css']
})
export class TeamspaceDashboardComponent {
  private project = new BehaviorSubject<string>('');
  public readonly currentProject: Observable<string> = this.project.asObservable();

  private sub: Subscription = new Subscription();
  projects: Project[] = [];
  displayedColumns: string[] = ['#', 'name'];
  dataSource!: any;
  postForm!:FormGroup;
  projectImg!: Img | undefined; 
  userId!: string;
  file: File | null = null;
  isImageSaved: boolean = false;
  cardImageBase64: string = '';
  posts: Post[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb : FormBuilder,
    private projectService:ProjectService, 
    private userService: UserService,
    private router: Router,
    private matDialog: MatDialog,
    private sanitizer : DomSanitizer,
    private postService:PostService) {}


  ngOnInit(): void {
    let userId = localStorage.getItem("userId")!;
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

    this.postForm = this.fb.group({
      comment: ['']
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.cardImageBase64 = reader.result as string;
      this.isImageSaved = true;
      let img: Img = {
        "file": file,
        "url": this.sanitizer.bypassSecurityTrustUrl(this.cardImageBase64)
      };
      this.projectImg = img;
    };
  }

  viewElementPost(id:string) {
    this.setCurrentProject(id);
    this.postService.getAll(id).subscribe({
      next: (resp:any) => {
        this.posts = resp.data.Post! as Post[];
      }
    })
  }

  setCurrentProject(id:string) {
    this.project.next(id)
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
