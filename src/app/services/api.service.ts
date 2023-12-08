// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  // Example API call method
  getData(): Observable<any> {
    const url = `${this.apiUrl}/data`;
    return this.http.get(url);
  }
  
  fetchData() {
    this.getData().subscribe(data => {
      console.log('API Data:', data);
    });
  }
  //authentification
  private static readonly mockUser = {
    username: 'user',
    password: 'password',
  };

  static login(username: string, password: string): Observable<boolean> {
    // Simulate authentication logic
    const isAuthenticated = username === this.mockUser.username && password === this.mockUser.password;

    // Return an observable with the authentication result
    return of(isAuthenticated);
  }
}
