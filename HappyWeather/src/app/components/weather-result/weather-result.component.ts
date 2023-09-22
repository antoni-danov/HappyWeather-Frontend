import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherResult } from 'src/app/interfaces/weatherResult';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent implements OnInit {
  sharedData!: WeatherResult;
  dateFormat!: string | null;
  localTime!: string | null;
  observationTime!: string | null;
  weatherIndex!: number;
  weatherDescription!: string;
  backgroundImage: string = '../../../assets/images/';

  constructor(private weatherService: WeatherService,
    private datePipe: DatePipe) {
  }
  ngOnInit() {
    this.currentCityWeatherData();
  }

  currentCityWeatherData() {
    this.weatherService.data$.subscribe(data => {
      this.sharedData = data;
      console.log(this.sharedData);

      if (this.sharedData) {
        // this.localTime = this.sharedData.location.localTime;
        // this.observationTime = this.sharedData.current.observationTime;
        // this.weatherDescription = this.sharedData.current.weatherDescription[0].replace(/\s/g, '').trim().toLowerCase() + '.jpg';
        // this.timeOfTheDay();
      }
    });
  }
  setBackgroundImage() {

    // this.weatherIndex = Object.values(WeatherCode).indexOf(this.sharedData.current.weatherDescription[0].replace(/\s/g, '').trim());

    // return Object.values(WeatherCode).includes(this.sharedData.weatherData.WeatherValues.weatherCode) ?
    //   { 'background-image': 'url(' + this.backgroundImage + this.weatherDescription + ')' } :
    //   { 'background': 'linear-gradient(351deg, rgba(9,17,121,0.9948354341736695) 0%, rgba(25,173,112,1) 51%, rgba(0,186,230,1) 100%)' };
  }
  timeOfTheDay() {
    this.backgroundImage = '../../../assets/images/';

    // this.backgroundImage = this.sharedData.current.isDay === 'no' ? this.backgroundImage.concat('', 'night/') : this.backgroundImage.concat('', 'day/');
  }

}

