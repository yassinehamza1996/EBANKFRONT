import {AccountOperationModel} from "./account-operation.model";

export class AccountDetailsModel{
  accountId!: string;
  balance!: number;
  currentPage!: number;
  totalPages!: number;
  pageSize!: number;
  accountOperationDTOS!: AccountOperationModel[];
}
