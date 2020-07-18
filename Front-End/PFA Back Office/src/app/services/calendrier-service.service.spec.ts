import { TestBed } from '@angular/core/testing';

import { CalendrierServiceService } from './calendrier-service.service';

describe('CalendrierServiceService', () => {
  let service: CalendrierServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendrierServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
