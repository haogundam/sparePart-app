import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDto } from '../models/auth.model';
import { Observable } from 'rxjs';
/* import { TokenApiModel } from '../models/token-api.model'; */
@Injectable({
  providedIn: 'root'
})
export  class AuthService {


  private baseUrl: string = 'https://localhost:7153/api/auth';
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
  }

  // signUp(userObj: any) {
  //   return this.http.post<any>(`${this.baseUrl}register`, userObj)
  // }

  // signIn(loginObj : any){
  //   return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  // }

  signOut() {
    localStorage.clear();
    this.router.navigate([''])
  }
  register(email: string, password: string): Observable<any> {
    const user: UserDto = { Email: email, Password: password };
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }


  login(email: string, password: string): Observable<string> {
    const headers = { 'Content-Type': 'application/json' };
    const user: UserDto = { Email: email, Password: password };

    return this.http.post<string>(`${this.baseUrl}/login`, user, {
      headers,
      responseType: 'text' as 'json' // Specify the response type as text
    });
  }
  private jwtHelper: JwtHelperService = new JwtHelperService();

   isTokenValid(token: string): boolean {
    // Check if the token is not expired
    return !this.jwtHelper.isTokenExpired(token);
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Add logic to check if the token is valid and not expired
    return !!token;
  }

  // storeToken(tokenValue: string){
  //   localStorage.setItem('token', tokenValue)
  // }
  // storeRefreshToken(tokenValue: string){
  //   localStorage.setItem('refreshToken', tokenValue)
  // }

  // getToken(){
  //   return localStorage.getItem('token')
  // }
  // getRefreshToken(){
  //   return localStorage.getItem('refreshToken')
  // }

  // isLoggedIn(): boolean{
  //   return !!localStorage.getItem('token')
  // }

  // decodedToken(){
  //   const jwtHelper = new JwtHelperService();
  //   const token = this.getToken()!;
  //   console.log(jwtHelper.decodeToken(token))
  //   return jwtHelper.decodeToken(token)
  // }

  // getfullNameFromToken(){
  //   if(this.userPayload)
  //   return this.userPayload.name;
  // }

  // getRoleFromToken(){
  //   if(this.userPayload)
  //   return this.userPayload.role;
  // }

  // // renewToken(tokenApi : TokenApiModel){
  // //   return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
  // // }
}