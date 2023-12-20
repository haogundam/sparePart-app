// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Customer, createCustomerRequest } from '../models/customer.model';
import { QuotationListResponse } from '../models/quotation.model';
import { ObserversModule } from '@angular/cdk/observers';
import { parts, partsResponse } from '../models/parts.model';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  private apiUrl = 'https://localhost:7047/api/customers/';


  //Fetch Customer Data

  constructor(private http: HttpClient) { }
  fetchAllCustomerListByPage(pageNumber: number) : Observable<Customer[]>{
    const url = `https://localhost:7047/api/customers/?name=&pageNumber=${pageNumber}`;
    return this.http.get<Customer[]>(url);

    
  }
  //register customer
  registerCustomer(reqBody:createCustomerRequest[]) :Observable<createCustomerRequest[]> {
    const url = `https://localhost:7047/api/customers`;
    return this.http.post<createCustomerRequest[]>(url,reqBody);
  }
 
 
  //Get Parts Data

  GetAllParts() :Observable<partsResponse[]> {
    const url =`https://localhost:7047/api/parts?pageNumber=1`;
    return this.http.get<partsResponse[]>(url);
  }
  //Search Customer By Name

  searchCustomerByName(customerName: string): Observable<Customer[]> {
    const url = `https://localhost:7047/api/customers/?name=${customerName}&pageNumber=1`;
    return this.http.get<Customer[]>(url);
  }
  
  //Search Parts By SKU
  searchPartsBySKU(sku: string): Observable<parts[]> {
    const url = `https://localhost:7047/api/customers/?sku=${sku}&pageNumber=1`;
    return this.http.get<parts[]>(url);
  }


//Fetch Quotation via Search Customer Id

  getQuotationListsByCustomerId(
    customerId: number,
    pageNumber: number,
  ): Observable<any> {
    // const url = `${this.apiUrl}${customerId}${this.quotationByCustomerId}`;
    const url = `https://localhost:7047/api/customers/${customerId}/quotations?pendingPageNumber=${pageNumber}&paidPageNumber=${pageNumber}`;
    return this.http.get<QuotationListResponse>(url);
  }


  //User authentification

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
