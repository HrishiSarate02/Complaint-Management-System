import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService,private sto:StorageService) { }

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sto.isUserLoggedIn()) {
      return true;
    }
    alert('You are being redirected to Login Page');
    this.router.navigate(['login']);
    return false;
  }
}
