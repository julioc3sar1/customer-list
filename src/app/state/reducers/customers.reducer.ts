import { createReducer, on } from "@ngrx/store";
import { CustomersApiActions } from "../actions/customers.actions";
import { Customer } from "src/app/models/customers.model";

export const initialState: ReadonlyArray<Customer> = []

export const customersReducer = createReducer(
    initialState,
    on(CustomersApiActions.retrievedCustomersList, (_state, { customers }) => customers)
)