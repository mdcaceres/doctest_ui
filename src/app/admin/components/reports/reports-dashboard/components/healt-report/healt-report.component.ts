import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartType } from 'chart.js';
import { Project } from 'src/app/admin/interfaces/project';
import { ProjectService } from 'src/app/admin/service/project.service';
import { BaseChartDirective } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { BugService } from 'src/app/admin/service/bug.service';
import { Bug } from 'src/app/admin/interfaces/bug';
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import { default as Annotation } from 'chartjs-plugin-annotation';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-healt-report',
  templateUrl: './healt-report.component.html',
  styleUrls: ['./healt-report.component.css']
})
export class HealtReportComponent implements OnInit {
  project!: Project;
  dates!: number[];
  bugs!: Bug[];
  @ViewChild('input') input!: HTMLInputElement;
  @Input() start: Date | null | undefined;
  @Input() end: Date | null | undefined;
  bubbleChartData!: ChartData<'bubble'>;
  bubbleChartOptions!: ChartConfiguration['options'];
  barChartData!: ChartData<'bar'>;
  barChartOptions!: ChartConfiguration['options'];
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;
  date = new Date();
  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  criticalBugs!: number;
  highBugs!: number;
  mediumBugs!: number;
  lowBugs!: number;
  cosmeticBugs!: number;
  moderateBugs!: number;
  minorBugs!: number;


  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  constructor(private projectService: ProjectService, private datePipe: DatePipe, private bugService: BugService) {
    this.project = this.projectService.getCurrent();
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    this.project = this.projectService.getCurrent();
    this.projectService.currentProject.subscribe(p => this.project = p);
    let start = new Date(this.project.startDate!);
    let end = new Date(this.project.endDate!);
    this.dates = this.getDatesInRange(start, end);
    this.bubbleChartOptions = {
      responsive: true,
      elements: {
        line: {
          tension: 0.5
        }
      },
      scales: {
        x: {
          min: start.toDateString(),
          max: end.toDateString(),
          
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'MMM dd'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Priority'
          },
          type: 'category',
          labels: ['Critical', 'High', 'Medium', 'Low'],
          ticks: {}
        }
      },
    };

    this.bugService.getAll(this.project.id!).subscribe({
      next: (resp:any) => {
        this.bugs = resp.data.bugs as Bug[];
        this.getFilterBugsBySeverities();
        

        this.bubbleChartData = {
          //labels: this.dates,
          datasets: [ {
            data: this.getData(),
            label: 'Bugs',
            backgroundColor: [
              'rgba(123,31,162, 0.5)',
              'rgba(105,240,174, 0.5)',
              'rgba(123,31,162, 0.5)',
            ],
            borderColor: [
              'rgba(123,31,162, 1)',
              'rgba(105,240,174, 1)',
              'rgba(123,31,162, 1)',
            ],
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
            hoverBorderColor: 'rgb(255, 99, 132)',
            hoverBorderWidth: 5,
            hoverRadius: 10,
            hitRadius: 10,
          } ]
        }; 

      }
    });

  }

  getFilterBugsBySeverities() {
    let s = this.bugs.map(bug => bug.severity)
    this.criticalBugs = s.filter(bug => bug == 'Critical').length;
    this.highBugs = s.filter(bug => bug == 'High').length;
    this.moderateBugs = s.filter(bug => bug == 'Moderate').length;
    this.minorBugs = s.filter(bug => bug == 'Minor').length;
    this.cosmeticBugs = s.filter(bug => bug == 'Cosmetic').length;
  }

    getDatesInRange(startDate:Date, endDate:Date) {
      const date = new Date(startDate.getTime());
    
      const dates = [];
    
      while (date <= endDate) {
        let d = new Date(date)
        dates.push(d.getDate());
        date.setDate(date.getDate() + 1);
      }
    
      return dates;
    }


    getData() {
      let data: any[] = [];
      this.bugs.forEach(bug => {
        let d = bug.due?.slice(0, 10);
        let date = new Date(bug.due!);
        let priority = bug.priority;
        data.push(
          {
              x: date,
              y: bug.priority!,
              r: 10,
          }
        );
      });
  
      return data;
    }

    getBarData() {
      let data: any[] = [];
      this.bugs.forEach(bug => {
        let d = bug.due?.slice(0, 10);
        let createdAt = new Date(bug.created_at!);
        let due = new Date();
        data.push(
          [createdAt,due]
        );
      });
  
      return data;
    }

}
