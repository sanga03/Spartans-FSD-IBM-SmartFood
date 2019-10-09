import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInRestaurantComponent } from './logged-in-restaurant.component';

describe('LoggedInRestaurantComponent', () => {
  let component: LoggedInRestaurantComponent;
  let fixture: ComponentFixture<LoggedInRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedInRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
