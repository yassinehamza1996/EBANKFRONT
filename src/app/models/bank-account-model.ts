import {CustomerModel} from "./customer.model";

export class BankAccountModel{
  type!: string;
  id!: string;
  balance!: number;
  createdAt!: string;
  status!: string;
  customerDTO!: CustomerModel;
  overDraft!: number;
  interestRate!: number;
}
