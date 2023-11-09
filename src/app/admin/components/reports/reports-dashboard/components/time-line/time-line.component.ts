import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { TestCase } from 'src/app/admin/interfaces/testcase';
import { CaseService } from 'src/app/admin/service/case.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit  {
  private newLabel? = 'New label';
  testCases: TestCase[] = [];
  projectId: string = '';
  public lineChartData!: ChartConfiguration['data'];

  constructor(private testService: CaseService) {
    Chart.register(Annotation)
  }
  ngOnInit(): void {

    this.projectId = localStorage.getItem('projectId')!;

    this.testService.getAll(this.projectId).subscribe({
      next: (resp: any) => {
        this.testCases = resp.data.cases as TestCase[];
        console.log(this.testCases);

    let months: string[] =  this.testCases
    .map((testCase) => new Date(testCase.created_at!)
    .toLocaleString('default', { month: 'long' })); 

    let months1 =  new Set(months);

    this.lineChartData = {
      datasets: [
        {
          data: [ 65, 59, 80, 81, 56, 55, 40 ],
          label: 'DONE Test cases',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      //labels: Array.from(months1),
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    };

      },
      error: (err) => {
      }
    });
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
