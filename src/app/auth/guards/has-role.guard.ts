import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard {
  canActivate(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles = route.data?.['allowedRoles'];
      let roles = new Map(JSON.parse(localStorage.getItem("roles")!));
      
      let allowed = Array.from( roles.values() );

      const isAllowed = allowed.some(r=> allowedRoles.includes(r))

    return isAllowed;
  }
}
