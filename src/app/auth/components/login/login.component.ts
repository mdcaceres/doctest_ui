import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  private sub: Subscription = new Subscription();
  hide = true;
  user!:User

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.fb.group({
      email : ['',
      Validators.required, 
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(25)
      ],
      password : ['',
      Validators.required,
      Validators.pattern('/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/gm')
      ]
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  login(login: FormGroup){
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.user.email = email;
    this.user.password = password;

    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
    console.log("login: ",this.user);

    this.sub.add(
      this.auth.login(this.user).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.router.navigate(['./admin'])
        },
        error: () => {
          swal.fire("Error!", "Usuario o Contraseña incorrectos!", "error");
        },
      })
    );

  }

  get name() {
    return this.loginForm.get('name');
  }

  get email() {
    return this.loginForm.get('email');
  }

  getErrorMessage() {
    if (this.loginForm.value.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.value.email.hasError('email') ? 'Not a valid email' : '';
  }
}
