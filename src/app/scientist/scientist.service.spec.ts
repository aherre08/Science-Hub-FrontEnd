import { TestBed } from '@angular/core/testing';

import { ScientistService } from './scientist.service';

describe('ScientistService', () => {
  let service: ScientistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScientistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
