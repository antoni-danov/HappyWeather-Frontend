import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { HourlyUnit } from 'src/app/interfaces/HourlyForecast/hourlyUnit';
import { WeatherForecast } from 'src/app/interfaces/WeatherForecast/weatherForecast';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';
import * as fourCode from '../../enums/weatherCode';
import * as fiveDayCode from '../../enums/weatherCodeFullDay';
import * as fiveNightCode from '../../enums/weatherCodeFullNight';
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
  iconPath!: string | undefined;
  realTimeDescription: string[] = [];
  iconPaths: string[] = [];
  timeOfTheDay: string[] = [];

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
    console.log('Codes: ', codes);

    for (let index = 0; index <= codes.length; index++) {

      var currentCode = codes[index].values.weatherCode.toString();
      var dayState = WeatherUtilities.twentyFourHourDayTime(Object.values(this.details.timeLines.hourly)[index].time.split('T')[1]);
      console.log('Day state: ', dayState);

      // Check if code exists in weatherCode.ts
      const weatherindex = Object.keys(fourCode.WeatherCode).indexOf(currentCode);
      console.log('Weather index: ', weatherindex);

      // If exists get value
      const weatherDescription = Object.values(fourCode.WeatherCode)[weatherindex];
      console.log('Weather description: ', weatherDescription);

      this.realTimeDescription.push(weatherDescription.toString().replaceAll('_', ' '));

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
        console.log(fulldayIndex);
        console.log(fiveDigitDayCode);
        console.log(this.iconPath);

      } else if (dayState === 'night') {
        // Check if value exists in weatherCodeFullNight.ts
        const fullNightIndex = Object.values(fiveNightCode.weatherCodeFullNight)
          .indexOf(weatherDescription.toString());

        // If exists get weather code with 5 digits
        const fiveDigitNightCode = Object.keys(fiveNightCode.weatherCodeFullNight)[fullNightIndex];

        // Find coresponding code in iconsList.js and get his value
        this.iconPath = Object.values(iconList).find((file) =>
          file.startsWith(fiveDigitNightCode));
        console.log(fullNightIndex);
        console.log(fiveNightCode);
        console.log(this.iconPath);
      }

      // Add to icons array
      this.iconPaths.push(this.weatherIconPath + this.iconPath);
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
