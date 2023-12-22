import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request:', request);
    const authToken = this.apiService.getAuthToken();
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authReq);
  }
} 
