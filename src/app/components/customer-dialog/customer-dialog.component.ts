import { Component, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomersActions, CustomersApiActions } from 'src/app/state/actions/customers.actions';
import { faker } from '@faker-js/faker';
import { Customer } from 'src/app/models/customers.model';
declare var window: any

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})

export class CustomerDialogComponent {
  customerForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    status: new FormControl('', Validators.required),
    phone: new FormControl('')
  });

  customerModal: any
  @Input() customer!: Customer | undefined
  @Output() close = new EventEmitter<boolean>();

  loading: boolean = false
  visible: boolean = false
  constructor(
    private store: Store
  ) {

  }

  get aliases() {
    return this.customerForm.controls;
  }

  invalidField(control: AbstractControl) {
    if (control.errors) return 'is-invalid'
    return 'is-valid'
  }

  async saveCustomer() {
    const form = this.customerForm
    const formValue = form.value
    if (form.valid) {
      if (this.customer) {
        await this.store.dispatch(CustomersActions.editCustomer(formValue))
      } else {
        formValue.id = faker.datatype.uuid()
        await this.store.dispatch(CustomersActions.addCustomer(formValue));
        this.customerForm.reset()
      }
      this.loading = true
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const customerChanges = changes['customer']
    if (customerChanges) {
      const customerValue = customerChanges.currentValue
      if (customerValue != undefined) {
        this.customerForm.patchValue({
          id: customerValue.id,
          firstName: customerValue.firstName,
          lastName: customerValue.lastName,
          email: customerValue.email,
          status: customerValue.status,
          phone: customerValue.phone
        })
        this.customerModal.show()
      }
    }
  }

  resetDialog() {
    this.loading = false
    this.visible = false
    this.customerForm.reset()
  }

  ngOnInit() {
    const modalElement = document.getElementById('customerModal')
    this.customerModal = new window.bootstrap.Modal(modalElement)
    modalElement!.addEventListener('hidden.bs.modal', (event: any) => {
      // do something...
      this.resetDialog()
      this.close.emit(true)

    })
  }
}
