import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Img } from 'src/app/admin/interfaces/img';
import { ProjectService } from 'src/app/admin/service/project.service';
import { Subscription } from 'rxjs';
import swal  from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from 'src/app/admin/interfaces/project';

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
  userId!: string;
  file: File | null = null;

  constructor(
    private fb : FormBuilder, 
    private sanitizer : DomSanitizer,
    private project : ProjectService,
    private dialog : MatDialog,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private host: ElementRef<HTMLInputElement>) {
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')!;
    this.userId = localStorage.getItem('userId')!;
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
    let img = this.projectImg!; 

    let newProject: Project = {
      name : projectName,
      description : description,
      userId : this.userId,
      img : img
    };

    this.sub.add(
      this.project.create(newProject).subscribe({
        next: (resp: any) => {
          console.log("se guardo exitosamente")
          const queryParams: Params = {id:resp.data.project.id};
          this.dialog.closeAll(); 
         this.router.navigate(['admin/projects/id'],
            {
              relativeTo: this.activatedRoute, 
              queryParams: queryParams,
              queryParamsHandling: 'merge'
            })
        },
        error: (err) => {
          console.log(err); 
          swal.fire("Error", "Error while saving the project", "error");
          this.dialog.closeAll();
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

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }


}


