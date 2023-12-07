import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChartConfiguration, ChartType, ChartData, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Project } from 'src/app/admin/interfaces/project';
import { ExecutionService } from 'src/app/admin/service/execution.service';
import { ProjectService } from 'src/app/admin/service/project.service';

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.css']
})
export class DynamicChartComponent implements OnInit {
  isDisplayed : boolean = false; 
  project! : Project;
  projectStart!: Date;
  projectEnd!: Date;

  constructor(private executionService: ExecutionService, private projectService: ProjectService) {}

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  
  public barChartLabels: string[] = [
    "Blocked",
    "Passed",
    "Failed"
  ];

  public barChartType: ChartType = 'bar';

  public barChartData!: ChartData<'bar'>;

  search() {
    let s : Date = this.range.get('start')!.value!
    let e : Date = this.range.get('end')!.value!

    let l : ChartDataset<any, any>[] = [];

    this.executionService.getPerc(this.project.id!, "Blocked", s! ,e!).subscribe({
      next : (resp:any) => {
        let blocked : number = resp.data.test_execution.avg!;

        this.executionService.getPerc(this.project.id!, "Passed", s! ,e!).subscribe({
          next : (resp:any) => {
            let passed : number = resp.data.test_execution.avg!;

            this.executionService.getPerc(this.project.id!, "Failed", s! ,e!).subscribe({
              next : (resp:any) => {
                let failed : number = resp.data.test_execution.avg!;

                let barData: ChartData<'bar'> = {
                  labels: this.barChartLabels,
                  datasets: [{
                    label: '% of test executions',
                    data: [blocked, passed, failed],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(75, 192, 192, 0.5)',
                      'rgba(54, 162, 235, 0.5)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 0.9)',
                      'rgba(75, 192, 192, 0.9)',
                      'rgba(54, 162, 235, 0.9)'
                    ],
                    borderWidth: 1
                  }]
                };

                this.barChartData = barData;
                this.isDisplayed = true;
              }
            })
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.project = this.projectService.getCurrent();
    this.projectStart = new Date(this.project.startDate!);
    this.projectEnd = new Date(this.project.endDate!);
  }
}
