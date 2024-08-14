import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../services/accounts/account.service";
import {SavingAccountCreationFormModel} from "../../models/saving-account-creation-form.model";
import {CurrentAccountCreationFormModel} from "../../models/current-account-creation-form.model";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit{
  addAccountFormGroup!: FormGroup;
  customerId!: number;
  savingAccount: string = 'EPARGNE';
  currentAccount: string = 'COURANT';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params["id"];
    this.addAccountFormGroup = this.fb.group( {
      amount : this.fb.control(null, [Validators.required]),
      overDraft : this.fb.control(null, [Validators.required]),
      interestRate : this.fb.control(null, [Validators.required]),
      type : this.fb.control( null, [Validators.required])
    });
  }

  addAccount() {
    let type = this.addAccountFormGroup.value.type;
    if(type==this.savingAccount){
      let model: SavingAccountCreationFormModel = new SavingAccountCreationFormModel();
      model.customerId = this.customerId;
      model.initialBalance = this.addAccountFormGroup.value.amount;
      model.interestRate = this.addAccountFormGroup.value.interestRate;
      this.accountService.createSavingAccount(model).subscribe(
        a => {
          this.router.navigate(['details-customer', a.customerDTO.id]).then();
        }
      );
    }else {
      let model: CurrentAccountCreationFormModel = new CurrentAccountCreationFormModel();
      model.customerId = this.customerId;
      model.initialBalance = this.addAccountFormGroup.value.amount;
      model.overDraft = this.addAccountFormGroup.value.overDraft;
      this.accountService.createCurrentAccount(model).subscribe(
        a => {
          this.router.navigate(['details-customer', a.customerDTO.id]).then();
        }
      );
    }
  }
}
