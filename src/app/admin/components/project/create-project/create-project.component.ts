import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Img } from 'src/app/admin/interfaces/img';
import { ProjectService } from 'src/app/admin/service/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  userName!: string; 
  projectForm!: FormGroup;
  projectImg!: Img | undefined; 
  private sub : Subscription = new Subscription();

  constructor(
    private fb : FormBuilder, 
    private sanitizer : DomSanitizer,
    private project : ProjectService) {
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')!;
    this.projectForm = this.fb.group({
      name : ['',
      Validators.required, 
      Validators.minLength(6),
      Validators.maxLength(25)
      ],
      description : ['',],
      owner : [{value: this.userName, disabled: true}]
    });
  }

  create(form : FormGroup) {
    let projectName = this.projectForm.get('name')!.value; 
    let description = this.projectForm.get('description')!.value; 
    let owner = this.projectForm.get('owner')!.value;
    let img = this.projectImg; 

    let newProject = {
      name : projectName,
      description : description,
      owner : owner,
      img : img
    }

    this.sub.add(
      this.project.create(newProject).subscribe({
        next: (resp: any) => {
          console.log("post project")
          //this.router.navigate(['./admin'])
        },
        error: (err) => {
          console.log(err); 
          //swal.fire("Error", "invalid email or password", "error");
        },
      })
    );

  }

  getErrorMessage() {
    
  }

  onFileSelected(event: any){
    let file: File = event.target.files[0]; 
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));

    let img: Img = {
      "file": file,
      "url": url
    };

    
  this.projectImg = img; 
  }
}


