import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerModel} from "../../models/customer.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  host: string = 'http://localhost:8888/e-bank/api/v1/customers';
  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(this.host + '/list');
  }

  getCustomerById(id: number): Observable<CustomerModel>{
    return this.http.get<CustomerModel>(this.host + '/get/' + id);
  }

  searchCustomer(keyword: string): Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(this.host + '/search?keyword=' + keyword);
  }

  saveCustomer(customer: CustomerModel): Observable<CustomerModel>{
    return this.http.post<CustomerModel>(this.host + '/save', customer);
  }

  updateCustomer(id: number, customer: CustomerModel): Observable<CustomerModel>{
    return this.http.put<CustomerModel>(this.host + '/update/' + id , customer);
  }

  deleteCustomerById(id: number){
    return this.http.delete(this.host + '/delete/' + id);
  }


}
