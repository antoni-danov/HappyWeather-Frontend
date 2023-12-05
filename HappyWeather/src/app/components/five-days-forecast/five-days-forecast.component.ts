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

  constructor(private service: WeatherService) {

  }
  ngOnInit() {
    this.fiveDaysWeatherForecast();
    this.temperatureUnit();

  }
  fiveDaysWeatherForecast() {
    this.service.fiveDaysForecast().subscribe(data => {
      this.fivedaysForecast = Object.values(data.timeLines.daily).splice(0, data.timeLines.daily.length - 1);
      console.log(this.fivedaysForecast);

      this.setWeatherIcon();
    });
  }
  //Set weatherIcon
  setWeatherIcon() {

    for (let index = 0; index <= this.fivedaysForecast.length; index++) {

      var currentCode = this.fivedaysForecast[index].values.weatherCode.toString();

      var dayState = WeatherUtilities.twentyFourHourDayTime(this.fivedaysForecast[index].time.split('T')[1]);

      // Check if code exists in weatherCode.ts
      const weatherindex = Object.keys(fourCode.WeatherCode).indexOf(currentCode);

      // If exists get value
      var weatherDescription = Object.values(fourCode.WeatherCode)[weatherindex];
      weatherDescription = dayState === 'night' && weatherDescription === 'Clear_Sunny' ? weatherDescription.toString().slice(0, 5) : weatherDescription.toString();
      this.dayTimeDescription.push(weatherDescription.replaceAll('_', ' '));

      // If is Day or Night
      if (dayState === 'day') {

        // Check if value exists in weatherCodeFullDay.ts
        const fulldayIndex = Object.values(fiveDayCode.weatherCodeFullDay)
          .indexOf(weatherDescription.toString());

        // If exists get weather code with 5 digits
        const fiveDigitDayCode = Object.keys(fiveDayCode.weatherCodeFullDay)[fulldayIndex];

        // Find coresponding code in iconsList.js and get his value
        this.iconPath = Object.values(iconList).find((file) =>
          file.startsWith(fiveDigitDayCode));

      } else if (dayState === 'night') {
        // Check if value exists in weatherCodeFullNight.ts
        const fullNightIndex = Object.values(fiveNightCode.weatherCodeFullNight)
          .indexOf(weatherDescription.toString());

        // If exists get weather code with 5 digits
        const fiveDigitNightCode = Object.keys(fiveNightCode.weatherCodeFullNight)[fullNightIndex];

        // Find coresponding code in iconsList.js and get his value
        this.iconPath = Object.values(iconList).find((file) =>
          file.startsWith(fiveDigitNightCode));

      }

      // Add to icons array
      this.iconPaths.push(environement.weatherIconPath + this.iconPath);
    }
  }
  private temperatureUnit() {
    this.service.unitChoice$.subscribe(data => {
      if (data) {
        this.converted = !this.converted;
        this.unit = data;
      }
    });
  }
}
