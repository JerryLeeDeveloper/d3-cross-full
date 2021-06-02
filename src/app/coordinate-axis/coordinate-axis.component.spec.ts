import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateAxisComponent } from './coordinate-axis.component';

describe('CoordinateAxisComponent', () => {
  let component: CoordinateAxisComponent;
  let fixture: ComponentFixture<CoordinateAxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinateAxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinateAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
