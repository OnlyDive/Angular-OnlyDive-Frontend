import { TestBed } from '@angular/core/testing';

import { TextAreaAutoResizeService } from './text-area-auto-resize.service';

describe('TextAreaAutoResizeService', () => {
  let service: TextAreaAutoResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextAreaAutoResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
