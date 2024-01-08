import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTwentyFourHoursComponent } from './modal-twenty-four-hours.component';

describe('ModalTwentyFourHoursComponent', () => {
  let component: ModalTwentyFourHoursComponent;
  let fixture: ComponentFixture<ModalTwentyFourHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTwentyFourHoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTwentyFourHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
