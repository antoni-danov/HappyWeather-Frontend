import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { DailyWeatherForecast } from 'src/app/interfaces/DailyForecast/dailyWeatherForecast';
import { DayUnit } from 'src/app/interfaces/DailyForecast/dayUnit';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.css']
})
export class FiveDaysForecastComponent implements AfterViewInit {

  fivedaysForecast!: DailyWeatherForecast;

  constructor(private service: WeatherService, private cdref: ChangeDetectorRef) {

  }
  ngAfterViewInit() {
    this.getFiveDaysWeatherForecas();
  }
  getFiveDaysWeatherForecas() {
    this.service.fiveDaysData$.subscribe(data => {
      this.fivedaysForecast = data;
      console.log(this.fivedaysForecast);

    });
    this.cdref.detectChanges();
  }

}
