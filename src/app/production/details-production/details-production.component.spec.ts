import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProductionComponent } from './details-production.component';

describe('DetailsProductionComponent', () => {
  let component: DetailsProductionComponent;
  let fixture: ComponentFixture<DetailsProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
