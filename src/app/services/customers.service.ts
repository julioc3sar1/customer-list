import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customers.model';

@Injectable({ providedIn: 'root' })
export class CustomersService {
    constructor(private http: HttpClient) { }

    getLsCustomers() {
        return JSON.parse(localStorage.getItem('customers')!)
    }

    setLsCustomers(customers: Customer[]) {
        localStorage.setItem('customers', JSON.stringify(customers))
    }

    getCustomers(): Observable<Array<Customer>> {
        const customers = new Observable<Array<Customer>>((subscriber) => {
            subscriber.next(this.getLsCustomers());
        });
        return customers
    }

    addCustomer(customer: Customer): Observable<Boolean> {
        const customers = [...this.getLsCustomers(), ...[customer]]
        this.setLsCustomers(customers)
        return new Observable<Boolean>((subscriber) => {
            subscriber.next(true)
        })
    }

    editCustomer(editedCustomer: Customer): Observable<Boolean> {
        const customers = this.getLsCustomers().map((customer: Customer) => editedCustomer.id === customer.id ? { ...customer, ...editedCustomer } : customer)
        this.setLsCustomers(customers)
        return new Observable<Boolean>((subscriber) => {
            subscriber.next(true)
        })
    }
}