import { Component, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root',
  
})

export  class AuthGuard implements CanActivate {

constructor(private router: Router) {}
private jwtHelper: JwtHelperService = new JwtHelperService();

canActivate(): boolean {
  const token = localStorage.getItem('token');

  if (token && !this.jwtHelper.isTokenExpired(token)) {
    return true;
  } else {
    // Open a dialog box to indicate login failure
    

    // Navigate to the login page if not authenticated
    this.router.navigate(['/']);

    return false;
  }
}


 

}