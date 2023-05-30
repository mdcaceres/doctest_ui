import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Attachment } from 'src/app/admin/interfaces/attachment';
import { Project } from 'src/app/admin/interfaces/project';
import { ProjectService } from 'src/app/admin/service/project.service';
import { CreateSuiteComponent } from '../../suite/create/create-suite/create-suite.component';
import { SuiteService } from 'src/app/admin/service/suite.service';
import { Suite } from 'src/app/admin/interfaces/suite';
import { ActivatedRoute, Router } from '@angular/router';
import { TestCase } from 'src/app/admin/interfaces/testcase';
import { CaseService } from 'src/app/admin/service/case.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { FilesService } from 'src/app/admin/service/files.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  testCaseForm!: FormGroup;
  priorities: any[] = [{name: "Critical", id:1},{name: "High", id:2},{name: "Medium", id:3},{name: "Low", id:4}]; 
  types: any[] = [{name: "Regression", id:1},{name: "Acceptance", id:2}, {name: "Usability", id:3}, {name: "Integration", id:4}, {name: "Security", id:5}, {name: "Functionality", id:6}, {name: "Performance", id:7}, {name: "Usability", id:8}]; 
  project!: Project;
  projectId!: string;
  authorName!: string;
  authorId! : string;
  attachments: Attachment[] = [];
  suites: Suite[] = [];

  constructor(private fb: FormBuilder,
    private projectService: ProjectService,
    private satinizer: DomSanitizer,
    private dialog: MatDialog,
    private suiteService: SuiteService,
    private filesService: FilesService,
    private route: ActivatedRoute,
    private test: CaseService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];
    this.suiteService.getAll(this.projectId!).subscribe({
      next: (resp:any) => {
        this.suites = resp.data.suites as Suite[];
      },
      error: (err) => {}
    })
    this.authorName = localStorage.getItem('userName')!;
    this.authorId = localStorage.getItem('userId')!;
    this.testCaseForm = this.fb.group({
      title: [''],
      type: [''],
      suite: [''],
      priority: [''],
      description: [''],
      steps: this.fb.array([this.getStep()]),
      duration: [''],
      status: [''],
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

  onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    const reader = new FileReader();
    
    for(let f of files) {
      reader.readAsDataURL(f); 

      reader.onload = () => {
        let file = {
          name: f.name,
          type: f.type,
          file: f,
          url: this.satinizer.bypassSecurityTrustResourceUrl(reader.result as string)
        } as Attachment;
        this.attachments.push(file);
      }
    }

    console.log(this.attachments);
  }

  getIcon(type:string) {
    switch(type) {
      case 'image/png':
        return 'image';
      case 'image/jpg':
        return 'image';
      case 'image/jpeg':
        return 'image';
      case 'application/pdf':
        return 'picture_as_pdf';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'article';
      default:
        return 'attach_file';
    }
  }

  remove(index: number) {
    this.attachments.splice(index, 1);
  }

  openSuiteDialog() {
    this.dialog.open(CreateSuiteComponent, {
      data: {projectId : this.projectId, userId: this.authorId}
    });

    this.dialog.afterAllClosed.subscribe({
      next: (resp) => {
        this.suiteService.getAll(this.projectId!).subscribe({
          next: (resp:any) => {
            this.suites = resp.data.suites as Suite[];
          },
          error: (err) => {}
        })
      },
      error: (err) => {},
    });
  }

  onSubmit() {
    let testCase: TestCase = {
      title: this.testCaseForm.get('title')?.value,
      type: this.testCaseForm.get('type')?.value,
      suite_id: this.testCaseForm.get('suite')?.value,
      priority: this.testCaseForm.get('priority')?.value,
      description: this.testCaseForm.get('description')?.value,
      steps: this.testCaseForm.get('steps')?.value,
      duration: this.testCaseForm.get('duration')?.value,
      status : this.testCaseForm.get('status')?.value,
      project_id: this.projectId,
      creator_id: this.authorId,

    }

    this.test.create(testCase).subscribe({
      next: (resp:any) => {
        let caseId = resp.data.case.id!;
        console.log(this.testCaseForm.value);
        console.log(this.attachments);
        let dataArr: FormData =  new FormData();

        for(let a of this.attachments){
          dataArr.append('files', a.file, a.url);
        }

        this.filesService.add(resp.data.case.id!, dataArr).subscribe({
          next:() => {},
          error:() => {}
        })
        this.snackBar.open("saved", "✅")
        
        this.cleanForm();   
      },
      error: (err) => {
        this.snackBar.open("error", "🚩")
        this.cleanForm();
      }
    });
  }

  cleanForm() {
    // Reset the form to its initial state
    this.testCaseForm.reset({
      title: '',
      type: '',
      suite: '',
      priority: '',
      description: '',
      steps: [this.getStep()],
      duration: ''
    });
      
    // Remove all the steps from the steps FormArray
    const stepsArray = this.testCaseForm.get('steps') as FormArray;
    stepsArray.clear();
      
    // Add a new step to the steps FormArray
    stepsArray.push(this.getStep());
      
    // Clear the attachments array
    this.attachments = [];
  }
  
}