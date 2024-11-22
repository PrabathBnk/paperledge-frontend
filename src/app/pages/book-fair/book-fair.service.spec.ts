import { TestBed } from '@angular/core/testing';

import { BookFairService } from './book-fair.service';

describe('BookFairService', () => {
  let service: BookFairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookFairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
