import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChercheursComponent } from './chercheurs.component';

describe('ChercheursComponent', () => {
  let component: ChercheursComponent;
  let fixture: ComponentFixture<ChercheursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChercheursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChercheursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
