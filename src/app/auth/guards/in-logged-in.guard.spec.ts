import { TestBed } from '@angular/core/testing';

import { InLoggedInGuard } from './in-logged-in.guard';

describe('InLoggedInGuard', () => {
  let guard: InLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
