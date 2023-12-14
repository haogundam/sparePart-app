// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { QuotationListResponse, QuotationPart } from '../models/quotation.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = 'https://localhost:7153/api/customers/';

  constructor(private http: HttpClient) { }
  
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
    const url = `https://localhost:7153/api/customers/${customerId}/quotations?pageNumber=1`;
    return this.http.get<QuotationListResponse>(url);
  }

  searchQuotationListDetailItem(quotationNo: number,customerId: number): Observable<any> {
    const url = `https://localhost:7153/api/customers/${customerId}/quotations/${quotationNo}?pageNumber=1`;
    return this.http.get<QuotationPart[]>(url);
  }

  
}
