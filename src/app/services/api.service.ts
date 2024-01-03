import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Customer, registerCustomerProfile } from '../models/customer.model';
import { CreateQuotationResponse, QuotationListResponse, QuotationPart, QuotePardIdSearch, QuotePartAdd } from '../models/quotation.model';
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
  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string): Observable<any> {
    const user: UserDto = { Email: email, Password: password };
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(email: string, password: string): Observable<string> {
    const user: UserDto = { Email: email, Password: password };

    return this.http.post<string>(`${this.baseUrl}/login`, user, {
      responseType: 'text' as 'json' 
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

  fetchAllCustomerListByPage(pageNumber: number, customerName: string): Observable<HttpResponse<Customer[]>> {
    const url = `${this.apiUrl}?name=${customerName}&pageNumber=${pageNumber}`;

    return this.http.get<Customer[]>(`${url}`, { observe: 'response' });
  }

  //Get Parts Data

  GetAllParts(): Observable<HttpResponse<partsResponse[]>> {
    const url = `${environment.apiUrl}parts?pageNumber=1`;
    return this.http.get<partsResponse[]>(url, { observe: 'response'});
  }

  searchCustomerByName(customerName: string, pageNumber: number): Observable<HttpResponse<Customer[]>> {
    // const headers = this.getHeaders();
    const url = `${this.apiUrl}?name=${customerName}&pageNumber=${pageNumber}`;
    return this.http.get<Customer[]>(url, { observe: 'response'});
  }

  //Search Parts By SKU
  searchPartsBySKU(sku: string): Observable<HttpResponse<partsResponse[]>> {
    const url = `${environment.apiUrl}parts?sku=${sku}&pageNumber=1`;
    return this.http.get<partsResponse[]>(url, { observe: 'response' });
  }

  showSameCategorySKU(sku: string): Observable<HttpResponse<partsResponse[]>> {
    const url = `${environment.apiUrl}parts/category?sku=${sku}&pageNumber=1`;
    return this.http.get<partsResponse[]>(url, { observe: 'response' });
  }

  //Fetch Quotation via Search Customer Id

  getQuotationListsByCustomerId(
    customerId: number,
    pendingPageNumber: number, completedPageNumber: number
  ): Observable<HttpResponse<any>> {
    // const url = `${this.apiUrl}${customerId}${this.quotationByCustomerId}`;
    const url = `${this.apiUrl}${customerId}/quotations?pendingPageNumber=${pendingPageNumber}&paidPageNumber=${completedPageNumber}`;
    return this.http.get<QuotationListResponse>(`${url}`, { observe: 'response' });
  }

  searchQuotationListDetailItem(quotationNo: number, customerId: number, pageNumber: number): Observable<HttpResponse<QuotationPart[]>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}?pageNumber=${pageNumber}`;
    return this.http.get<QuotationPart[]>(url, { observe: 'response' });
  }
  searchQuotationListDetailItemByQuotationId(quotationNo: number, pageNumber: number): Observable<HttpResponse<QuotePardIdSearch[]>> {
    const url = `${environment.apiUrl}quotations/${quotationNo}?pageNumber=${pageNumber}`;
    return this.http.get<QuotePardIdSearch[]>(url, { observe: 'response' });
  } 
  createQuotation(customerId: number): Observable<string> {
    const url = `${this.apiUrl}${customerId}/quotations`;
    return this.http.post(url, {}, { responseType: 'text' }
    );
  }

  addPartToQuotation(customerId: number, quotationNo: number, quotePartAdd: QuotePartAdd): Observable<HttpResponse<number>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}`;
    const body = quotePartAdd;
    return this.http.post<number>(url, body, { observe: 'response', responseType: 'text' as 'json' });
  }

  removePartFromQuotation(customerId: number, quotationNo: number, quotePartId: number, warehouseName: string): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}/quoteparts/${quotePartId}`;
    return this.http.delete<string>(url, { observe: 'response',responseType: 'text' as 'json' });
  }

  submitQuotation(customerId: number, quotationNo: number): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}/submit`;
    return this.http.patch<string>(url, {}, { observe: 'response', responseType: 'text' as 'json' });
  }

  clearQuotation(customerId: number, quotationNo: number): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}/clear`;
    return this.http.delete<any>(url, { observe: 'response', responseType: 'text' as 'json' });
  }
  registerCustomer(reqBody: registerCustomerProfile): Observable<HttpResponse<registerCustomerProfile[]>> {
    const url = `${this.apiUrl}`;
    return this.http.post<registerCustomerProfile[]>(url, reqBody, { observe: 'response', responseType: 'text' as 'json' });
  }
  updateQuotation(customerId: number, quotationNo: number, quotePartId: number, quantity: number, unitPrice: number): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}/quoteparts/${quotePartId}`;
    const body = {
     
      quantity: quantity,
      unitPrice: unitPrice
    };
    return this.http.patch<string>(url, body, { observe: 'response', responseType: 'text' as 'json' });
  }
}
