import { TestBed } from '@angular/core/testing';

import { TrainservicesService } from './trainservices.service';

describe('TrainservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainservicesService = TestBed.get(TrainservicesService);
    expect(service).toBeTruthy();
  });
});
