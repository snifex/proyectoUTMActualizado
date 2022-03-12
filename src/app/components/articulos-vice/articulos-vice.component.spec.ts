import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosViceComponent } from './articulos-vice.component';

describe('ArticulosViceComponent', () => {
  let component: ArticulosViceComponent;
  let fixture: ComponentFixture<ArticulosViceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosViceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosViceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
