import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutosViceComponent } from './institutos-vice.component';

describe('InstitutosViceComponent', () => {
  let component: InstitutosViceComponent;
  let fixture: ComponentFixture<InstitutosViceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutosViceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutosViceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
