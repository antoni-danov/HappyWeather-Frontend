import { Component, OnInit } from '@angular/core';
import { WeatherResultComponent } from '../weather-result/weather-result.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [WeatherResultComponent]
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}