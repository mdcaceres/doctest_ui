import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestCase } from 'src/app/admin/interfaces/testcase';
import { CaseService } from 'src/app/admin/service/case.service';
import { SuiteService } from 'src/app/admin/service/suite.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent {
  private sub: Subscription = new Subscription();
  tests: TestCase[] = [];
  displayedColumns: string[] = ['title', 'type', 'description', 'status', 'action'];
  dataSource!: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private caseService: CaseService, 
    private route: ActivatedRoute,
    private router : Router) {}


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.sub.add(
      this.caseService.getAll(id!).subscribe({
        next: (resp:any) => {
          this.tests = resp.data.cases as TestCase[];
          console.log(this.tests);
          this.dataSource = new MatTableDataSource(this.tests);
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
