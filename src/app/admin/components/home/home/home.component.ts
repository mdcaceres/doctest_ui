import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipListbox } from '@angular/material/chips';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { Bug } from 'src/app/admin/interfaces/bug';
import { BugComment } from 'src/app/admin/interfaces/comment';
import { TestCase } from 'src/app/admin/interfaces/testcase';
import { BugService } from 'src/app/admin/service/bug.service';
import { CaseService } from 'src/app/admin/service/case.service';
import { PriorityService } from 'src/app/admin/service/priority.service';
import { StatusService } from 'src/app/admin/service/status.service';
import { UserService } from 'src/app/admin/service/user.service';
import { User } from 'src/app/auth/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  @ViewChild('drawer') drawer!: MatSidenav;
  tests!: any[];
  doneBugs! : any[]; 
  inProgressBugs! : any[]; 
  todoBugs! : any[]; 
  userId!: string;
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
  @ViewChild('chipList') chipList! : MatChipListbox;
  @ViewChild('button') button!: HTMLButtonElement;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('#commentInput') commentInput!: HTMLTextAreaElement;

  users: User[] = [];
  statuses: any[] = [];
  


  constructor(
    private testService : CaseService, 
    private bugService: BugService,
    private router : Router,
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

    this.userId = localStorage.getItem("userId")!;

    this.sub.add(
      this.testService.getByUserId(this.userId).subscribe({
        next: (resp: any) => {
          this.tests = resp.data.cases as TestCase[]
        }, 
        error : () => {
          console.log("error on getting test cases")
        }
      })
    )

    this.sub.add(
      this.bugService.getByUserIdAndStatus(this.userId, "Assigned").subscribe({
        next: (resp: any) => {
          this.todoBugs = resp.data.bugs as Bug[];
        },
        error: () => {
          console.log("error on getting bugs")
        }
      })
    )

    this.sub.add(
      this.bugService.getByUserIdAndStatus(this.userId, "Resolved").subscribe({
        next: (resp: any) => {
          this.doneBugs = resp.data.bugs as Bug[];
        },
        error: () => {
          console.log("error on getting bugs")
        }
      })
    )
  


    this.sub.add(
      this.bugService.getByUserIdAndStatus(this.userId, "Fixed").subscribe({
        next: (resp: any) => {
          this.inProgressBugs = resp.data.bugs as Bug[];
        },
        error: () => {
          console.log("error on getting bugs")
        }
      })
    )
  }

  goToExecute(id:string) {
    this.router.navigate([`/admin/test/${id}/execution`]);
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

  updateBug(event:string) {
    this.bug.status = event; 
    this.sub.add(
      this.bugService.update(this.bug).subscribe({
        next : () => {
          console.log("bug updated")
        }
      })
    )
    console.log(event);
    console.log("hellow worlds")
  }

  viewBug(id:number) {
    this.sub.add(
      this.bugService.getAll(JSON.stringify(id!)).subscribe({
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

    this.bug = this.bugs.find(bug => bug.id === id)!;

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
