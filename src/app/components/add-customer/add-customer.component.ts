import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomerService} from "../../services/customers/customer.service";
import {CustomerModel} from "../../models/customer.model";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{
  addCustomerFormGroup!: FormGroup;

  constructor(private router: Router,
              private customerService: CustomerService,
              private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void{
    this.addCustomerFormGroup = this.fb.group( {
      name : this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]),
      cin : this.fb.control(null, [Validators.required, Validators.maxLength(256), Validators.minLength(6)]),
      sex : this.fb.control(null, [Validators.required]),
      firstname : this.fb.control( null, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]),
      nationality : this.fb.control(null, [Validators.required, Validators.minLength(3), Validators.maxLength(256)]),
      dateOfBirth : this.fb.control(null, [Validators.required]),
      placeOfBirth : this.fb.control(null, [Validators.required, Validators.maxLength(256), Validators.minLength(2)])
    });
  }

  addCustomer() {
    let model: CustomerModel = new CustomerModel();
    model.sex = this.addCustomerFormGroup.value.sex;
    model.firstname = this.addCustomerFormGroup.value.firstname;
    model.name = this.addCustomerFormGroup.value.name;
    model.cin = this.addCustomerFormGroup.value.cin;
    model.placeOfBirth = this.addCustomerFormGroup.value.placeOfBirth;
    model.dateOfBirth = this.addCustomerFormGroup.value.dateOfBirth;
    model.nationality = this.addCustomerFormGroup.value.nationality;
    this.customerService.saveCustomer(model).subscribe(
      c => {
        this.router.navigate(['details-customer', c.id]).then();
      }
    );
  }
}
