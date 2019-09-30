import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodRecomendComponent } from './food-recomend.component';

describe('FoodRecomendComponent', () => {
  let component: FoodRecomendComponent;
  let fixture: ComponentFixture<FoodRecomendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodRecomendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodRecomendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
