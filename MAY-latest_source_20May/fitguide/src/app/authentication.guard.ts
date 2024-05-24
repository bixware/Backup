import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}
  canActivate(snapshot: ActivatedRouteSnapshot): boolean {
      /*let myuser=localStorage.getItem('user_id');
      if(!myuser) {
        this.router.navigate(['login']);
      }
      if(snapshot.url[0].path === 'forgot_password') {
        this.router.navigate(['forgot_password']);
      }*/
      return true;
  }
  canActivateChild(): boolean {
    let myuser=localStorage.getItem('user_id');
    if(!myuser) {
      this.router.navigate(['login']);
    }
    return true;
    //return this.canActivate();
  } 
}
