import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userInput: string = '';
  constructor(private service: WeatherService) {
  }

  ngOnInit() {
  }
  currentCityOnEnter() {
    console.log('User pressed Enter. Value entered:', this.userInput);
    this.userInput = '';
    // this.service.getCurrentCity(cityName).subscribe(data => {
    //   console.log(data);
    //   this.weatherData = data;
    // });

  }
  currentCityOnClick() {
    console.log('User clicked. Value entered:', this.userInput);
    this.userInput = '';

  }
}