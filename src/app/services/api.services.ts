import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { QuotationListResponse } from '../models/quotation.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = 'https://localhost:7153/api/customers/';

  constructor(private http: HttpClient) { }
  private quotationByCustomerId = `/quotations/?name=hao&pageNumber=1`
  fetchAllCustomerListByPage(pageNumber: number) : Observable<Customer[]>{
    const url = `https://localhost:7153/api/customers/?name=&pageNumber=${pageNumber}`;
    return this.http.get<Customer[]>(url);

  }
 
  searchCustomerByName(customerName: string): Observable<Customer[]> {
    const url = `https://localhost:7153/api/customers/?name=${customerName}&pageNumber=1`;
    return this.http.get<Customer[]>(url);
  }
  
  getQuotationListsByCustomerId(
    customerId: number,
    pageNumber: number,
  ): Observable<any> {
    // const url = `${this.apiUrl}${customerId}${this.quotationByCustomerId}`;
    const url = `https://localhost:7153/api/customers/${customerId}/quotations?pendingPageNumber=${pageNumber}&paidPageNumber=${pageNumber}`;
    return this.http.get<QuotationListResponse>(url);
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