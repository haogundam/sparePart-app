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
    quotePartId: number;
    quoteNo: number;
    partId: number;
    unitPrice: number;
    qiantity: number;
  }
  export interface QuotationListResponse {
    CustomerId: number;
    CustomerName: string;
    QuotationList: QuotationResponse[];
  }
  // QuotationResponse model in Angular code
  export interface QuotationResponse {
    quoteNo: number;
    quoteDate: string;
    quoteValidDate: string;
    status: string;
    // other properties
  }