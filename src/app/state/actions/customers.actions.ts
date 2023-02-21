import { createAction, createActionGroup, props, emptyProps } from "@ngrx/store";
import { Customer } from "src/app/models/customers.model";

export const CustomersActions = createActionGroup({
    source: 'Customers',
    events: {
        'Load Customers': emptyProps(),
        'Add Customer': props<{ customer: Customer }>(),
        'Edit Customer': props<{ customer: Customer }>(),
        // 'Remove Customer': props<{ customerId: string }>(),
        'Search Customer': props<{ search: string }>()
    }
})

export const CustomersApiActions = createActionGroup({
    source: 'Customers API',
    events: {
        'Retrieved customers List': props<{ customers: ReadonlyArray<Customer> }>(),
        'Sort Customers': props<{ column: string }>(),
    }
})