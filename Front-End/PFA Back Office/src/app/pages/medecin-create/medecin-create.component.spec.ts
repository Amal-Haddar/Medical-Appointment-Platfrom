import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinCreateComponent } from './medecin-create.component';

describe('MedecinCreateComponent', () => {
  let component: MedecinCreateComponent;
  let fixture: ComponentFixture<MedecinCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
