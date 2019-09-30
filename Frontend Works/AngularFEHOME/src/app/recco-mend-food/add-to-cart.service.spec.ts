import { TestBed } from '@angular/core/testing';

import { AddToCartService } from './add-to-cart.service';

describe('AddToCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddToCartService = TestBed.get(AddToCartService);
    expect(service).toBeTruthy();
  });
});
