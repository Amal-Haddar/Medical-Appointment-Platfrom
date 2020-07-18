import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinUpdateComponent } from './medecin-update.component';

describe('MedecinUpdateComponent', () => {
  let component: MedecinUpdateComponent;
  let fixture: ComponentFixture<MedecinUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
