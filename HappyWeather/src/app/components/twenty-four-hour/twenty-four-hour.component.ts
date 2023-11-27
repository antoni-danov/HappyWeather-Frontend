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
  details!: HourlyUnit[];

  converted: boolean = false;
  unit!: string;
  iconPath!: string | undefined;
  realTimeDescription: string[] = [];
  iconPaths: string[] = [];
  timeOfTheDay: string[] = [];
  locationHour!: string | number;
  locationTime!: string;

  weatherIconPath: string = '../../../assets/icons/tomorrow-weather-codes-master/V2_icons/large/png/';

  constructor(private service: WeatherService) {
  }

  ngOnInit() {
    this.detailedWeatherForecast();
    this.temperatureUnit();
  }

  detailedWeatherForecast() {
    //Get location current time
    this.getLocationTime();

    //Get 24 hours data for the location
    this.service.hourlyWeatherForecast().subscribe(data => {

      //Extract only 24 hours records starting from the location current time
      var extractedData = Object.values(data.timeLines.hourly)
        .findIndex(file => file.time.split('T')[1].split(':')[0] == this.locationHour.toString());
      this.details = Object.values(data.timeLines.hourly).splice(extractedData, 25);

      //Set weather icon for every record
      this.setWeatherIcon();
    });
  }

  //Set weatherIcon
  setWeatherIcon() {

    for (let index = 0; index <= this.details.length; index++) {

      var currentCode = this.details[index].values.weatherCode.toString();

      var dayState = WeatherUtilities.twentyFourHourDayTime(this.details[index].time.split('T')[1]);

      // Check if code exists in weatherCode.ts
      const weatherindex = Object.keys(fourCode.WeatherCode).indexOf(currentCode);

      // If exists get value
      var weatherDescription = Object.values(fourCode.WeatherCode)[weatherindex];
      weatherDescription = dayState === 'night' && weatherDescription === 'Clear_Sunny' ? weatherDescription.toString().slice(0, 5) : weatherDescription.toString();
      this.realTimeDescription.push(weatherDescription.replaceAll('_', ' '));

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
  //Get location time
  private getLocationTime() {

    this.service.locationTimeData$
      .subscribe((timezoneData: any) => {

        //Get time zone
        const timeZoneId = timezoneData.timeZoneId;
        const currentUTC = new Date();
        const localTime = new Date(currentUTC.toLocaleString('en-US', { timeZone: timeZoneId }));
        //Get hour
        this.locationHour = localTime.getHours() < 10 ? '0' + `${localTime.getHours()}` : localTime.getHours();
        //Add values to variables
        this.locationTime = `${this.locationHour}:00`;
      });
  }

}
