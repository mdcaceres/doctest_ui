import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Suite } from 'src/app/admin/interfaces/suite';
import { SuiteService } from 'src/app/admin/service/suite.service';

@Component({
  selector: 'app-suite-list',
  templateUrl: './suite-list.component.html',
  styleUrls: ['./suite-list.component.css']
})
export class SuiteListComponent {
  private sub: Subscription = new Subscription();
  suites: Suite[] = [];
  displayedColumns: string[] = ['name', 'description', 'target'];
  dataSource!: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private suiteService:SuiteService,
    private router: Router,
    private route: ActivatedRoute) {}


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.sub.add(
      this.suiteService.getAll(id!).subscribe({
        next: (resp:any) => {
          this.suites = resp.data.suites as Suite[];
          console.log(this.suites);
          this.dataSource = new MatTableDataSource(this.suites);
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
