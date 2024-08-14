import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DetailsCustomerComponent } from './components/details-customer/details-customer.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { ListAccountsCustomerComponent } from './components/list-accounts-customer/list-accounts-customer.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddCustomerComponent,
    ListCustomerComponent,
    UpdateCustomerComponent,
    DetailsCustomerComponent,
    AccountsComponent,
    AddAccountComponent,
    ListAccountsCustomerComponent,
    ForbiddenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
