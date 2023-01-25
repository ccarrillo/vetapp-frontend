import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocoloCrearComponent } from './protocolo-crear.component';

describe('ProtocoloCrearComponent', () => {
  let component: ProtocoloCrearComponent;
  let fixture: ComponentFixture<ProtocoloCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocoloCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocoloCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
