import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard {
  canActivate(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles = route.data?.['allowedRoles'];
      let roles = JSON.parse(localStorage.getItem("roles")!) as string[];
    
      console.log("allowed");
      console.log(allowedRoles);

      const isAllowed = roles.some(r=> allowedRoles.includes(r))

      console.log("is allowed");
      console.log(isAllowed);

    return isAllowed;
  }
}
