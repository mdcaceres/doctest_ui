import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Bug } from 'src/app/admin/interfaces/bug';
import { TestCase } from 'src/app/admin/interfaces/testcase';
import { BugService } from 'src/app/admin/service/bug.service';
import { CaseService } from 'src/app/admin/service/case.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  tests!: any[];
  doneBugs! : any[]; 
  inProgressBugs! : any[]; 
  todoBugs! : any[]; 
  sub: Subscription = new Subscription();
  userId!: string;

  displayedColumns: string[] = ['title', 'type', 'description', 'status', 'action'];


  constructor(private breakpointObserver: BreakpointObserver, 
    private testService : CaseService, 
    private bugService: BugService) {}

  ngOnInit(): void {
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
}
