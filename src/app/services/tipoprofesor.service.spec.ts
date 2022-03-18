import { TestBed } from '@angular/core/testing';

import { TipoProfesorService } from './tipoprofesor.service';

describe('TipoProfesorService', () => {
  let service: TipoProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
