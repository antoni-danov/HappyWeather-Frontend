import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { weatherResultDto } from 'src/app/interfaces/weatherResultDto';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { WeatherState } from 'src/app/weatherState';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent implements OnInit {
  sharedData!: weatherResultDto;
  dateFormat!: string | null;
  timeFormat!: string | null;
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

      if (this.sharedData) {
        this.dateFormat = this.datePipe.transform(this.sharedData.location.localTime, 'EEEE, dd MMMM');
        this.timeFormat = this.sharedData.location.localTime;
        this.observationTime = this.sharedData.current.observationTime;
        this.weatherDescription = this.sharedData.current.weatherDescription[0].replace(/\s/g, '').trim().toLowerCase() + '.jpg';
      }
    });
  }
  setBackgroundImage() {
    this.weatherIndex = Object.values(WeatherState).indexOf(this.sharedData.current.weatherDescription[0].replace(/\s/g, '').trim());

    return Object.values(WeatherState).includes(this.sharedData.current.weatherDescription[0].replace(/\s/g, '').trim()) ?
      { 'background-image': 'url(' + this.backgroundImage + this.weatherDescription + ')' } :
      { 'background': 'linear-gradient(351deg, rgba(9,17,121,0.9948354341736695) 0%, rgba(25,173,112,1) 51%, rgba(0,186,230,1) 100%)' };
  }

}

