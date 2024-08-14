import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DebitModel} from "../../models/debit-model";
import {Observable} from "rxjs";
import {CreditModel} from "../../models/credit-model";
import {TransferModel} from "../../models/transfer-model";
import {AccountDetailsModel} from "../../models/account-details.model";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  host: string = 'http://localhost:8888/e-bank/api/v1/operations';
  constructor(private http: HttpClient) { }

  public debit(model: DebitModel): Observable<DebitModel>{
    return this.http.post<DebitModel>(this.host + '/debit', model);
  }

  public credit(model: CreditModel): Observable<CreditModel>{
    return this.http.post<CreditModel>(this.host + '/credit', model);
  }

  public transfer(model: TransferModel): Observable<TransferModel>{
    return this.http.post<TransferModel>(this.host + '/transfer', model);
  }

  public getAccountOperation(accountId: string, page: number, size: number): Observable<AccountDetailsModel>{
    return this.http.get<AccountDetailsModel>(this.host + '/' + accountId + '/pageOperations?page='+page+'&size=' + size);
  }
}
