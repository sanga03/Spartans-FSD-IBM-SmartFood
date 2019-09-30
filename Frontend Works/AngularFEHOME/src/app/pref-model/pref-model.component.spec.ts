import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefModelComponent } from './pref-model.component';

describe('PrefModelComponent', () => {
  let component: PrefModelComponent;
  let fixture: ComponentFixture<PrefModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
