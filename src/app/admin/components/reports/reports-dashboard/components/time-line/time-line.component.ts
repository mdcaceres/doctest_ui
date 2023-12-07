import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { Bug } from 'src/app/admin/interfaces/bug';
import { Project } from 'src/app/admin/interfaces/project';
import { TestCase } from 'src/app/admin/interfaces/testcase';
import { BugService } from 'src/app/admin/service/bug.service';
import { CaseService } from 'src/app/admin/service/case.service';
import { ProjectService } from 'src/app/admin/service/project.service';


@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements AfterViewInit  {
  public lineChartType: ChartType = 'line';
  months : string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  bugs!: Bug[];

  constructor(private bugService : BugService, private project: ProjectService) {
    Chart.register(Annotation);
  }

  ngAfterViewInit() : void {
    let p = '';
    this.project.currentProject.subscribe({
      next: (c) => {
        p = c.id!
        this.bugService.getAll(p).subscribe({
          next: (resp:any) => {
            this.bugs = resp.data.bugs! as Bug[];
            this.lineChartData = {
              datasets: [
                {
                  data: this.getCreatedAtCantByMonths(this.bugs),
                  label: 'Created',
                  backgroundColor: 'rgba(105,240,174,0.2)',
                  borderColor: 'rgba(105,240,174,1)',
                  pointBackgroundColor: 'rgba(148,159,177,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                  fill: 'origin',
                },
                {
                  data: this.getDueAtCantByMonths(this.bugs),
                  label: 'Due',
                  backgroundColor: 'rgba(244,67,54,0.2)',
                  borderColor: 'rgba(244,67,54,1)',
                  pointBackgroundColor: 'rgba(77,83,96,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(77,83,96,1)',
                  fill: 'origin',
                },
              ],
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            };

            this.lineChartOptions = {
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              scales: {
                y: {
                  position: 'left',
                },
              },
          
              plugins: {
                legend: { display: true },
                annotation: {
          
                },
              },
            };

            this.chart?.update();
          }
        })
      }
    })

  }

  getCreatedAtCantByMonths(arr:Bug[]){
    let data = new Map(); 
    let months = this.bugs.map(b => new Date(b.created_at!).getMonth());
    for (let i = 0; i <= 12; i++) {
      let f = months.filter(m => m==i);
      data.set(i,f.length);
    }

    return Array.from(data.values())
  }

  getDueAtCantByMonths(arr:Bug[]){
    let data = new Map(); 
    let months = this.bugs.map(b => new Date(b.due!).getMonth());
    for (let i = 0; i <= 12; i++) {
      let f = months.filter(m => m==i);
      data.set(i,f.length);
    }

    return Array.from(data.values())
  }

  public lineChartData!: ChartConfiguration['data'];

  public lineChartOptions!: ChartConfiguration['options'];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    /*this.lineChartData.datasets.forEach((x, i) => {
      const num =TimeLineComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(
      `Label ${this.lineChartData.labels.length}`
    );*/
    this.chart?.update();
  }
}
