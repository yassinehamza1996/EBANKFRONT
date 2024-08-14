import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {CustomerModel} from "../../models/customer.model";
import {CustomerService} from "../../services/customers/customer.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit{

  customers!: Observable<Array<CustomerModel>>;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  constructor(private customerService: CustomerService,
              private router: Router, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.customers = this.customerService.getAllCustomers();
  }

  searchCustomers(){
    let keyword = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomer(keyword).pipe(
      catchError( err => { this.errorMessage = err.message;
        return throwError(err);})
    );
  }

  gotoDetailsCustomerComponent(customer: CustomerModel){
    this.router.navigate(["details-customer", customer.id]).then();
  }



}
