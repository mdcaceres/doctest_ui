import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Claims } from '../../interfaces/claims';
import { Role } from '../../interfaces/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  private sub: Subscription = new Subscription();
  hide = true;
  helper = new JwtHelperService();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService) { }

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
      Validators.required/*,
      Validators.pattern('/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/gm')*/
      ]
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  login(login: FormGroup){
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    
    let user: User = {
      email: email,
      password: password 
    };

    this.sub.add(
      this.auth.login(user).subscribe({
        next: (resp: any) => {
          let tigetToken = this.cookieService.get('X-Tiger-Token');
          let decoded = jwt_decode<Claims>(tigetToken);

          localStorage.setItem('userId', JSON.stringify(decoded.ID));
          localStorage.setItem('userName', decoded.user_name!);

          let roles = new Map<number,string>(); 


          for(let role of decoded.Roles!) {
            let userRole = role as Role; 
            roles.set(userRole.ID!, userRole.name!); 
          }

          localStorage.setItem('roles', JSON.stringify(Array.from(roles.entries())))

          this.router.navigate(['./admin/home'])
        },
        error: (err) => {
          console.log(err); 
          swal.fire("Error", "invalid email or password", "error");
        },
      })
    );

  }

  get password() {
    return this.loginForm.get('password');
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
