import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralesViceComponent } from './generales-vice.component';

describe('GeneralesViceComponent', () => {
  let component: GeneralesViceComponent;
  let fixture: ComponentFixture<GeneralesViceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralesViceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralesViceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
