import { TestBed } from '@angular/core/testing';

import { CambioInfoService } from './cambio-info.service';

describe('CambioInfoService', () => {
  let service: CambioInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
