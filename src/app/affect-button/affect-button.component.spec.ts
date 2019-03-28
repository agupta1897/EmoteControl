import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectButtonComponent } from './affect-button.component';

describe('AffectButtonComponent', () => {
  let component: AffectButtonComponent;
  let fixture: ComponentFixture<AffectButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
