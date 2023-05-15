import { TestBed } from '@angular/core/testing';

import { RickyMortyDataService } from './ricky-morty-data.service';

describe('RickyMortyDataService', () => {
  let service: RickyMortyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickyMortyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
