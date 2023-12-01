import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { WeatherCode } from 'src/app/enums/weatherCode';
import { environement } from 'src/app/environements/environement';
import { WeatherLocation } from 'src/app/interfaces/weatherLocation';
import { WeatherResult } from 'src/app/interfaces/weatherResult';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { LocalTimeComponent } from '../localTime/local-time/local-time.component';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/material.module';
import * as fourCode from '../../enums/weatherCode';
import * as fiveDayCode from '../../enums/weatherCodeFullDay';
import * as fiveNightCode from '../../enums/weatherCodeFullNight';
import * as iconList from '../../../assets/iconsList.json';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css'],
  standalone: true,
  imports: [
    TemperatureConversionPipe,
    NumberPipe,
    LoadingSpinnerComponent,
    LocalTimeComponent,
    CommonModule,
    MaterialModule
  ]
})
export class WeatherResultComponent implements OnInit, AfterContentChecked {
  sharedData!: WeatherResult;
  sessionData!: WeatherResult;
  unit!: string;
  converted: boolean = false;
  loadingSpinner!: boolean;

  dateFormat!: string;
  timeFormat!: string | null;
  hour!: string | undefined;

  temperature!: number;
  feelsLike!: number;

  windDegree!: number;
  windSpeed!: number;
  windGust!: number;
  windDirection!: string;

  country!: string;
  city!: string;
  location!: string;
  locationTime!: string;

  weatherIndex!: number;
  weatherDescription!: string;
  weatherIcon!: string;
  backgroundImage: string = '../../../assets/images/';
  externalLink: any;
  iconPath!: string | undefined;
  dayState!: string;
  searchString!: string | null;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.timeCityWeatherData();
    this.temperatureUnit();
    this.route.paramMap.subscribe(params => {
      this.searchString = params.get('searchString');
    });
  }
  ngAfterContentChecked() {
    this.setWeatherIcon(this.sharedData.data.values.weatherCode.toString());
  }

  //Recieve and extract weather data
  timeCityWeatherData(sessionData?: WeatherResult) {
    this.weatherService.getSpinner().subscribe(data => {
      this.loadingSpinner = data;
    });

    this.weatherService.data$.subscribe(data => {
      this.sharedData = data;

      if (this.sharedData) {
        this.getLocationTime();

        this.dateFormat = this.sharedData.data.weatherDateTime.split('T')[0];
        this.temperature = this.sharedData.data.values.temperature;
        this.feelsLike = this.sharedData.data.values.temperatureApparent;
        this.windSpeed = this.sharedData.data.values.windSpeed;
        this.windGust = this.sharedData.data.values.windGust;
        this.windDegree = this.sharedData.data.values.windDirection;
        this.windDirection = WeatherUtilities.getWindDirection(this.sharedData.data.values.windDirection);
        this.location = this.weatherService.location.replace('/\s+/g', ', ');
        this.externalLink = environement.locationSearch + this.weatherService.location;
        this.weatherIndex = WeatherUtilities.getWeatherDescription(this.sharedData.data.values.weatherCode.toString()).index;
        this.weatherDescription = WeatherUtilities.getWeatherDescription(this.sharedData.data.values.weatherCode.toString()).description;
        this.setBackgroundImage();
      }
    });
  }
  //Set background day or night image 
  setBackgroundImage() {
    try {
      this.weatherIndex = Object.keys(WeatherCode).indexOf(this.sharedData.data.values.weatherCode.toString());
      this.dayState = this.timeOfTheDay();
      this.weatherDescription = this.dayState === 'night' && this.weatherDescription === 'Clear Sunny' ? 'Clear' : this.weatherDescription;

      return Object.values(WeatherCode).includes(this.sharedData.data.values.weatherCode) ?
        {
          'background-image': `url(${this.backgroundImage}${this.dayState}/${this.weatherDescription.replace(' ', '').toLowerCase()}.jpg)`
        } :
        { 'background': 'linear-gradient(351deg, rgba(9,17,121,0.9948354341736695) 0%, rgba(25,173,112,1) 51%, rgba(0,186,230,1) 100%)' };
    } catch (error) {
      return;
    }

  }
  //Set weather icon
  private setWeatherIcon(data: string) {

    const currentTime = this.timeOfTheDay();

    var dayState = WeatherUtilities.twentyFourHourDayTime(this.locationTime.split(':')[0]);

    // Check if code exists in weatherCode.ts
    const weatherindex = Object.keys(fourCode.WeatherCode).indexOf(data);

    // If exists get value
    var weatherDescription = Object.values(fourCode.WeatherCode)[weatherindex];
    weatherDescription = dayState === 'night' && weatherDescription === 'Clear_Sunny' ? weatherDescription.toString().slice(0, 5) : weatherDescription.toString();

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

    this.weatherIcon = environement.weatherIconPath + this.iconPath;

  }
  //Set weather temperature in celsius or farenheit
  private temperatureUnit() {
    this.weatherService.unitChoice$.subscribe(data => {
      if (data) {
        this.converted = !this.converted;
        this.unit = data;
      }
    });

  }
  //Set time of the day for background choice
  private timeOfTheDay(): string {
    const hour = parseInt(this.locationTime.split(':')[0]);
    this.dayState = hour > 19 || (hour >= 0 && hour < 6) ? 'night' : 'day';
    return this.dayState;
  }
  //Get location real time
  private getLocationTime() {

    this.weatherService.locationTimeData$
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
        this.dateFormat = `${day}, ${date} ${month}`;
      });
  }
}
