import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDemandeComponent } from './pending-demande.component';

describe('PendingDemandeComponent', () => {
  let component: PendingDemandeComponent;
  let fixture: ComponentFixture<PendingDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
