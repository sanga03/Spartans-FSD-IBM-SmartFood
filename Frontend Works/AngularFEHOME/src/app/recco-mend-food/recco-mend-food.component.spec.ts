import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReccoMendFoodComponent } from './recco-mend-food.component';

describe('ReccoMendFoodComponent', () => {
  let component: ReccoMendFoodComponent;
  let fixture: ComponentFixture<ReccoMendFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReccoMendFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReccoMendFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
