export interface Customer {
    customerId: number;
  customerName: string;
  customerEmail: string;
  customerContact: string;
}

export interface CreateCustomer extends Customer {
  address: string;
}