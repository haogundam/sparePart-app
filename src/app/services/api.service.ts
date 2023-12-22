// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CreateQuotationResponse, QuotationListResponse, QuotationPart,QuotePartAdd } from '../models/quotation.model';
import { environment } from '../../environments/environment';
import { parts, partsResponse } from '../models/parts.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = `${environment.apiUrl}customers/`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  fetchAllCustomerListByPage(pageNumber: number): Observable<HttpResponse<Customer[]>> {
    const url = `${this.apiUrl}?name=&pageNumber=${pageNumber}`;
    const headers = this.auth.getHeaders();
    console.log('Headers:', headers);
    console.log('URL:', url);
    return this.http.get<Customer[]>(`${url}`, { observe: 'response', headers: headers });
  }

  //Get Parts Data

  GetAllParts(): Observable<HttpResponse<partsResponse[]>> {
    const headers = this.auth.getHeaders();
    const url = `${environment.apiUrl}parts?pageNumber=1`;
    return this.http.get<partsResponse[]>(url, { observe: 'response', headers: headers });
  }

  searchCustomerByName(customerName: string): Observable<HttpResponse<Customer[]>> {
    const headers = this.auth.getHeaders();
    const url = `${this.apiUrl}?name=${customerName}&pageNumber=1`;
    return this.http.get<Customer[]>(url, { observe: 'response', headers: headers });
  }

  //Search Parts By SKU
  searchPartsBySKU(sku: string): Observable<HttpResponse<partsResponse[]>> {
    const headers = this.auth.getHeaders();
    const url = `${environment.apiUrl}parts?sku=${sku}&pageNumber=1`;
    return this.http.get<partsResponse[]>(url, { observe: 'response', headers: headers });
  }

  showSameCategorySKU(sku: string): Observable<HttpResponse<partsResponse[]>> {
    const url = `${environment.apiUrl}parts/category?sku=${sku}&pageNumber=1`;
    const headers = this.auth.getHeaders();
    return this.http.get<partsResponse[]>(url, { observe: 'response', headers: headers });
  }

  //Fetch Quotation via Search Customer Id

  getQuotationListsByCustomerId(
    customerId: number,
    pageNumber: number,
  ): Observable<HttpResponse<any>> {
    const headers = this.auth.getHeaders();
    // const url = `${this.apiUrl}${customerId}${this.quotationByCustomerId}`;
    const url = `${this.apiUrl}${customerId}/quotations?pageNumber=1`;
    return this.http.get<QuotationListResponse>(`${url}`, { observe: 'response', headers: headers });
  }

  searchQuotationListDetailItem(quotationNo: number, customerId: number, pageNumber: number): Observable<HttpResponse<QuotationPart[]>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}?pageNumber=${pageNumber}`;
    const headers = this.auth.getHeaders();
    return this.http.get<QuotationPart[]>(url, { observe: 'response', headers: headers });
  }

  createQuotation(customerId: number): Observable<string> {
    const url = `${this.apiUrl}${customerId}/quotations`;
    const headers = this.auth.getHeaders();
    return this.http.post(url, {}, { headers: headers, responseType: 'text' }
    );
  }

  addPartToQuotation(customerId: number, quotationNo: number, quotePartAdd: QuotePartAdd): Observable<HttpResponse<number>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}`;
    const headers = this.auth.getHeaders();
    const body = quotePartAdd;
    return this.http.post<number>(url, body, { observe: 'response', headers: headers, responseType: 'text' as 'json' });
  }
    
  removePartFromQuotation( customerId: number, quotationNo: number, quotePartId: number): Observable<HttpResponse<string>> {
    const url = `${this.apiUrl}${customerId}/quotations/${quotationNo}/quoteparts/${quotePartId}`;
    const headers = this.auth.getHeaders();
    return this.http.delete<string>(url, { observe: 'response', headers: headers, responseType: 'text' as 'json' });
  }
  // registerCustomer(reqBody:createCustomerRequest) :Observable<createCustomerRequest> {
  //   const url = `https://localhost:7047/api/customers`;
  //   return this.http.post<createCustomerRequest>(url,reqBody);
  // }

}
