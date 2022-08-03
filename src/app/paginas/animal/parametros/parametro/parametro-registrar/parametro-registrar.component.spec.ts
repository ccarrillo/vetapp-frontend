import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroRegistrarComponent } from './parametro-registrar.component';

describe('ParametroRegistrarComponent', () => {
  let component: ParametroRegistrarComponent;
  let fixture: ComponentFixture<ParametroRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametroRegistrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametroRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
