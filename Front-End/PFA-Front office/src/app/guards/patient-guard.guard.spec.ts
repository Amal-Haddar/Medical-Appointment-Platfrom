import { TestBed } from '@angular/core/testing';

import { PatientGuardGuard } from './patient-guard.guard';

describe('PatientGuardGuard', () => {
  let guard: PatientGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatientGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
