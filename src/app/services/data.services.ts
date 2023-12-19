import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer,createCustomer } from "../models/customer.model";

@Injectable ({
    providedIn:'root',
})

export class DataService {
    private apiUrl ='https://localhost:7047/api/customers/'

    constructor(private http: HttpClient) {}

    registerCustomer(register: Customer):Observable<any> {
        const url ='${https://localhost:7047/api/customers/register}';
        return this.http.post(url, register);
    }
}