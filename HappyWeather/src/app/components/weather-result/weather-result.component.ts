import { Component, OnInit } from '@angular/core';
import { weatherCode } from 'src/app/enums/weatherCode';
import { environement } from 'src/app/environements/environement';
import { weatherLocation } from 'src/app/interfaces/weatherLocation';
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
    this.timeCityWeatherData();
    this.temperatureUnit();
  }

  //Recieve and extract weather data
  timeCityWeatherData() {
    this.weatherService.getSpinner().subscribe(data => {
      this.loadingSpinner = data;
    });

    this.weatherService.data$.subscribe(data => {
      this.sharedData = data;

      if (this.sharedData) {
        console.log('when data returned', this.loadingSpinner);

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
        // this.weatherDescription === 'Clear Sunny' ? this.setWeatherIcon(this.weatherDescription.split(' ')[0]) : this.setWeatherIcon(this.weatherDescription);
        this.setBackgroundImage();
      }
    });

  }
  //Set background day or night image 
  setBackgroundImage() {
    try {
      this.weatherIndex = Object.keys(weatherCode).indexOf(this.sharedData.data.values.weatherCode.toString());
      this.dayState = this.timeOfTheDay();
      this.weatherDescription = this.dayState === 'night' && this.weatherDescription === 'Clear Sunny' ? 'Clear' : this.weatherDescription;

      return Object.values(weatherCode).includes(this.sharedData.data.values.weatherCode) ?
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

    this.weatherService.getIconFileNames().subscribe(files => {

      var currentIconNames = files.map((file, index) => (file.substring(5)
        .replaceAll('_', ' ')
        .trimStart().startsWith(data.toLocaleLowerCase()) ? index : -1))
        .filter(index => index !== -1);

      this.weatherIcon = currentTime === 'day' ? this.weatherIconPath + files[currentIconNames[0]] : this.weatherIconPath + files[currentIconNames[1]];
    });
  }
  //Set weather temperature in celsius or farenheit
  private temperatureUnit() {
    this.weatherService.unitChoice$.subscribe(data => {
      this.unit = data;
    });

  }
  //Set time of the day for background choice
  private timeOfTheDay(): string {
    const hour = parseInt(this.locationTime.split(':')[0]);
    this.dayState = hour > 19 || (hour >= 0 && hour < 6) ? 'night' : 'day';
    return this.dayState;
  }
  //Get location real time
  private getLocationTime(coordinates: weatherLocation) {
    this.weatherService.getLocationTime(coordinates)
      .subscribe((timezoneData: any) => {
        const timeZoneId = timezoneData.timeZoneId;
        const currentUTC = new Date();
        const localTime = new Date(currentUTC.toLocaleString('en-US', { timeZone: timeZoneId }));
        const minutes = localTime.getMinutes() < 10 ? '0' + `${localTime.getMinutes()}` : localTime.getMinutes();
        const hours = localTime.getHours() < 10 ? '0' + `${localTime.getHours()}` : localTime.getHours();
        this.locationTime = `${hours}:${minutes}`;
      });
  }
}
