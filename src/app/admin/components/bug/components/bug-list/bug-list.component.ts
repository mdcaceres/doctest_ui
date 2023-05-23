import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bug } from 'src/app/admin/interfaces/bug';
import { Suite } from 'src/app/admin/interfaces/suite';
import { BugService } from 'src/app/admin/service/bug.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bugService: BugService,
    private router: Router,
    private route: ActivatedRoute) {}


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.sub.add(
      this.bugService.getAll(id!).subscribe({
        next: (resp:any) => {
          this.bugs = resp.data.bugs as Bug[];
          console.log(this.bugs);
          this.dataSource = new MatTableDataSource(this.bugs);
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
