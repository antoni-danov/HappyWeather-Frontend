import { Component, OnInit } from '@angular/core';
import { WeatherSearchComponent } from '../weather-search/weather-search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  receivedData: any;
  constructor() {
  }

  ngOnInit() {
  }

  receiveData(data: any) {
    console.log("Home component " + data);

    this.receivedData = data;
    console.log("Home component " + this.receivedData);

  }
}