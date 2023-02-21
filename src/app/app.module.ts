import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomersComponent } from './components/customers/customers.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';

import { customersReducer } from './state/reducers/customers.reducer';
import { sortingReducer } from './state/reducers/sorting.reducer';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './state/effects/customers.effects';
import { CustomerDialogComponent } from './components/customer-dialog/customer-dialog.component';
import { searchReducer } from './state/reducers/search.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    NavigationComponent,
    CustomersListComponent,
    CustomerDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      customers: customersReducer,
      sortBy: sortingReducer,
      search: searchReducer
    }, {

    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([
      MovieEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
