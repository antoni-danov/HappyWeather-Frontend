import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { HourlyUnit } from 'src/app/interfaces/HourlyForecast/hourlyUnit';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { environement } from 'src/app/environements/environement';

@Component({
  selector: 'app-modal-twenty-four-hours',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatPipe,
    TemperatureConversionPipe,
    NumberPipe
  ],
  templateUrl: './modal-twenty-four-hours.component.html',
  styleUrl: './modal-twenty-four-hours.component.css'
})
export class ModalTwentyFourHoursComponent implements OnInit {
  @Input() modalContent!: HourlyUnit;
  @Input() modalHourUnit!: string;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  unit!: string;
  location!: string;
  externalLink!: string;

  constructor(private service: WeatherService) {
  }
  ngOnInit(): void {
    this.temperatureUnit();
    this.location = this.service.location;
    this.externalLink = environement.locationSearch + this.location;

  }

  hideModal() {
    this.closeModal.emit();
  }
  private temperatureUnit() {
    this.unit = this.service.units;
    // this.hourUnit = this.service.hourUnit;
  }
}
