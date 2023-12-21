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
  constructor() { }

  changeCustomerId(customerId: number) {
    this.customerIdSource.next(customerId);
  }
  changeQuotationId(quotationId: number) {
    this.quotationIdSource.next(quotationId);
  }

}
