import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { environement } from 'src/app/environements/environement';
import { WeatherResult } from 'src/app/interfaces/weatherResult';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { LocalTimeComponent } from '../localTime/local-time/local-time.component';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/material.module';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';
import { ExternalData } from 'src/app/interfaces/externalData';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css'],
  standalone: true,
  imports: [
    TemperatureConversionPipe,
    DateFormatPipe,
    NumberPipe,
    LoadingSpinnerComponent,
    LocalTimeComponent,
    CommonModule,
    MaterialModule
  ]
})
export class WeatherResultComponent implements OnInit, AfterContentChecked {
  sharedData!: WeatherResult;
  sessionData: ExternalData = {
    location: '',
    locationTime: '',
    windDegree: 0,
    windDirection: '',
    externalLink: '',
    weatherIndex: 0,
    weatherDescription: '',
    weatherIcon: '',
    unit: ''
  };
  converted: boolean = false;
  loadingSpinner!: boolean;

  dateFormat!: string;

  backgroundImage: string = '../../../assets/images/';
  searchString!: string | null;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    var existingData = sessionStorage.getItem(environement.sessionStorageMainData);

    if (existingData) {
      this.sharedData = JSON.parse(existingData!);
      this.sessionData = JSON.parse(sessionStorage.getItem(environement.sessionStorageSessionData)!);
    } else {
      this.timeCityWeatherData();
      this.temperatureUnit();
      this.route.paramMap.subscribe(params => {
        this.searchString = params.get('searchString');
      });
    }

  }
  ngAfterContentChecked() {
    this.setWeatherIcon();

    if (this.sessionData.locationTime && this.sessionData.weatherIcon) {
      WeatherUtilities.setSessionStorageData(environement.sessionStorageMainData, this.sharedData);
      WeatherUtilities.setSessionStorageData(environement.sessionStorageSessionData, this.sessionData);
    }
  }

  //Recieve and extract weather data
  timeCityWeatherData() {
    this.weatherService.getSpinner().subscribe(data => {
      this.loadingSpinner = data;
    });

    this.weatherService.data$.subscribe(data => {
      this.sharedData = data;

      if (this.sharedData) {
        this.getLocationTime();

        this.sharedData.data.time = this.sharedData.data.time.split('T')[0];

        this.sessionData.location = this.weatherService.location;
        this.sessionData.windDegree = this.sharedData.data.values.windDirection;
        this.sessionData.windDirection = WeatherUtilities.getWindDirection(this.sharedData.data.values.windDirection);
        this.sessionData.externalLink = environement.locationSearch + this.sessionData.location;
        this.sessionData.weatherIndex = WeatherUtilities.getWeatherDescription(this.sharedData.data.values.weatherCode.toString()).index;
        this.sessionData.weatherDescription = WeatherUtilities.getWeatherDescription(this.sharedData.data.values.weatherCode.toString()).description;

      }
    });

  }
  //Set weather icon
  private setWeatherIcon() {
    WeatherUtilities.twentyFourHourDayTime(this.sessionData.locationTime);

    var iconInfo = WeatherUtilities.setIcon(this.sharedData.data, this.sessionData.locationTime);

    this.sessionData.weatherIcon = environement.weatherIconPath + iconInfo.iconPath;
  }
  //Set weather temperature in celsius or farenheit
  private temperatureUnit() {
    this.weatherService.unitChoice$.subscribe(data => {
      if (data) {
        this.converted = !this.converted;
        this.sessionData.unit = data;
      }
    });

  }
  //Get location real time
  private getLocationTime() {
    this.weatherService.locationTimeData$
      .subscribe((timezoneData: any) => {
        this.sessionData.locationTime = WeatherUtilities.getLocationTime(timezoneData).locationTime;
        this.dateFormat = WeatherUtilities.getLocationTime(timezoneData).dateFormat;
      });
  }
}
