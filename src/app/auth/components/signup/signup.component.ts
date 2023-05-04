import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/service/messaging.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  signupForm!: FormGroup;

  constructor(
    private fb : FormBuilder, 
    private auth: AuthService, 
    private messaging : MessagingService, 
    private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email : ['',
      Validators.required, 
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(25)
      ],
      password : ['',
      Validators.required/*,
      Validators.pattern('/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/gm')*/
      ],
      confirm: ['',
      Validators.required/*,
      Validators.pattern('/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/gm')*/
      ],
      userName: ['',
      Validators.required, 
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(25)
      ],
      photo: ['',]
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  signup(form : FormGroup) {

    let email = this.signupForm.get('email')!.value;
    let password = this.signupForm.get('password')!.value;
    let confirm = this.signupForm.get('confirm')!.value;
    let userName = this.signupForm.get('userName')!.value;

    
    let user = {
      email: email,
      password: password,
      confirm : confirm,
      Name : userName
    };

    this.sub.add(
      this.auth.signup(user).subscribe({
        next: (resp: any) => {
          this.router.navigate(['./admin'])
        },
        error: (err) => {
          console.log(err); 
          swal.fire("Error", "invalid email or password", "error");
        },
      })
    );

  }

  getErrorMessage() {}


}
