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
  export interface PartsInQuoteList{
    partId  : number;
    partName : string;
    quantity : number;
    unitPrice : number;
  }
  export interface QuotationListResponse {
    CustomerId: number;
    CustomerName: string;
    quotationList: QuotationResponse[];
  }
  // QuotationResponse model in Angular code
  export interface QuotationResponse {
    quoteNo: number;
    quoteDate: string;
    quoteValidDate: string;
    status: number;
    // other properties
  }

  export interface CreateQuotationResponse{
    string: string;
  }