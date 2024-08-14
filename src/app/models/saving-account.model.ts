import {CustomerModel} from "./customer.model";

export class SavingAccountModel{
  type!: string;
  id!: string;
  balance!: number;
  createdAt!: string;
  status!: string;
  customerDTO!: CustomerModel;
  interestRate!: number;
}
