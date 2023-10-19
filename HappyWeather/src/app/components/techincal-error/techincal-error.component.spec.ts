import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechincalErrorComponent } from './techincal-error.component';

describe('TechincalErrorComponent', () => {
  let component: TechincalErrorComponent;
  let fixture: ComponentFixture<TechincalErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechincalErrorComponent]
    });
    fixture = TestBed.createComponent(TechincalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
