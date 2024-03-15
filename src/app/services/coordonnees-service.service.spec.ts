import { TestBed } from '@angular/core/testing';

import { CoordonneesServiceService } from './coordonnees-service.service';

describe('CoordonneesServiceService', () => {
  let service: CoordonneesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordonneesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
