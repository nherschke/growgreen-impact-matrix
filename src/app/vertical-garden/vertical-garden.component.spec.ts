import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalGardenComponent } from './vertical-garden.component';

describe('VerticalGardenComponent', () => {
  let component: VerticalGardenComponent;
  let fixture: ComponentFixture<VerticalGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalGardenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
