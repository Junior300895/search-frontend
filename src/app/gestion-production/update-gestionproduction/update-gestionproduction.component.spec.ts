import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGestionproductionComponent } from './update-gestionproduction.component';

describe('UpdateGestionproductionComponent', () => {
  let component: UpdateGestionproductionComponent;
  let fixture: ComponentFixture<UpdateGestionproductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGestionproductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGestionproductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
