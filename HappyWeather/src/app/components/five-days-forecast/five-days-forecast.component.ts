import { Component, OnInit } from '@angular/core';
import { DayUnit } from 'src/app/interfaces/DailyForecast/dayUnit';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { CommonModule } from '@angular/common';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';
import * as fourCode from '../../enums/weatherCode';
import * as fiveDayCode from '../../enums/weatherCodeFullDay';
import * as fiveNightCode from '../../enums/weatherCodeFullNight';
import * as iconList from '../../../assets/iconsList.json';
import { environement } from 'src/app/environements/environement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.css'],
  standalone: true,
  imports: [
    TemperatureConversionPipe,
    NumberPipe,
    DateFormatPipe,
    CommonModule
  ]
})
export class FiveDaysForecastComponent implements OnInit {

  fivedaysForecast!: DayUnit[];
  unit!: string;
  converted: boolean = false;
  dayTimeDescription: string[] = [];
  iconPath!: string | undefined;
  iconPaths: string[] = [];

  minTemperature!: number;
  maxTemperature!: number;
  weatherIndex!: number;
  weatherDescription!: string;
  weatherIcon!: string;

  locationTime!: string;

  constructor(
    private service: WeatherService,
    private router: Router) {

  }
  ngOnInit() {
    this.fiveDaysWeatherForecast();
    this.temperatureUnit();

  }
  fiveDaysWeatherForecast() {
    this.service.fiveDaysForecast();

    this.service.fiveDaysData$.subscribe(data => {
      this.getLocationTime();
      this.fivedaysForecast = Object.values(data.timeLines.daily).splice(0, data.timeLines.daily.length - 1);
      this.setWeatherIcon();
    });
  }
  //Set weatherIcon
  setWeatherIcon() {

    for (let index = 0; index <= this.fivedaysForecast.length; index++) {
      var iconInfo = WeatherUtilities.setIcon(this.fivedaysForecast[index]);

      this.dayTimeDescription.push(iconInfo.weatherDescription.replaceAll('_', ' '));
      this.iconPaths.push(environement.weatherIconPath + iconInfo.iconPath);
    }

  }
  navigateToDetails(index: number, day: any) {
    this.router.navigate(['/details', index]);
  }
  private temperatureUnit() {
    this.service.unitChoice$.subscribe(data => {
      if (data) {
        this.converted = !this.converted;
        this.unit = data;
      }
    });
  }
  //Get location real time
  private getLocationTime() {

    this.service.locationTimeData$
      .subscribe((timezoneData: any) => {
        //Get time zone
        const timeZoneId = timezoneData.timeZoneId;
        const currentUTC = new Date();
        const localTime = new Date(currentUTC.toLocaleString('en-US', { timeZone: timeZoneId }));
        //Get day, month and date
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(localTime);
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(localTime);
        const date = localTime.getDate();
        //Get hour and minutes
        const minutes = localTime.getMinutes() < 10 ? '0' + `${localTime.getMinutes()}` : localTime.getMinutes();
        const hours = localTime.getHours() < 10 ? '0' + `${localTime.getHours()}` : localTime.getHours();
        //Add values to variables
        this.locationTime = `${hours}:${minutes}`;
        // this.dateFormat = `${day}, ${date} ${month}`;
      });
  }
}
