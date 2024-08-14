import {Component, OnInit} from '@angular/core';
import {CustomerModel} from "../../models/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../services/customers/customer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit{

  customer : CustomerModel = new CustomerModel();
  customerId!: number;
  updateCustomerFormGroup!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params['id'];
    this.initFormGroup();
    this.customerService.getCustomerById(this.customerId).subscribe(
      c => {
        this.customer = c;
      }
    );
  }

  initFormGroup(): void{
    this.updateCustomerFormGroup = this.fb.group( {
      name : this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]),
      firstname : this.fb.control( null, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]),
      nationality : this.fb.control(null, [Validators.required, Validators.minLength(3), Validators.maxLength(256)]),
      cin : this.fb.control(null, [Validators.required, Validators.maxLength(256), Validators.minLength(6)]),
      sex : this.fb.control(null, [Validators.required]),
      dateOfBirth : this.fb.control(null, [Validators.required]),
      placeOfBirth : this.fb.control(null, [Validators.required, Validators.maxLength(256), Validators.minLength(2)])
    });
  }

  updateCustomer(){
    let model : CustomerModel = new CustomerModel();
    model.id = this.customerId;
    model.sex = this.updateCustomerFormGroup.value.sex;
    model.firstname = this.updateCustomerFormGroup.value.firstname;
    model.name = this.updateCustomerFormGroup.value.name;
    model.cin = this.updateCustomerFormGroup.value.cin;
    model.placeOfBirth = this.updateCustomerFormGroup.value.placeOfBirth;
    model.dateOfBirth = this.updateCustomerFormGroup.value.dateOfBirth;
    model.nationality = this.updateCustomerFormGroup.value.nationality;
    this.customerService.updateCustomer(this.customerId, model).subscribe(
      c => {
        this.router.navigate(['details-customer', c.id]).then();
      }
    );
  }

}
