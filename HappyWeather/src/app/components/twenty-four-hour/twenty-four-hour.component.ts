import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { HourlyUnit } from 'src/app/interfaces/HourlyForecast/hourlyUnit';
import { WeatherForecast } from 'src/app/interfaces/WeatherForecast/weatherForecast';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';
import * as fourCode from '../../enums/weatherCode';
import * as fiveCode from '../../enums/weatherCodeFullDay';
import * as iconList from '../../../assets/iconsList.json';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';


@Component({
  selector: 'app-twenty-four-hour',
  standalone: true,
  templateUrl: './twenty-four-hour.component.html',
  styleUrl: './twenty-four-hour.component.css',
  imports: [
    CommonModule,
    TemperatureConversionPipe,
    NumberPipe,
    DateFormatPipe,
  ]
})
export class TwentyFourHourComponent implements OnInit {
  details!: WeatherForecast<HourlyUnit>;

  converted: boolean = false;
  unit!: string;
  timeOfTheDay!: string;
  iconPaths: string[] = [];

  weatherIconPath: string = '../../../assets/icons/tomorrow-weather-codes-master/V2_icons/large/png/';

  constructor(private service: WeatherService) {
  }

  ngOnInit() {
    this.detailedWeatherForecast();

    this.temperatureUnit();
  }

  detailedWeatherForecast() {
    this.service.hourlyWeatherForecast().subscribe(data => {
      this.details = data;
      this.setWeatherIcon();
    });
  }

  //Set weatherIcon
  setWeatherIcon() {
    const codes = this.details.timeLines.hourly;
    // this.timeOfTheDay = WeatherUtilities.timeOfTheDay();

    for (let index = 0; index < codes.length; index++) {

      var currentCode = codes[index].values.weatherCode.toString();

      if (codes[index].values.weatherCode.toString().length === 4) {

        // Check if code exists in weatherCode.ts
        const weatherindex = Object.keys(fourCode.WeatherCode).indexOf(currentCode);

        // If exists get value
        const weatherDescription = Object.values(fourCode.WeatherCode)[weatherindex];

        // Check if value exists in weatherCodeFullFay.ts
        const fulldayIndex = Object.values(fiveCode.weatherCodeFullDay)
          .indexOf(weatherDescription.toString());

        // If exists get weather code with 5 digits
        const fiveDigitCode = Object.keys(fiveCode.weatherCodeFullDay)[fulldayIndex];

        // Find coresponding code in iconsList.js and get his value
        const iconPath = Object.values(iconList).find((file) =>
          file.startsWith(fiveDigitCode));

        // Add to icons array
        // this.iconPaths.push(this.timeOfTheDay === 'day' ? this.weatherIconPath + iconPath : '');
        this.iconPaths.push(this.weatherIconPath + iconPath);

      } else if (codes[index].values.weatherCode.toString().length === 5) {

      }
    }
  }
  //Set weather temperature in celsius or farenheit
  private temperatureUnit() {
    this.service.unitChoice$.subscribe(data => {
      if (data) {
        this.converted = !this.converted;
        this.unit = data;
      }
    });

  }

}
