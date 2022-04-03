import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasViceComponent } from './carreras-vice.component';

describe('CarrerasViceComponent', () => {
  let component: CarrerasViceComponent;
  let fixture: ComponentFixture<CarrerasViceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrerasViceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrerasViceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
