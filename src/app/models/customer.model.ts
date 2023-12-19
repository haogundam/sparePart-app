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

