import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  constructor() { }

  changeCustomerId(customerId: number) {
    this.customerIdSource.next(customerId);
  }
  changeQuotationId(quotationId: number) {
    this.quotationIdSource.next(quotationId);
  }
  private partsInQuotation: any[] = [];

  // Observable to allow components to subscribe to changes
  private partsInQuotationSubject = new BehaviorSubject<any[]>(this.partsInQuotation);
  public partsInQuotation$ = this.partsInQuotationSubject.asObservable();

  // Method to add a part to the quotation
  addPartToQuotation(part: any) {
    this.partsInQuotation.push(part);
    this.partsInQuotationSubject.next(this.partsInQuotation);
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
    this.partsInQuotation = [];
    this.partsInQuotationSubject.next(this.partsInQuotation);
  }
}
