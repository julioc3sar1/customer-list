import { createReducer, on } from "@ngrx/store";
import { CustomersApiActions } from "../actions/customers.actions";
import { Customer } from "src/app/models/customers.model";

export const initialState: string = ''

export const sortingReducer = createReducer(
    initialState,
    on(CustomersApiActions.sortCustomers, (_state, { column }) => column),
)