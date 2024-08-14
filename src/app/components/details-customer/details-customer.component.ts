import {Component, OnInit} from '@angular/core';
import {CustomerModel} from "../../models/customer.model";
import {catchError, Observable, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../services/customers/customer.service";

@Component({
  selector: 'app-details-customer',
  templateUrl: './details-customer.component.html',
  styleUrls: ['./details-customer.component.css']
})
export class DetailsCustomerComponent implements OnInit{

  customer!: Observable<CustomerModel>;
  customerId!: number;
  errorMessage!: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params['id'];
    this.customer = this.customerService.getCustomerById(this.customerId).pipe(
      catchError( err => { this.errorMessage = err.message;
        return throwError(err);})
    );
  }

  deleteCustomer(customer: CustomerModel) : void{
    let conf : boolean = confirm("Etes-vous sûr ?");
    if (conf){
      this.customerService.deleteCustomerById(customer.id).subscribe(
        () : void => {
          alert("Client supprimé");
          this.router.navigateByUrl("list-customers").then();
        }
      );
    }
  }

  gotoUpdateCustomerComponent(customer: CustomerModel) : void{
    this.router.navigate(["update-customer", customer.id]).then();
  }

  gotoListCustomerComponent() : void {
    this.router.navigateByUrl("list-customers").then();
  }

  gotoAddAccountComponent(customer: CustomerModel) : void {
    this.router.navigate(["add-account", customer.id]).then();
  }

  gotoListAccountsCustomerComponent(customer: CustomerModel) : void {
    this.router.navigate(["add-accounts-customer", customer.id]).then();
  }
}
