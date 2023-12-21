export interface Customer {
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerContact: string;
}

export interface createCustomer extends Customer {
  address1: string;
  address2: string;
}

export interface createCustomerRequest {
  customerName: string;
  customerEmail: string;
  customerContact: string;
  address:string;
}

export interface registerCustomerProfile {
  CustomerId: number;
  CustomerName: string;
  CustomerContact: string;
  CustomerEmail: string;
  CustomerAddress:string;
}

export interface formData {
  customername: string;
  customercontact: number;
  customeremail: string;
  customeraddress1: string;
  customeraddress2: string;
}
