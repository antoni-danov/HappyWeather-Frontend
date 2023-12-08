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

        this.dateFormat = this.sharedData.data.time.split('T')[0];
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
      }
    });
  }
  //Set weather icon
  private setWeatherIcon(data: string) {

    WeatherUtilities.twentyFourHourDayTime(this.locationTime);

    var iconInfo = WeatherUtilities.setIcon(this.sharedData.data, this.locationTime);

    this.weatherIcon = environement.weatherIconPath + iconInfo.iconPath;

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
