import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: WeatherService) {
  }

  ngOnInit() {
  }
}