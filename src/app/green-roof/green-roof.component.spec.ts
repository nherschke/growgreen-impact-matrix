import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenRoofComponent } from './green-roof.component';

describe('GreenRoofComponent', () => {
  let component: GreenRoofComponent;
  let fixture: ComponentFixture<GreenRoofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenRoofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenRoofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
