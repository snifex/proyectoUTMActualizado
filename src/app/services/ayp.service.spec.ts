import { TestBed } from '@angular/core/testing';

import { AypService } from './ayp.service';

describe('AypService', () => {
  let service: AypService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AypService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
