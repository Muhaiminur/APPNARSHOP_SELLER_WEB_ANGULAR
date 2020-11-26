import { TestBed } from '@angular/core/testing';

import { ApihandlerServiceService } from './apihandler-service.service';

describe('ApihandlerServiceService', () => {
  let service: ApihandlerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApihandlerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
