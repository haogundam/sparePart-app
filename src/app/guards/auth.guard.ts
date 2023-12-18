import { Component, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
  
})

export  class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  private jwtHelper: JwtHelperService = new JwtHelperService();

canActivate(
   ): boolean {
    const token = localStorage.getItem('token');

    // Check if the user is authenticated based on your criteria
    if ( token && !this.jwtHelper.isTokenExpired(token)) {
        return true; // Allow access
    } else {
        // Navigate to the login page if not authenticated
        this.router.navigate(['/']);
        return false; // Block access
    }
} 


 

}