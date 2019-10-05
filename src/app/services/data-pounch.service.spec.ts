import { TestBed } from '@angular/core/testing';

import { DataPounchService } from './data-pounch.service';

describe('DataPounchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataPounchService = TestBed.get(DataPounchService);
    expect(service).toBeTruthy();
  });
});
