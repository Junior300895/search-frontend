import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChercheurComponent } from './form-chercheur.component';

describe('FormChercheurComponent', () => {
  let component: FormChercheurComponent;
  let fixture: ComponentFixture<FormChercheurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChercheurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
