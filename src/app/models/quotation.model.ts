export interface QuoteList {
  quoteNo: string;
  quoteDate: Date;
  quoteValidDate: Date;
  quoteStatus: string;
  totalAmount: number;
  paymentType: string;
  paymentStatus: string;
  QuotationParts: QuotationPart[];
}

export interface QuotationPart {
  quoteNo: number;
  quoteDate: string;
  totalAmount: number;
  parts: PartsInQuoteList[];

}
export interface PartsInQuoteList {
  quotePartId: number;
  partId: number;
  partName: string;
  quantity: number;
  unitPrice: number;
}
export interface QuotationListResponse {
  CustomerId: number;
  CustomerName: string;
  paidQuotationList: QuotationResponse[];
  pendingQuotationList: QuotationResponse[];

}
// QuotationResponse model in Angular code
export interface QuotationResponse {
  quoteNo: number;
  quoteDate: string;
  quoteValidDate: string;
  // other properties
}

export interface CreateQuotationResponse {
  string: string;
}

export interface QuotePartAdd {
  partId: number,
  warehouseName:string,
  unitPrice: number,
  quantity: number
}

import { Customer} from './customer.model';
export interface QuotePardIdSearch {
  customerInfo: Customer,
  status: number,
  quoteNo: number,
  quoteDate: string,
  totalAmount: number,
  parts: PartsInQuoteList[]
}
export interface PartsInQuoteListForIdSearch {
  quotePartId: number;
  partId: number;
  sku: string;
  partName: string;
  quantity: number;
  unitPrice: number;
}