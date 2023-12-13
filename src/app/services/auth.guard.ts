import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { HttpClient , HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router,private http:HttpClient  ) {}
  
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
      this.router.navigate(['']);
      return false; // Block access
    }
  }
}
