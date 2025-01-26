import { TestBed } from '@angular/core/testing';

import { RoomsListService } from './rooms-list.service';

describe('RoomsListService', () => {
  let service: RoomsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
