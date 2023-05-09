import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormGroupDirective, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  testCaseForm!: FormGroup;
  priorities: any[] = [{name: "Critical", id:1},{name: "High", id:2},{name: "Medium", id:3},{name: "Low", id:4}]; 
  types: any[] = [{name: "Regression", id:1},{name: "Acceptance", id:2}, {name: "Usability", id:3}, {name: "Integration", id:4}, {name: "Security", id:5}, {name: "Functionality", id:6}, {name: "Performance", id:7}, {name: "Usability", id:8}]; 
  suites: any[] = [ ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.testCaseForm = this.fb.group({
      title: [''],
      type: [''],
      suite: [''],
      priority: [''],
      description: [''],
      steps: this.fb.array([this.getStep()]),
      duration: [''],
    });
  }

  get steps() {
    return this.testCaseForm.get('steps') as FormArray;
  }

  getStep() {
    return this.fb.group({
      description: [' '],
      result: [' ']
    });
  }

  public add() {
    (<FormArray>this.testCaseForm
      .get("steps"))
      .push(this.getStep());
  }

  removeStep(index: number) {
    if(index > 0)
    this.steps.removeAt(index);
  }

  ngAfterViewInit() {
    // Apply Angular Material styles to the newly added row
    this.applyMaterialStyles();
  }

  applyMaterialStyles() {
    // Query the DOM for the newly added row using the last index of the steps array
    const row = document.querySelector(`.steps-row:nth-last-child(2)`);

    // Apply the Angular Material styles to the row
    if (row) {
      row.classList.add('cdk-focused', 'cdk-keyboard-focused');
    }
  }
  
}
