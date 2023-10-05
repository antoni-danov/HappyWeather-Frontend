import { CurrencyPipe, DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { DailyWeatherForecast } from 'src/app/interfaces/DailyForecast/dailyWeatherForecast';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.css']
})
export class FiveDaysForecastComponent implements AfterViewInit {

  fivedaysForecast!: DailyWeatherForecast;
  date: any;

  constructor(private service: WeatherService, private cdref: ChangeDetectorRef,
    private datePipe: DatePipe) {

  }
  ngAfterViewInit() {
    this.getFiveDaysWeatherForecas();
  }
  getFiveDaysWeatherForecas() {
    this.service.fiveDaysData$.subscribe(data => {
      this.fivedaysForecast = data;
      this.date = this.fivedaysForecast.timeLines.daily.map(day => {
        const curentDay = this.datePipe.transform(day.time.split('T')[0], 'EEEE, dd MMMM');
        return {
          day: curentDay
        }
      });
      console.log(this.date);

      // this.date = this.datePipe.transform(this.fivedaysForecast.timeLines.daily.time.split('T')[0], 'EEEE, dd MMMM');
      console.log(this.fivedaysForecast);

    });
    this.cdref.detectChanges();
  }

}
