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
    console.log('Shared data service created', this.partsInQuotation);
  }
  // loadQuotationDetails(quoteId: number, customerId: number) {
  //   // Check for valid IDs before making API call
  //   if (quoteId && customerId) {
  //     this.apiService.searchQuotationListDetailItem(quoteId, customerId, 1).subscribe(
  //       (dateResponse: HttpResponse<QuotationPart[]>) => {
  //         this.partsInQuotation = (dateResponse.body as any).parts;
  //         this.changeQuotationId(quoteId);
  //         this.changeCustomerId(customerId);
  //         console.log('Quotation edit opened successfully', dateResponse);
  //       },
  //       error => {
  //         console.error('Error loading quotation details', error);
  //       }
  //     );
  //   } else {
  //     console.error('Invalid IDs for loading quotation details');
  //   }
  // }
  changeCustomerId(customerId: number) {
    this.customerIdSource.next(customerId);
  }
  changeQuotationId(quotationId: number) {
    this.quotationIdSource.next(quotationId);
  }
  loadInitialData(quoteId: number, customerId: number): void {
    if (this.partsInQuotation.length === 0) {
      // Load data only if it hasn't been loaded yet
      this.apiService.searchQuotationListDetailItem(quoteId, customerId, 1).subscribe(
        (dateResponse: HttpResponse<QuotationPart[]>) => {
          this.partsInQuotation = (dateResponse.body as any).parts;
          this.partsInQuotationSubject.next(this.partsInQuotation);
        },
        error => {
          console.error('Error loading initial data', error);
        }
      );
    }
  }

  private partsInQuotation: QuotationPart[] = [];

  // Observable to allow components to subscribe to changes
  private partsInQuotationSubject = new BehaviorSubject<QuotationPart[]>(this.partsInQuotation);
  public partsInQuotation$ = this.partsInQuotationSubject.asObservable();

  // Method to add a part to the quotation
  addPartToQuotation(part: any) {
    console.log('Adding part to quotation:', part);
    console.log('Parts in quotation before:', this.partsInQuotation);
    this.partsInQuotation = [...this.partsInQuotation, part];
    this.partsInQuotationSubject.next(this.partsInQuotation);

    console.log('Parts in quotation after:', this.partsInQuotation);
    console.log('Parts in quotation subject:', this.partsInQuotationSubject);
  }
  // Method to get the parts in the quotation
  getPartsInQuotation(): any[] {
    return this.partsInQuotation;
  }

  // Method to remove a part from the quotation
  removePartFromQuotation(index: number) {
    console.log('Removing part from quotation:', index);

    // Create a new array that excludes the item at the given index
    const updatedParts = this.partsInQuotation.filter((_, i) => i !== index);

    // Update the BehaviorSubject with the new array
    this.partsInQuotationSubject.next(updatedParts);

    console.log('Updated parts in quotation:', updatedParts);
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
