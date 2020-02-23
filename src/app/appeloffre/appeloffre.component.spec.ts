import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppeloffreComponent } from './appeloffre.component';

describe('AppeloffreComponent', () => {
  let component: AppeloffreComponent;
  let fixture: ComponentFixture<AppeloffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppeloffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppeloffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
