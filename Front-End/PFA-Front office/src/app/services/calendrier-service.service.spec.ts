import { TestBed } from "@angular/core/testing";

import { CalendrierService } from "./calendrier-service.service";

describe("CalendrierServiceService", () => {
  let service: CalendrierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendrierService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
