import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCustomerComponent} from "./components/list-customer/list-customer.component";
import {DetailsCustomerComponent} from "./components/details-customer/details-customer.component";
import {UpdateCustomerComponent} from "./components/update-customer/update-customer.component";
import {AddCustomerComponent} from "./components/add-customer/add-customer.component";
import {ListAccountsCustomerComponent} from "./components/list-accounts-customer/list-accounts-customer.component";
import {AddAccountComponent} from "./components/add-account/add-account.component";
import {AccountsComponent} from "./components/accounts/accounts.component";
import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

const routes: Routes = [
  {path: '', redirectTo: 'accounts', pathMatch: 'full' },
  {path: 'list-customers', component: ListCustomerComponent, canActivate: [authGuard]},
  {path: 'details-customer/:id', component: DetailsCustomerComponent, canActivate: [authGuard]},
  {path: 'update-customer/:id', component: UpdateCustomerComponent, canActivate: [authGuard]},
  {path: 'add-customer', component: AddCustomerComponent, canActivate: [authGuard]},
  {path: 'add-accounts-customer/:id', component: ListAccountsCustomerComponent, canActivate: [authGuard]},
  {path: 'add-account/:id', component: AddAccountComponent, canActivate: [authGuard]},
  {path: 'accounts', component: AccountsComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
