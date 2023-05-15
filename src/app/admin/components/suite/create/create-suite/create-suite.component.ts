import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Suite } from 'src/app/admin/interfaces/suite';
import { SuiteService } from 'src/app/admin/service/suite.service';
import swal  from 'sweetalert2';
import { CreateTestComponent } from '../../../test/create-test/create-test.component';

@Component({
  selector: 'app-create-suite',
  templateUrl: './create-suite.component.html',
  styleUrls: ['./create-suite.component.css']
})
export class CreateSuiteComponent {
  testSuiteForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private suiteService: SuiteService, 
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: {projectId: string, userId: string},
    public dialogRef: MatDialogRef<CreateTestComponent>) { }

  ngOnInit(): void {
    this.testSuiteForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      target: ['', Validators.required]
    });
  }

  onSubmit(): void {
    let suite: Suite = {
      name : this.testSuiteForm.get('name')!.value,
      description: this.testSuiteForm.get('description')!.value,
      target: this.testSuiteForm.get('target')!.value,
      user_id: this.data.userId!,
      project_id: this.data.projectId!
    }
    this.suiteService.createSuite(suite).subscribe({
      next: (resp) => {
        //swal.fire({})
        this.dialog.closeAll();
      },
      error: (err) => {
        console.log(err); 
          swal.fire("Error", "Error while saving the project", "error");
          this.dialog.closeAll();
      }
    })
  }
}
