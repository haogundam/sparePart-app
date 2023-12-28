import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './services/api.service';
import { QuotationPart } from './models/quotation.model';
import { HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private customerIdSource = new BehaviorSubject<number | null>(null);
  currentCustomerId = this.customerIdSource.asObservable();
  private quotationIdSource = new BehaviorSubject<number | null>(null);
  currentQuotationId = this.quotationIdSource.asObservable();
  private quotePartIdSource = new BehaviorSubject<number | null>(null);
  currentQuotePartId = this.quotePartIdSource.asObservable();
  constructor(private apiService: ApiService) {
    this.loadQuotationDetails();
  }
  loadQuotationDetails() {
    this.apiService.searchQuotationListDetailItem((this.currentQuotationId as unknown as number), (this.currentCustomerId as unknown as number), 1).subscribe(
      (dateResponse: HttpResponse<QuotationPart[]>) => {
        this.partsInQuotation = (dateResponse.body as any).parts;
        this.changeCustomerId((dateResponse.body as any).customerId);
        this.changeQuotationId((dateResponse.body as any).quotationId);
        console.log('Quotation edit opened successfully', dateResponse);
      }
      ,
      error => {
        // Handle error
      }
    );
  }
  changeCustomerId(customerId: number) {
    this.customerIdSource.next(customerId);
  }
  changeQuotationId(quotationId: number) {
    this.quotationIdSource.next(quotationId);
  }
  private partsInQuotation: QuotationPart[] = [];

  // Observable to allow components to subscribe to changes
  private partsInQuotationSubject = new BehaviorSubject<QuotationPart[]>(this.partsInQuotation);
  public partsInQuotation$ = this.partsInQuotationSubject.asObservable();

  // Method to add a part to the quotation
  addPartToQuotation(part: any) {
    console.log('Adding part to quotation:', part);
    // Part does not exist, add it
    this.partsInQuotation = [...this.partsInQuotation, part];
    // Emit the updated array
    this.partsInQuotationSubject.next(this.partsInQuotation);

    console.log('Parts in quotation:', this.partsInQuotation);
    console.log('Parts in quotation subject:', this.partsInQuotationSubject);
  }
  // Method to get the parts in the quotation
  getPartsInQuotation(): any[] {
    return this.partsInQuotation;
  }

  // Method to remove a part from the quotation
  removePartFromQuotation(index: number) {
    this.partsInQuotation.splice(index, 1);
    this.partsInQuotationSubject.next(this.partsInQuotation);

  }
  changeQuotePartId(quotePartId: number) {
    this.quotePartIdSource.next(quotePartId);
  }

  clearQuotation() {
    this.customerIdSource.next(null);
    this.quotationIdSource.next(null);
    this.quotePartIdSource.next(null);
    this.partsInQuotation = [];
    this.partsInQuotationSubject.next(this.partsInQuotation);
  }
}
