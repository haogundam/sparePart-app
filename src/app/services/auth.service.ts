import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User,UserDto } from '../models/auth.model';
import { Observable } from 'rxjs';
/* import { TokenApiModel } from '../models/token-api.model'; */
@Injectable({
  providedIn: 'root'
})
export default class AuthService {

  private baseUrl: string = 'https://localhost:7153/api/auth';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
  }

  // signUp(userObj: any) {
  //   return this.http.post<any>(`${this.baseUrl}register`, userObj)
  // }

  // signIn(loginObj : any){
  //   return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  // }

  // signOut(){
  //   localStorage.clear();
  //   this.router.navigate(['login'])
  // }
  register(email: string, password: string): Observable<any> {
    const user: UserDto = { Email: email, Password: password };
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  UserId:number = 2;

  login(email: string, password: string){
    const headers = { 'Content-Type': 'application/json' };
    const user: UserDto = { Email: email, Password: password };
    console.log(user);
    return this.http.post<UserDto>(`${this.baseUrl}/login`, {user},{headers});
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