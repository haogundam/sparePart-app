// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CreateQuotationResponse, QuotationListResponse, QuotationPart,QuotePartAdd } from '../models/quotation.model';
import { environment } from '../../environments/environment';
import { parts, partsResponse } from '../models/parts.model';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDto } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = `${environment.apiUrl}customers/`;
  private baseUrl: string = `${environment.apiUrl}auth`;
  private userPayload: any;
  constructor(private http: HttpClient,private router:Router) { }

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
    return !!token;
  }

  getAuthToken() {
    return localStorage.getItem('token') as string;
  }
  getHeaders() {
    return new HttpHeaders({
   
      Authorization: "Bearer " + this.getAuthToken(),
    });
  }
  
  signOut() {
    localStorage.clear();
    this.router.navigate([''])
  }
  // register(email: string, password: string): Observable<any> {
  //   const user: UserDto = { Email: email, Password: password };
  //   return this.http.post<any>(`${this.baseUrl}/register`, user);
  // }

  fetchAllCustomerListByPage(pageNumber: number,customerName: string): Observable<HttpResponse<Customer[]>> {
    const url = `${this.apiUrl}?name=${customerName}&pageNumber=${pageNumber}`;
    const headers = this.getHeaders();
    console.log('Headers:', headers);
    console.log('URL:', url);
    return this.http.get<Customer[]>(`${url}`, { observe: 'response', headers: headers });
  }

  //Get Parts Data

  GetAllParts(): Observable<HttpResponse<partsResponse[]>> {
    const headers = this.getHeaders();
    const url = `${environment.apiUrl}parts?pageNumber=1`;
    return this.http.get<partsResponse[]>(url, { observe: 'response', headers: headers });
  }

  searchCustomerByName(customerName: string,pageNumber: number): Observable<HttpResponse<Customer[]>> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}?name=${customerName}&pageNumber=${pageNumber}`;
    return this.http.get<Customer[]>(url, { observe: 'response', headers: headers });
  }

  //Search Parts By SKU
  searchPartsBySKU(sku: string): Observable<HttpResponse<partsResponse[]>> {
    const headers = this.getHeaders();
    const url = `${environment.apiUrl}parts?sku=${sku}&pageNumber=1`;
    return this.http.get<partsResponse[]>(url, { observe: 'response', headers: headers });
  }

  showSameCategorySKU(sku: string): Observable<HttpResponse<partsResponse[]>> {
    const url = `${environment.apiUrl}parts/category?sku=${sku}&pageNumber=1`;
    const headers = this.getHeaders();
    return this.http.get<partsResponse[]>(url, { observe: 'response', headers: headers });
  }

  //Fetch Quotation via Search Customer Id

  getQuotationListsByCustomerId(
    customerId: number,
    pendingPageNumber: number,completedPageNumber: number
  ): Observable<HttpResponse<any>> {
    const headers = this.getHeaders();
    // const url = `${this.apiUrl}${customerId}${this.quotationByCustomerId}`;
    const url = `${this.apiUrl}${customerId}/quotations?pendingPageNumber=${pendingPageNumber}&paidPageNumber=${completedPageNumber}`;
    return this.http.get<QuotationListResponse>(`${url}`, { observe: 'response', headers: headers });
  }

  searchQuotationListDetailItem(quotationNo: number, customerId: number, pageNumber: number): Observable<HttpResponse<QuotationPart[]>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}?pageNumber=${pageNumber}`;
    const headers = this.getHeaders();
    return this.http.get<QuotationPart[]>(url, { observe: 'response', headers: headers });
  }

  createQuotation(customerId: number): Observable<string> {
    const url = `${this.apiUrl}${customerId}/quotations`;
    const headers = this.getHeaders();
    return this.http.post(url, {}, { headers: headers, responseType: 'text' }
    );
  }

  addPartToQuotation(customerId: number, quotationNo: number, quotePartAdd: QuotePartAdd): Observable<HttpResponse<number>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}`;
    const headers = this.getHeaders();
    const body = quotePartAdd;
    return this.http.post<number>(url, body, { observe: 'response', headers: headers, responseType: 'text' as 'json' });
  }
    
  removePartFromQuotation( customerId: number, quotationNo: number, quotePartId: number, warehouseName: string): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}/quoteparts/${quotePartId}`;
    const headers = this.getHeaders();
    return this.http.delete<string>(url, { observe: 'response', headers: headers, responseType: 'text' as 'json' });
  }
  // registerCustomer(reqBody:createCustomerRequest) :Observable<createCustomerRequest> {
  //   const url = `https://localhost:7047/api/customers`;
  //   return this.http.post<createCustomerRequest>(url,reqBody);
  // }

  submitQuotation(customerId: number, quotationNo: number): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}/submit`;
    const headers = this.getHeaders();
    return this.http.patch<string>(url, {}, { observe: 'response', headers: headers, responseType: 'text' as 'json' });
  }

  clearQuotation(customerId: number, quotationNo: number): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}/clear`;
    const headers = this.getHeaders();
    return this.http.delete<any>(url, { observe: 'response', headers: headers, responseType: 'text' as 'json' });
  }
}
