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
  timeFormat!: string | null;
  hour!: string | undefined;
  temperature!: number;
  feelsLike!: number;
  windDegree!: number;
  windDirection!: string;
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
        this.dateFormat = this.datePipe.transform(this.sharedData.data.weatherDateTime.split('T')[0], 'EEEE, dd MMMM');
        // this.iconHour();
        this.temperature = this.convertTemperature(this.sharedData.data.values.temperature);
        this.feelsLike = this.convertTemperature(this.sharedData.data.values.temperatureApparent);
        this.getWindDegree(this.sharedData.data.values.windDirection);
        this.getWindDirection(this.sharedData.data.values.windDirection);
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
  private convertTemperature(data: number): number {
    return (data % 1) < 50 ? Math.ceil(data) : Math.floor(data);
  }
  private getWindDegree(data: number) {
    this.windDegree = Math.floor(data);
  }
  private getWindDirection(data: number) {
    var directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    var index = Math.round(((data %= 360) < 0 ? data + 360 : data) / 45) % 8;
    this.windDirection = directions[index];
    console.log(this.windDirection);

  }
  // private iconHour() {
  //   var hours = parseInt(this.timeFormat!.split(':')[0], 10);
  //   var singleHour = new Date().setHours(hours);
  //   this.hour = this.datePipe.transform(singleHour, 'h')?.toString();
  // }
}
