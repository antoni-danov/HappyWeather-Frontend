import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyFourHourComponent } from './twenty-four-hour.component';

describe('TwentyFourHourComponent', () => {
  let component: TwentyFourHourComponent;
  let fixture: ComponentFixture<TwentyFourHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwentyFourHourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwentyFourHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
