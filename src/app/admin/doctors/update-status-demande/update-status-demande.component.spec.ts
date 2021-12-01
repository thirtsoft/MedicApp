import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusDemandeComponent } from './update-status-demande.component';

describe('UpdateStatusDemandeComponent', () => {
  let component: UpdateStatusDemandeComponent;
  let fixture: ComponentFixture<UpdateStatusDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStatusDemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
