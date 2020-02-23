import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProductionComponent } from './gestion-production.component';

describe('GestionProductionComponent', () => {
  let component: GestionProductionComponent;
  let fixture: ComponentFixture<GestionProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
