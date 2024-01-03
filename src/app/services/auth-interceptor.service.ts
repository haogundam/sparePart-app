import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if it's not the login or register URL
    console.log('Intercepted URL SSS:', request.url);

    if (!request.url.includes('/login') && !request.url.includes('/register')) {
      // Clone the request to add the new header.
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('token') as string}`)
      });
      console.log('Intercepted URL:', authReq);
      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    } else {
      // For login and register requests, don't modify the request
      return next.handle(request);
    }
  }
}
