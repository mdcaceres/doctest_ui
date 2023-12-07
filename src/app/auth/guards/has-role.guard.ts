import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';
import swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard {
  constructor() {}

  canActivate(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles = route.data?.['allowedRoles'];
      let roles = JSON.parse(localStorage.getItem("roles")!) as string[];
    
      console.log("allowed");
      console.log(allowedRoles);

      const isAllowed = roles.some(r=> allowedRoles.includes(r))

      if(!isAllowed){
        swal.fire("Error", "You dont have the required role", "error");
      }

    return isAllowed;
  }
}
