import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStructComponent } from './form-struct.component';

describe('FormStructComponent', () => {
  let component: FormStructComponent;
  let fixture: ComponentFixture<FormStructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStructComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
