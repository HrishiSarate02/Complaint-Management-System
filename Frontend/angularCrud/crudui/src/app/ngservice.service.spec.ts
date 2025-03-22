import { TestBed } from '@angular/core/testing';

import { NgserviceService } from './ngservice.service';

describe('NgserviceService', () => {
  let service: NgserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
