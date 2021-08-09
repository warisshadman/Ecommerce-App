import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../_services/session.service';

@Injectable({
  providedIn: 'root'
})

export class AuthChildGuard implements CanActivateChild {
  constructor (private sessionService: SessionService, private router: Router) { }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.sessionService.isLoggedInUser()) {
      this.router.navigateByUrl('/signin');
      this.sessionService.deleteToken();
      return false;
    }
    return true;
  }

}