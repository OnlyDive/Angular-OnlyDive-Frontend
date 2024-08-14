import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpotComponent } from './view-spot.component';

describe('ViewSpotComponent', () => {
  let component: ViewSpotComponent;
  let fixture: ComponentFixture<ViewSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSpotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
