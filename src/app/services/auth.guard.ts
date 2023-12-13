// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');

    // Check if the user is authenticated based on your criteria
    if (token ) {
      return true; // Allow access
    } else {
      // Navigate to the login page if not authenticated
      this.router.navigate(['/login']);
      return false; // Block access
    }
  }
}
