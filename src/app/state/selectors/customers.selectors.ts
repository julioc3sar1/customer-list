import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Customer } from "src/app/models/customers.model";

export const selectCustomers = createFeatureSelector<Array<Customer>>('customers')

export const selectCollectionState = createFeatureSelector<ReadonlyArray<string>>('collection')

export const selectSortBy = createFeatureSelector<Readonly<string>>('sortBy')

export const selectSearch = createFeatureSelector<Readonly<string>>('search')

export const selectCustomerCollection = createSelector(
    selectCustomers,
    selectCollectionState,
    (customers, collecton) => {
        return collecton.map((id) => customers.find((customer) => customer.id === id)!)
    }
)

export const selectFilteredCustomers = createSelector(
    selectCustomers,
    selectSearch,
    (customers, search) => {
        return customers.filter(customer => customer.lastName.toLowerCase().includes(search.toLowerCase()))
    }
)

export const selectOrderedCustomers = createSelector(
    selectFilteredCustomers,
    selectSortBy,
    (customers, sortBy) => {
        return customers.slice().sort((a: any, b: any) => {
            const nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
            const nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }
)

