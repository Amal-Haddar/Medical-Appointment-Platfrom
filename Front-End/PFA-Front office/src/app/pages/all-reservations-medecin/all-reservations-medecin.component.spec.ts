import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReservationsMedecinComponent } from './all-reservations-medecin.component';

describe('AllReservationsMedecinComponent', () => {
  let component: AllReservationsMedecinComponent;
  let fixture: ComponentFixture<AllReservationsMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllReservationsMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReservationsMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
