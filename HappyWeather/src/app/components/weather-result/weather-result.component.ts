import { Component, OnInit } from '@angular/core';
import { WeatherCode } from 'src/app/enums/weatherCode';
import { environement } from 'src/app/environements/environement';
import { WeatherLocation } from 'src/app/interfaces/weatherLocation';
import { WeatherResult } from 'src/app/interfaces/weatherResult';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';
import * as iconList from '../../../assets/iconsList.json';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { LocalTimeComponent } from '../localTime/local-time/local-time.component';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/material.module';

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
export class WeatherResultComponent implements OnInit {
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
  weatherIconPath: string = '../../../assets/icons/tomorrow-weather-codes-master/V2_icons/large/png/';
  externalLink: any;

  dayState!: string;

  constructor(private weatherService: WeatherService) {
  }
  ngOnInit() {
    // if (sessionStorage) {
    //   var currentData = sessionStorage.getItem('data');
    //   this.sessionData = JSON.parse(currentData!);
    //   this.timeCityWeatherData(this.sessionData);

    // } else {
    this.timeCityWeatherData();
    this.temperatureUnit();
    // }
  }

  //Recieve and extract weather data
  timeCityWeatherData(sessionData?: WeatherResult) {
    this.weatherService.getSpinner().subscribe(data => {
      this.loadingSpinner = data;
    });

    if (sessionData) {
      console.log(sessionData);

    } else {
      this.weatherService.data$.subscribe(data => {
        this.sharedData = data;
        sessionStorage.setItem('data', JSON.stringify(this.sharedData))

        if (this.sharedData) {
          this.getLocationTime(this.sharedData.location);

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
          this.setWeatherIcon(this.weatherDescription);
          this.setBackgroundImage();
        }
      });
    }
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

    var test = Object.values(iconList).map((file, index) => (file.substring(5)));
    // var currentIconNames = Object.values(iconList).map((file, index) => (file.substring(5)
    //   .replaceAll('_', ' ')
    //   .trimStart().startsWith(data.toLocaleLowerCase()) ? index : -1))
    //   .filter(index => index !== -1);

    console.log(typeof (test));
    console.log('Test result: ', test);

    // this.weatherIcon = currentTime === 'day' ? this.weatherIconPath + iconList[currentIconNames[0]] : this.weatherIconPath + iconList[currentIconNames[1]];


    // this.weatherService.getIconFileNames().subscribe(files => {

    //   var currentIconNames = files.map((file, index) => (file.substring(5)
    //     .replaceAll('_', ' ')
    //     .trimStart().startsWith(data.toLocaleLowerCase()) ? index : -1))
    //     .filter(index => index !== -1);
    //   console.log('Filtered collection: ', currentIconNames);

    //   this.weatherIcon = currentTime === 'day' ? this.weatherIconPath + files[currentIconNames[0]] : this.weatherIconPath + files[currentIconNames[1]];
    //   console.log('weather icon: ', this.weatherIcon);

    // });
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
  private getLocationTime(coordinates: WeatherLocation) {
    this.weatherService.getLocationTime(coordinates)
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
