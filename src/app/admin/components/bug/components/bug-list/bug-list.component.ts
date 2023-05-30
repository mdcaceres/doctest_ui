import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { Bug } from 'src/app/admin/interfaces/bug';
import { Suite } from 'src/app/admin/interfaces/suite';
import { BugService } from 'src/app/admin/service/bug.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/admin/service/user.service';
import { User } from 'src/app/auth/interfaces/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusService } from 'src/app/admin/service/status.service';
import { PriorityService } from 'src/app/admin/service/priority.service';
import { UserNamePipe } from 'src/app/admin/pipes/username';
import { MatChipListbox } from '@angular/material/chips';
import { BugComment } from 'src/app/admin/interfaces/comment';
import { QuillEditorComponent } from 'ngx-quill';
import { QuillMaterialComponent } from '../../../quill/quill-material/quill-material.component';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent {
  private sub: Subscription = new Subscription();
  bugs: Bug[] = [];
  displayedColumns: string[] = ['name', 'description', 'status', 'priority', 'severity', 'due', 'action'];
  dataSource!: any;
  bug!: Bug;
  currentUserId : string = '';
  bugForm!:FormGroup;
  priorities!: any[];
  comments: BugComment[] = [];
  commentForm!: FormGroup; 
  logedId : string = '';
  
  @ViewChild('quill') quill!: QuillMaterialComponent;

  @ViewChild('drawer') drawer!: MatSidenav;
  @ViewChild('chipList') chipList! : MatChipListbox;
  @ViewChild('button') button!: HTMLButtonElement;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('#commentInput') commentInput!: HTMLTextAreaElement;

  users: User[] = [];
  statuses: any[] = [];


  constructor(
    private bugService: BugService,
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private fb : FormBuilder,
    private statusService: StatusService,
    private priorityService: PriorityService) {}


  ngOnInit(): void {
    this.bug = {};
    this.statuses = this.statusService.getBugStatuses();
    this.priorities = this.priorityService.getPriorities();
    this.logedId = localStorage.getItem('userId')!;

    this.commentForm = this.fb.group({
      comment: ['']
    });

    this.bugForm = this.fb.group({
      description: [this.bug.description],
      assigned: [this.bug.assigned_id],
      status: [this.bug.status],
      priority: [this.bug.priority],

    });

    let id = this.route.snapshot.paramMap.get('id');

    this.sub.add(
      this.userService.getAllByProject(JSON.stringify(id)).subscribe({
        next: (resp:any) => {
          this.users = resp.data.users;
        },
        error: (err) => {
          console.log(err);
        }
      })
    );

    this.sub.add(
      this.bugService.getAll(id!).subscribe({
        next: (resp:any) => {
          this.bugs = resp.data.bugs as Bug[];
          console.log(this.bugs);
          this.dataSource = new MatTableDataSource(this.bugs);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.bug = this.bugs[0]; 
          this.chipList.value = this.bug.status!;
          this.currentUserId = JSON.stringify(this.bug.assigned_id);
          this.comments = this.bug.comments!;
        }
      })
    );
  }

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  goToDashboard(id:string) {
    this.router.navigate([`/admin/project/${id}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  viewBug(id:number) {
    this.bug = this.bugs.find(bug => bug.id === id)!;
    this.comments = this.bug.comments!;
    console.log(this.bug.comments);
    console.log(this.bug);
    this.drawer.toggle();
  }

  addComment(comment:string) {
    let commentObj: BugComment = {
      bug_id: this.bug.id!,
      comment: this.commentForm.value.comment!,
      user_id: parseInt(this.logedId!),
    }



      this.bugService.addComment(commentObj).subscribe({
        next: (resp:any) => {
          console.log(resp);
          this.comments.unshift(commentObj);
          this.commentForm.reset();
        }
      });
  }

  toString(id:number) {
    return JSON.stringify(id);  
  }
}
