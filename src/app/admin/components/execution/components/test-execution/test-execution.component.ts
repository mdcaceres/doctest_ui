import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { Step } from 'src/app/admin/interfaces/step';
import { TestCase } from 'src/app/admin/interfaces/testcase';
import { CaseService } from 'src/app/admin/service/case.service';
import { StatusService } from 'src/app/admin/service/status.service';

@Component({
  selector: 'app-test-execution',
  templateUrl: './test-execution.component.html',
  styleUrls: ['./test-execution.component.css']
})
export class TestExecutionComponent implements OnInit, OnDestroy {
  testId!: string;
  test!: TestCase;
  steps!: Step[];
  form!: FormGroup;
  commentForm!: FormGroup; 
  statuses: any[] = [];
  interval: any;

  constructor(
    private fb: FormBuilder, 
    private testCaseService: CaseService,
    private route: ActivatedRoute, 
    private statusService: StatusService) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      comment: ['']
    });

    this.form = this.fb.group({
      steps: this.fb.array([]),
    });

    this.testId = this.route.snapshot.params['id'];

    this.testCaseService.getById(this.testId).subscribe({
      next: (resp : any ) => {
        this.test = resp.data.case;
        this.steps = this.test.steps!;
        this.setForm();
      }
    });

    this.statuses = this.statusService.getStepStatuses();

    this.ObserverTimer();

  }

  setForm() {
    for (let s of this.steps) {
      let step = this.getStep(s);
      this.add(step);   
    }
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
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

  addComment(comment:string) {
    let commentObj: any = {
      //bug_id: this.bug.id!,
      comment: this.commentForm.value.comment!,
      //user_id: parseInt(this.logedId!),
    }
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
    const seed = timer(1000, 2000);
    
    seed.subscribe(i => {
      this.interval = i;
    });
  }

}
