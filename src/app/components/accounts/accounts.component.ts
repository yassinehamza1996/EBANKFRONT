import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetailsModel} from "../../models/account-details.model";
import {AccountService} from "../../services/accounts/account.service";
import {OperationService} from "../../services/operations/operation.service";
import {DebitModel} from "../../models/debit-model";
import {CreditModel} from "../../models/credit-model";
import {TransferModel} from "../../models/transfer-model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{

  accountFormGroup!: FormGroup;
  currentPage: number =0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetailsModel>
  operationFromGroup!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private operationService: OperationService) { }


  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      accountId : this.fb.control('')
    });
    this.operationFromGroup=this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    });
  }

  handleSearchAccount(): void {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.operationService.getAccountOperation(accountId,this.currentPage, this.pageSize)
      .pipe(
        catchError(err => {
          this.errorMessage=err.message;
          return throwError(err);
        })
      );
  }

  handleAccountOperation(): void {
    let operationType = this.operationFromGroup.value.operationType;
    if(operationType=='DEBIT'){
      this.doDebit();
    }else if (operationType=='CREDIT'){
      this.doCredit();
    }else if(operationType=='TRANSFER'){
      this.doTransfer();
    }
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  doCredit(): void{
    let model: CreditModel = new CreditModel();
    model.accountId = this.accountFormGroup.value.accountId;
    model.amount = this.operationFromGroup.value.amount;
    model.description = this.operationFromGroup.value.description;
    this.operationService.credit(model).subscribe({
      next : (data: CreditModel) : void =>{
        alert("Success Credit: "+data.amount);
        this.operationFromGroup.reset();
        this.handleSearchAccount();
      },
      error : (err)=>{
        alert(err.error);
        console.log(err);
      }
    });
  }

  doDebit(): void{
    let model: DebitModel = new DebitModel();
    model.accountId = this.accountFormGroup.value.accountId;
    model.amount = this.operationFromGroup.value.amount;
    model.description = this.operationFromGroup.value.description;
    this.operationService.debit(model).subscribe({
      next : (data: DebitModel) : void =>{
        alert("Success Debit: "+data.amount);
        this.operationFromGroup.reset();
        this.handleSearchAccount();
      },
      error : (err)=>{
        alert(err.error);
        console.log(err);
      }
    });
  }

  doTransfer(): void{
    let model: TransferModel = new TransferModel();
    model.amount = this.operationFromGroup.value.amount;
    model.accountIdDestination = this.operationFromGroup.value.accountDestination;
    model.accountIdSource = this.accountFormGroup.value.accountId;
    this.operationService.transfer(model).subscribe({
      next : (data: TransferModel) : void =>{
        alert("Success Transfer: "+data.amount);
        this.operationFromGroup.reset();
        this.handleSearchAccount();
      },
      error : (err)=>{
        alert(err.error);
        console.log(err);
      }
    });
  }





}
