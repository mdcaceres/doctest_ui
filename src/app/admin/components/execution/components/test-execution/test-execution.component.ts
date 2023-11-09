import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { Step } from 'src/app/admin/interfaces/step';
import { TestCase } from 'src/app/admin/interfaces/testcase';
import { CaseService } from 'src/app/admin/service/case.service';
import { StatusService } from 'src/app/admin/service/status.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ExecutionReuslt } from 'src/app/admin/interfaces/result';
import { ExecutionService } from 'src/app/admin/service/execution.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-execution',
  templateUrl: './test-execution.component.html',
  styleUrls: ['./test-execution.component.css']
})
export class TestExecutionComponent implements OnInit, OnDestroy {
  testId!: string;
  testerId!: string;
  test!: TestCase;
  steps!: Step[];
  form!: FormGroup;
  commentForm!: FormGroup; 
  stepStatuses: any[] = [];
  testExecutionStatuses: any[] = [];
  interval: any;
  isSaved: boolean = false;
  timerSub! : Subscription;
  executionResult!: ExecutionReuslt;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels:  {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };

  pieChartData!: ChartData<'pie', number[], string | string[]>

  pieChartType: ChartType = 'pie';
  pieChartPlugins = [ DatalabelsPlugin ];

  constructor(
    private fb: FormBuilder, 
    private testCaseService: CaseService,
    private route: ActivatedRoute, 
    private statusService: StatusService,
    private executionService: ExecutionService,
    private matSnack: MatSnackBar) { 

    }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: ['']
    });

    this.form = this.fb.group({
      steps: this.fb.array([]),
    });

    this.testId = this.route.snapshot.params['id'];
    this.testerId = localStorage.getItem('userId')!;

    this.testCaseService.getById(this.testId).subscribe({
      next: (resp : any ) => {
        this.test = resp.data.case;
        this.steps = this.test.steps!;
        this.setForm();
      }
    });

    this.stepStatuses = this.statusService.getStepStatuses();
    this.testExecutionStatuses = this.statusService.getExecutionStatuses();
    this.ObserverTimer();
  }

  //form methods
  setForm() {
    for (let s of this.steps) {
      let step = this.getStep(s);
      this.add(step);   
    }
  }

  getStep(s : Step) {
    return this.fb.group({
      number : [s.order],
      description: [s.description],
      expected: [s.result],
      status : [''],
      comment : ['']
    });
  }

  public add(step:FormGroup) {
    (<FormArray>this.form
      .get("steps"))
      .push(step);
  }

  get formSteps() {
    return this.form.get('steps') as FormArray;
  }

  getColor(type:string) {
    switch(type) {
      case 'Passed':
        return 'accent';
      case 'Failed':
        return 'warn';
      case 'Blocked':
        return 'primary';
      default:
        return 'primary';
    }
  }

  ObserverTimer() {
    const t = timer(1000, 2000);
    
    this.timerSub = t.subscribe(i => {
      this.interval = i;
    });
  }

  getStepStatuses() : Map<string, number>{
    let stepStatuses = new Map<string, number>();
    this.stepStatuses.forEach(s => {
      stepStatuses.set(s.name, 0);
    });

    this.form.get('steps')?.value.forEach((s: any) => {
      switch(s.status) {
        case 'Passed':
          stepStatuses.set('Passed', stepStatuses.get('Passed')! + 1);
          break;
        case 'Failed':
          stepStatuses.set('Failed', stepStatuses.get('Failed')! + 1); 
          break;
        case 'Blocked':
          stepStatuses.set('Blocked', stepStatuses.get('Blocked')! + 1);
          break;
      }
    });

    return stepStatuses;
  }

  save(form: FormGroup) {
    let executionResult = this.setExecutionData();
    this.timerSub.unsubscribe();
    this.setChartData();
    form.disable();

    this.executionService.save(executionResult).subscribe({
      next: (resp : any) => {
        this.isSaved = true;
        console.log(form.value);
        this.matSnack.open('Execution saved', 'Close', {
          duration: 3000
        });
      },

      error: (err : any) => {
        console.log(err);
      }
    });
  }

  setExecutionData() : ExecutionReuslt {
    let stepStatusesResult = this.getStepStatuses();
    let executionStatus = '';
    if(stepStatusesResult.get('Failed')! > 0) {
      executionStatus = 'Failed';
    } else if(stepStatusesResult.get('Blocked')! > 0 && stepStatusesResult.get('Failed')! == 0) {
      executionStatus = 'Blocked';
    } else {
      executionStatus = 'Passed';
    }
    
    let executionResult : ExecutionReuslt = {
      project_id: parseInt(localStorage.getItem('projectId')!),
      case_id: parseInt(this.test.id!),
      user_id: parseInt(this.testerId),
      status: executionStatus,
      steps: this.form.get('steps')?.value,
      duration : this.interval * 1000!
    };

    this.executionResult = executionResult;
    return executionResult;
  }

  setChartData() {
    let statuses = this.getStepStatuses();
    let passed = statuses.get('Passed')!;
    let failed = statuses.get('Failed')!;
    let blocked = statuses.get('Blocked')!;
    this.pieChartData = {
      labels: this.stepStatuses.map(s => s.name),
      datasets: [ {
        data: [ passed, failed , blocked ],
        backgroundColor: ["#69f0ae", "#f44336", "#7b1fa2"],
        borderColor: '#424242'
      } ]
    };
  }

  reset(form: FormGroup) {
    this.isSaved = false;
    this.form.markAsPristine();
    this.form.markAsUntouched();
    form.enable();
  }

  onSelect(event: any) {
    console.log(event);
  }

  ngOnDestroy(): void {
  }
}
