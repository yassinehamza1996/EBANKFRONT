import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountsCustomerComponent } from './list-accounts-customer.component';

describe('ListAccountsCustomerComponent', () => {
  let component: ListAccountsCustomerComponent;
  let fixture: ComponentFixture<ListAccountsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccountsCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAccountsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
