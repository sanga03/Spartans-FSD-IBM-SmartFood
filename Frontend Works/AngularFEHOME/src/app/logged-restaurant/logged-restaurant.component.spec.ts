import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedRestaurantComponent } from './logged-restaurant.component';

describe('LoggedRestaurantComponent', () => {
  let component: LoggedRestaurantComponent;
  let fixture: ComponentFixture<LoggedRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
