import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCriteriaComponent } from './sort-criteria.component';

describe('SortCriteriaComponent', () => {
  let component: SortCriteriaComponent;
  let fixture: ComponentFixture<SortCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
