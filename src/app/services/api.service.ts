// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams ,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { QuotationListResponse, QuotationPart } from '../models/quotation.model';
import { environment } from '../../environments/environment';
import { parts ,partsResponse } from '../models/parts.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = `${environment.apiUrl}customers/`;

  constructor(private http: HttpClient) { }
  
  fetchAllCustomerListByPage(pageNumber: number) : Observable<HttpResponse<Customer[]>>{
    const url = `${this.apiUrl}?name=&pageNumber=${pageNumber}`;
    
    return this.http.get<Customer[]>(`${url}`,{ observe: 'response' });
    
  }
   //Get Parts Data

   GetAllParts() :Observable<HttpResponse<partsResponse[]>> {
    const url =`${environment.apiUrl}parts?pageNumber=1`;
    return this.http.get<partsResponse[]>(url,{ observe: 'response' });
  }
 
  searchCustomerByName(customerName: string): Observable<HttpResponse<Customer[]>> {
    const url = `${this.apiUrl}?name=${customerName}&pageNumber=1`;
    return this.http.get<Customer[]>(url, { observe: 'response' });
  }
  
  //Search Parts By SKU
  searchPartsBySKU(sku: string): Observable<HttpResponse<partsResponse[]>> {
    const url =`${environment.apiUrl}parts?sku=${sku}&pageNumber=1`;
    return this.http.get<partsResponse[]>(url, { observe: 'response' });
  }

  showSameCategorySKU(sku:string): Observable<HttpResponse<partsResponse[]>> {
    const url =`${environment.apiUrl}parts/category?sku=${sku}&pageNumber=1`;
    return this.http.get<partsResponse[]>(url, { observe: 'response' });
  }

//Fetch Quotation via Search Customer Id

  getQuotationListsByCustomerId(
    customerId: number,
    pageNumber: number,
  ): Observable<HttpResponse<any>> {
    // const url = `${this.apiUrl}${customerId}${this.quotationByCustomerId}`;
    const url = `${this.apiUrl}${customerId}/quotations?pageNumber=1`;
    return this.http.get<QuotationListResponse>(`${url}`, { observe: 'response' });
  }

  searchQuotationListDetailItem(quotationNo: number,customerId: number,pageNumber:number): Observable<HttpResponse<QuotationPart[]>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}?pageNumber=${pageNumber}`;
    return this.http.get<QuotationPart[]>(url, { observe: 'response' });
  }

 
}
