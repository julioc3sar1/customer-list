import { Component } from '@angular/core';
import { CustomersActions, CustomersApiActions } from 'src/app/state/actions/customers.actions';
import { Store } from '@ngrx/store';
import { selectCustomers, selectFilteredCustomers } from 'src/app/state/selectors/customers.selectors';
import { Customer } from 'src/app/models/customers.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent {
  sort!: string
  search: string = ''
  customer!: Customer | undefined

  constructor(
    private store: Store
  ) {

  }

  sortCustomers(event: any) {
    if (event) this.sort = event.target.value
    let column: string = this.sort
    this.store.dispatch(CustomersApiActions.sortCustomers({ column }))
  }

  searchCustomer() {
    if (this.search.length > 0) {
      this.store.dispatch(CustomersActions.searchCustomer({ search: this.search }))
      this.store.select(selectFilteredCustomers)
    } else {
      this.store.select(selectCustomers)
    }
  }
}
