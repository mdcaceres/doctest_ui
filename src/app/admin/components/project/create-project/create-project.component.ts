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
import { ImageService } from 'src/app/admin/service/image.service';
import { Client } from 'src/app/admin/interfaces/client';
import { CreateClientComponent } from '../../client/components/create-client/create-client.component';

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
  isImageSaved: boolean = false;
  cardImageBase64: string = '';
  clients: Client[] = [];

  constructor(
    private fb : FormBuilder, 
    private sanitizer : DomSanitizer,
    private project : ProjectService,
    private dialog : MatDialog,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private host: ElementRef<HTMLInputElement>,
    private imgService: ImageService) {
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
      start: ['',],
      end: ['',],
      client: ['',],
      status: [''],
      owner : [{value: this.userName, disabled: true}]
    });
  }

  create(form : FormGroup) {
    let projectName = this.projectForm.get('name')!.value; 
    let description = this.projectForm.get('description')!.value; 
    let img = this.projectImg!; 

    let fd = new FormData();
    
    fd.append('file', img.file);
    fd.append('ownerId', this.userId);
    fd.append('url', JSON.stringify(img.url)); 
    
    let newProject: Project = {
      name : projectName,
      description : description,
      userId : this.userId,
      image : ""
    };

    this.sub.add(
      this.project.create(newProject).subscribe({
        next: (resp: any) => {
          this.imgService.updateImg(resp.data.project.id, fd).subscribe({
            next: (resp: any) => {},
            error: (err) => {
              console.log(err); 
              swal.fire("Error", "Error while saving the project img", "error");
              this.dialog.closeAll();
            }
          });
          this.dialog.closeAll(); 
          this.router.navigate([`admin/project/${resp.data.project.id}`])
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


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.cardImageBase64 = reader.result as string;
      this.isImageSaved = true;
      let img: Img = {
        "file": file,
        "url": this.sanitizer.bypassSecurityTrustUrl(this.cardImageBase64)
      };
      this.projectImg = img;
    };
  }

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  openClientDialog() {
    console.log("open client dialog");
    this.dialog.open(CreateClientComponent, {
      data: {userId: this.userId}
    });
    /*this.dialog.afterAllClosed.subscribe({
      next: (resp) => {
        this.clientService.GetAll(this.userId!).subscribe({
          next: (resp:any) => {
            this.clients = resp.data.clients as Client[];
          },
          error: (err) => {}
        })
      },
      error: (err) => {},
    });*/
  }


}

