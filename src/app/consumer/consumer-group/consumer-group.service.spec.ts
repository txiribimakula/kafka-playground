import { TestBed } from '@angular/core/testing';

import { ConsumerGroupService } from './consumer-group.service';

describe('ConsumerGroupService', () => {
  let service: ConsumerGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
