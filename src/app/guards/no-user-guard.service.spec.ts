import { TestBed } from '@angular/core/testing';

import { NoUserGuardService } from './no-user-guard.service';

describe('NoUserGuardService', () => {
  let service: NoUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
