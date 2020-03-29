import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChercheurComponent } from './update-chercheur.component';

describe('UpdateChercheurComponent', () => {
  let component: UpdateChercheurComponent;
  let fixture: ComponentFixture<UpdateChercheurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChercheurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
