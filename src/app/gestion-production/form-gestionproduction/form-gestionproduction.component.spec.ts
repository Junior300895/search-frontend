import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestionproductionComponent } from './form-gestionproduction.component';

describe('FormGestionproductionComponent', () => {
  let component: FormGestionproductionComponent;
  let fixture: ComponentFixture<FormGestionproductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestionproductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestionproductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
