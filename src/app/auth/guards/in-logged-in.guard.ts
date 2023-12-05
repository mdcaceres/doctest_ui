import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class InLoggedInGuard {

  constructor(private cookieService: CookieService,private authService: AuthService, private router : Router, private jwtHelper: JwtHelperService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let t = this.cookieService.get('X-Tiger-Token');
    let exp = this.jwtHelper.isTokenExpired(t);
    console.log("is expired?");
    console.log(exp);
    if(this.authService.isLoggedIn$ && !exp) {
      return this.authService.isLoggedIn$;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
  
}
