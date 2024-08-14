import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SavingAccountCreationFormModel} from "../../models/saving-account-creation-form.model";
import {CurrentAccountCreationFormModel} from "../../models/current-account-creation-form.model";
import {CustomerModel} from "../../models/customer.model";
import {SavingAccountModel} from "../../models/saving-account.model";
import {Observable} from "rxjs";
import {CurrentAccountModel} from "../../models/current-account.model";
import {BankAccountModel} from "../../models/bank-account-model";
import {UpdateBankAccountStatusModel} from "../../models/update-bank-account-status.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  host: string = 'http://localhost:8888/e-bank/api/v1/accounts';
  constructor(private http: HttpClient) { }

  public createSavingAccount(model: SavingAccountCreationFormModel): Observable<SavingAccountModel>{
    return this.http.post<SavingAccountModel>(this.host + '/save/saving', model);
  }

  public createCurrentAccount(model: CurrentAccountCreationFormModel) : Observable<CurrentAccountModel>{
    return this.http.post<CurrentAccountModel>(this.host + '/save/current', model);
  }

  public getAllBankAccountByCustomerId(customerId: number) : Observable<Array<BankAccountModel>>{
    return this.http.get<Array<BankAccountModel>>(this.host + '/find/' + customerId);
  }

  public getBankAccountById(id: string): Observable<BankAccountModel>{
    return this.http.get<BankAccountModel>(this.host + '/get/' + id);
  }

  public updateBankAccountStatus(id: string, model: UpdateBankAccountStatusModel): Observable<BankAccountModel>{
    return this.http.patch<BankAccountModel>(this.host + '/update/' + id, model);
  }

}
