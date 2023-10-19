import { Component, OnInit } from '@angular/core';
import { weatherCode } from 'src/app/enums/weatherCode';
import { environement } from 'src/app/environements/environement';
import { WeatherResult } from 'src/app/interfaces/weatherResult';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent implements OnInit {
  sharedData!: WeatherResult;
  unit!: string;

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

  weatherIndex!: number;
  weatherDescription!: string;
  weatherIcon!: string;
  backgroundImage: string = '../../../assets/images/day/';
  weatherIconPath: string = '../../../assets/icons/tomorrow-weather-codes-master/V2_icons/large/png/';
  externalLink: any;

  constructor(private weatherService: WeatherService) {
  }
  ngOnInit() {
    this.timeCityWeatherData();
    this.temperatureUnit();
  }

  timeCityWeatherData() {
    this.weatherService.data$.subscribe(data => {
      this.sharedData = data;

      if (this.sharedData) {
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
        this.weatherDescription === 'Clear Sunny' ? this.setWeatherIcon(this.weatherDescription.split(' ')[0]) : this.setWeatherIcon(this.weatherDescription);
        this.setBackgroundImage();
      }
    });
  }
  setBackgroundImage() {
    try {
      this.weatherIndex = Object.keys(weatherCode).indexOf(this.sharedData.data.values.weatherCode.toString());
      return Object.values(weatherCode).includes(this.sharedData.data.values.weatherCode) ?
        { 'background-image': 'url(' + this.backgroundImage + this.weatherDescription.replace(' ', '').toLowerCase() + '.jpg)' } :
        { 'background': 'linear-gradient(351deg, rgba(9,17,121,0.9948354341736695) 0%, rgba(25,173,112,1) 51%, rgba(0,186,230,1) 100%)' };
    } catch (error) {
      return;
    }

  }
  private setWeatherIcon(data: string) {
    var currentTime = new Date().getHours();

    this.weatherService.getIconFileNames().subscribe(files => {

      var currentIconNames = files.map((file, index) => (file.substring(5)
        .replaceAll('_', ' ')
        .trimStart().startsWith(data.toLocaleLowerCase()) ? index : -1))
        .filter(index => index !== -1);

      if (currentTime > 6 && currentTime < 19) {
        this.weatherIcon = this.weatherIconPath + files[currentIconNames[0]];
      } else {
        this.weatherIcon = this.weatherIconPath + files[currentIconNames[1]];
      }

    });

  }
  private temperatureUnit() {
    this.weatherService.unitChoice$.subscribe(data => {
      this.unit = data;
    });

  }
}
