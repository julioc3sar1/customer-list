import { createReducer, on } from "@ngrx/store";
import { CustomersActions, CustomersApiActions } from "../actions/customers.actions";
// import { Customer } from "src/app/models/customers.model";

export const initialState: string = ''

export const searchReducer = createReducer(
    initialState,
    on(CustomersActions.searchCustomer, (_state, { search }) => search),
)