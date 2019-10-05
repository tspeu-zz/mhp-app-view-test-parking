import { TestBed } from '@angular/core/testing';

import { DataCouchDBService } from './data-couch-db.service';

describe('DataCouchDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataCouchDBService = TestBed.get(DataCouchDBService);
    expect(service).toBeTruthy();
  });
});
