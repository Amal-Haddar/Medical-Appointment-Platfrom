import { TestBed } from '@angular/core/testing';

import { MedecinAndPatientGuardGuard } from './medecin-and-patient-guard.guard';

describe('MedecinAndPatientGuardGuard', () => {
  let guard: MedecinAndPatientGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MedecinAndPatientGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
