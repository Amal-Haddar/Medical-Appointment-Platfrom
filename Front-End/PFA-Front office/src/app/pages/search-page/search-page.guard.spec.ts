import { TestBed } from '@angular/core/testing';

import { SearchPageGuard } from './search-page.guard';

describe('SearchPageGuard', () => {
  let guard: SearchPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SearchPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
