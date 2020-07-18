import { TestBed } from '@angular/core/testing';

import { MedecinGuardGuard } from './medecin-guard.guard';

describe('MedecinGuardGuard', () => {
  let guard: MedecinGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MedecinGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
