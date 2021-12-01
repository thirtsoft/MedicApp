import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePriceDemandeComponent } from './update-price-demande.component';

describe('UpdatePriceDemandeComponent', () => {
  let component: UpdatePriceDemandeComponent;
  let fixture: ComponentFixture<UpdatePriceDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePriceDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePriceDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
