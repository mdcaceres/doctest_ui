import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Attachment } from 'src/app/admin/interfaces/attachment';
import { Bug } from 'src/app/admin/interfaces/bug';
import { Project } from 'src/app/admin/interfaces/project';
import { BugService } from 'src/app/admin/service/bug.service';
import { FilesService } from 'src/app/admin/service/files.service';
import { PriorityService } from 'src/app/admin/service/priority.service';
import { ProjectService } from 'src/app/admin/service/project.service';
import { SeverityService } from 'src/app/admin/service/severity.service';
import { StatusService } from 'src/app/admin/service/status.service';
import { TypeService } from 'src/app/admin/service/type.service';
import { UserService } from 'src/app/admin/service/user.service';
import { User } from 'src/app/auth/interfaces/user';
import swal  from 'sweetalert2';

@Component({
  selector: 'app-create-bug',
  templateUrl: './create-bug.component.html',
  styleUrls: ['./create-bug.component.css']
})
export class CreateBugComponent implements OnInit{
  bugForm!: FormGroup;
  projects!: any[];
  users: any[] = [];
  types!: any[];
  priorities!: any[];
  severities!: any[];
  statuses!: any[];
  currentProjectId!: string; 
  attachments: Attachment[] = [];
  project! : Project;
  authorName!: string;
  projectDue!: Date;
  start!: Date;
  owner!:string;


  constructor(private fb : FormBuilder,
    private priorityService: PriorityService,
    private severityService: SeverityService,
    private typeService: TypeService,
    private statusService: StatusService,
    private userService: UserService,
    private route: ActivatedRoute,
    private satinizer: DomSanitizer,
    private projectService: ProjectService,
    private bugService: BugService,
    private filesService: FilesService,
    private snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.authorName = localStorage.getItem('userName')!;
    let owner = JSON.parse(localStorage.getItem('userId')!);
    this.owner = JSON.parse(localStorage.getItem('userId')!);
    this.currentProjectId = this.route.snapshot.paramMap.get('id')!;
    this.types = this.typeService.getBugTypes();
    this.priorities = this.priorityService.getPriorities();
    this.severities = this.severityService.getSeverities();
    this.statuses = this.statusService.getBugStatuses();
    this.project = this.projectService.getCurrent();
    this.projectDue = new Date(this.project.endDate!);
    this.start = new Date();
  

    this.bugForm = this.fb.group({
      name: [''],
      type: [''],
      description: [''],
      priority: [''],
      severity: [''],
      status: [''],
      assigned: [''],
      owner: [owner],
      due: ['',],
    });
    

    console.log(this.project);
    console.log("due");
    console.log(this.projectDue);

    
    this.userService.getAllByProject(this.currentProjectId).subscribe({
      next: (resp:any) => {
        this.users = resp.data.users;
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  onCreate(bugForm:FormGroup): void {
    let bug = {
      name: bugForm.value.name,
      description: bugForm.value.description,
      type: bugForm.value.type,
      priority: bugForm.value.priority,
      severity: bugForm.value.severity,
      status: bugForm.value.status,
      assigned: bugForm.value.assigned,
      owner: bugForm.value.owner,
      due: new Date(bugForm.value.due!).toISOString(),
      project_id: parseInt(this.currentProjectId),
      user_id: parseInt(bugForm.value.owner),
      assigned_id: parseInt(bugForm.value.assigned)
    }

    this.bugService.create(bug).subscribe({
      next: (resp:any) => {
        console.log(resp);
        let dataArr: FormData =  new FormData();

        for(let a of this.attachments){
          dataArr.append('files', a.file, a.url);
        }

        this.filesService.addToBug(resp.data.bug.id!, dataArr).subscribe({
          next:() => {},
          error:() => {}
        })

        this.snackBar.open("saved", "✅")
        this.bugForm.reset();
        this.bugForm.get("owner")!.setValue(this.owner);
      }, 
      error: (err) => {
        console.log(err);
        swal.fire("Error", "Error while saving the project", "error");
      }
    });


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

}
