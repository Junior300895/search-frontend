import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionInfosChercheurComponent } from './gestion-infos-chercheur.component';

describe('GestionInfosChercheurComponent', () => {
  let component: GestionInfosChercheurComponent;
  let fixture: ComponentFixture<GestionInfosChercheurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionInfosChercheurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionInfosChercheurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
