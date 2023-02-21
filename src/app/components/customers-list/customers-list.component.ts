import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomersService } from 'src/app/services/customers.service';
import { CustomersActions, CustomersApiActions } from 'src/app/state/actions/customers.actions';
import { selectCustomers, selectCustomerCollection, selectOrderedCustomers, selectFilteredCustomers } from 'src/app/state/selectors/customers.selectors';
import { faker } from '@faker-js/faker';
import { Customer } from 'src/app/models/customers.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})

export class CustomersListComponent {

  customers$ = this.store.select(selectCustomers)
  @Input() sort!: string
  @Input() search!: string
  @Output() editCustomer = new EventEmitter<Customer>();

  constructor(private customerService: CustomersService, private store: Store) {
    const localStorageCustomers = localStorage.getItem('customers')
    if (localStorageCustomers === null) {
      localStorage.setItem('customers', JSON.stringify(this.generateDummyCustomers()))
    }

  }

  createRandomCustomer(): Customer {
    return {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      status: faker.helpers.arrayElement(['active', 'pending', 'inactive']),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    };
  }

  generateDummyCustomers(): Customer[] {
    let customers: Customer[] = []
    for (let i = 0; i < 20; i++) {
      customers = [...customers, ...[this.createRandomCustomer()]]
    }
    return customers
  }

  onEdit(customer: Customer) {
    // customer.firstName = 'hola'
    this.editCustomer.emit(customer)
  }

  ngOnChanges(changes: SimpleChanges) {
    const sortChanges = changes['sort']
    const searchChanges = changes['search']

    if (sortChanges && !sortChanges.firstChange) {
      this.customers$ = this.store.select(selectOrderedCustomers)
    }

    if (searchChanges) {
      const searchValue = searchChanges.currentValue
      if (searchValue !== undefined) {
        this.store.dispatch(CustomersActions.searchCustomer({ search: searchValue }))
        this.customers$ = this.store.select(selectFilteredCustomers)
      }
    }

  }

  ngOnInit() {
    this.store.dispatch({ type: '[Customers] Load Customers' });
  }
}
