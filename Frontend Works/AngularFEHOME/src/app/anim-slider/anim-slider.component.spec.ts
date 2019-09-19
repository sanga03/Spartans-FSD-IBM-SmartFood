import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimSliderComponent } from './anim-slider.component';

describe('AnimSliderComponent', () => {
  let component: AnimSliderComponent;
  let fixture: ComponentFixture<AnimSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
