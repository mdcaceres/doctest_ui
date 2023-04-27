import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, catchError, map, of, throwError } from 'rxjs';
import { UserService } from 'src/app/admin/service/user.service';
import { User } from 'src/app/auth/interfaces/user';

@Component({
  selector: 'app-project-invitation',
  templateUrl: './project-invitation.component.html',
  styleUrls: ['./project-invitation.component.css']
})
export class ProjectInvitationComponent implements OnInit {
  invitationForm!: FormGroup;
  roles: any[] = [{name: "admin", id:1},{name: "tester", id:1},{name: "client", id:1}]; 
  userId!: string;
  invitedId!: string; 
  projectId!: string; 
  private sub : Subscription = new Subscription();


  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef,
    private users: UserService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')!;
    console.log(this.route.snapshot.paramMap.get('id'));
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.invitationForm = this.fb.group({
      user : ['', {validators: [Validators.required], asyncValidators: [this.userNameCheck(this.users)]}],
      
      role : ['',
      Validators.required
      ]
    }, { updateOn: 'blur' })
  }

  send(form: FormGroup) {

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
        map(({result}) => {
          if (result) {
            this.invitedId = result.id; 
            return {usernameExists: true};
          } else {
            return null;
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

