import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, catchError, map, of, throwError } from 'rxjs';
import { Invitation } from 'src/app/admin/interfaces/invitation';
import { InvitationService } from 'src/app/admin/service/invitation.service';
import { UserService } from 'src/app/admin/service/user.service';
import { User } from 'src/app/auth/interfaces/user';
import { MessagingService } from 'src/app/service/messaging.service';
import swal from 'sweetalert2';
import { ProjectDashboardComponent } from '../project-dashboard/project-dashboard.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-invitation',
  templateUrl: './project-invitation.component.html',
  styleUrls: ['./project-invitation.component.css']
})
export class ProjectInvitationComponent implements OnInit, OnDestroy {
  invitationForm!: FormGroup;
  roles: any[] = [{name: "admin", id:1},{name: "tester", id:1},{name: "client", id:1}]; 
  userId!: string;
  invitedId!: string; 
  invitedMessageToken!: string;
  projectId!: string; 
  private sub : Subscription = new Subscription();
  email!: string;


  constructor(
    private fb: FormBuilder,
    private users: UserService,
    private invitation: InvitationService,
    private messaging: MessagingService,
    @Inject(MAT_DIALOG_DATA) private data: {route: ActivatedRoute},
    public dialogRef: MatDialogRef<ProjectDashboardComponent>) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')!;
    this.invitationForm = this.fb.group({
      user : ['', {validators: [Validators.required], asyncValidators: [this.userNameCheck(this.users)]}],
      
      role : ['',
      Validators.required
      ]
    }, { updateOn: 'blur' })

    this.data.route.params.subscribe(params => {
      this.projectId = JSON.stringify(params['id']);
      console.log(this.projectId);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  send() {

    let invitation: Invitation = {
      inviterId: `${this.userId}`,
      invitedId: `${this.invitedId}`,
      ProjectId: this.projectId.replace(/"/g,''),
      role: `${this.invitationForm.value.role}`
    }

    this.sub.add(
      this.invitation.send(invitation).subscribe(() => {
        next: () => {
          this.dialogRef.close();
          swal.fire({
            title: 'Invitation sent',
            text: 'Invitation sent successfully',
            icon: 'success'
          })
        };
        error: (e:any) => {
          swal.fire({
            title: 'Error',
            text: 'Invitation could not be sent',
            icon: 'error'
          });
        }
      })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get username() {
    return this.invitationForm.get('user');
  }

  userNameCheck(service: any): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.checkUsername(control.value).pipe(
        map((result:User) => {
          if (result) {
            this.invitedId = result.id!; 
            this.email = result.email!;
            return
          } 
        }),
        catchError(error => {
          if (error.status === 404) {
            return of({usernameNotFound: true});
          } else {
            return throwError(() => error);
          }
        })
      );
    };
  }

}

