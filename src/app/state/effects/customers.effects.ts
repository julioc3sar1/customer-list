import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CustomersService } from 'src/app/services/customers.service';
import { CustomersActions, CustomersApiActions } from '../actions/customers.actions';
import { Customer } from 'src/app/models/customers.model';

@Injectable()
export class MovieEffects {

    constructor(
        private actions$: Actions,
        private customersService: CustomersService
    ) { }

    loadCustomers$ = createEffect(() => this.actions$.pipe(
        ofType('[Customers] Load Customers'),
        mergeMap(() => this.customersService.getCustomers()
            .pipe(
                map(customers => CustomersApiActions.retrievedCustomersList({ customers })),
                catchError(() => EMPTY)
            ))
    )
    );

    addCustomer$ = createEffect(() => this.actions$.pipe(
        ofType('[Customers] Add Customer'),
        mergeMap((customer: Customer) => this.customersService.addCustomer(customer)
            .pipe(
                map(res => {
                    return CustomersActions.loadCustomers()
                }),
                catchError(() => EMPTY)
            ))
    ))

    editCustomer$ = createEffect(() => this.actions$.pipe(
        ofType('[Customers] Edit Customer'),
        mergeMap((customer: Customer) => this.customersService.editCustomer(customer)
            .pipe(
                map(res => {
                    return CustomersActions.loadCustomers()
                }),
                catchError(() => EMPTY)
            ))
    ))
} 