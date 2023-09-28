import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { weatherCode } from 'src/app/enums/weatherCode';
import { weatherCodeFullDay } from 'src/app/enums/weatherCodeFullDay';
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

  dateFormat!: string | null;
  timeFormat!: string | null;
  hour!: string | undefined;

  temperature!: number;
  feelsLike!: number;

  windDegree!: number;
  windDirection!: string;

  country!: string;
  city!: string;

  weatherIndex!: number;
  weatherDescription!: string;
  weatherIcon!: string;
  backgroundImage: string = '../../../assets/images/day/';
  weatherIconPath: string = '../../../assets/icons/tomorrow-weather-codes-master/V2_icons/large/png/';
  externalLink: any;

  constructor(private weatherService: WeatherService,
    private datePipe: DatePipe) {
  }
  ngOnInit() {
    this.crealTimeCityWeatherData();
  }

  crealTimeCityWeatherData() {
    this.weatherService.data$.subscribe(data => {
      this.sharedData = data;

      if (this.sharedData) {
        this.dateFormat = this.datePipe.transform(this.sharedData.data.weatherDateTime.split('T')[0], 'EEEE, dd MMMM');

        this.temperature = WeatherUtilities.convertTemperature(this.sharedData.data.values.temperature);
        this.feelsLike = WeatherUtilities.convertTemperature(this.sharedData.data.values.temperatureApparent);
        this.windDegree = WeatherUtilities.getWindDegree(this.sharedData.data.values.windDirection);
        this.windDirection = WeatherUtilities.getWindDirection(this.sharedData.data.values.windDirection);
        this.city = WeatherUtilities.transformLocationName(this.sharedData.location.name).city;
        this.country = WeatherUtilities.transformLocationName(this.sharedData.location.name).country;
        this.externalLink = environement.locationSearch + this.city + ' ' + this.country;
        this.weatherIndex = WeatherUtilities.getWeatherDescription(this.sharedData.data.values.weatherCode.toString()).index;
        this.weatherDescription = WeatherUtilities.getWeatherDescription(this.sharedData.data.values.weatherCode.toString()).description;
        this.weatherDescription === 'Clear Sunny' ? this.setWeatherIcon(this.weatherDescription.split(' ')[0]) : this.setWeatherIcon(this.weatherDescription);
        this.setBackgroundImage();
      }
    });
  }
  setBackgroundImage() {

    this.weatherIndex = Object.keys(weatherCodeFullDay).indexOf(this.sharedData.data.values.weatherCode.toString());

    return Object.values(weatherCode).includes(this.sharedData.data.values.weatherCode) ?
      { 'background-image': 'url(' + this.backgroundImage + this.weatherDescription.replace(' ', '').toLowerCase() + '.jpg)' } :
      { 'background': 'linear-gradient(351deg, rgba(9,17,121,0.9948354341736695) 0%, rgba(25,173,112,1) 51%, rgba(0,186,230,1) 100%)' };
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
}
