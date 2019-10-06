import { TestBed } from '@angular/core/testing';

import { TransientService } from './transient.service';

describe('TransientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransientService = TestBed.get(TransientService);
    expect(service).toBeTruthy();
  });
});
