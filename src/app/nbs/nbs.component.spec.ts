import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbsComponent } from './nbs.component';

describe('NbsComponent', () => {
  let component: NbsComponent;
  let fixture: ComponentFixture<NbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
