import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosImprimirComponent } from './articulos-imprimir.component';

describe('ArticulosImprimirComponent', () => {
  let component: ArticulosImprimirComponent;
  let fixture: ComponentFixture<ArticulosImprimirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosImprimirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosImprimirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
