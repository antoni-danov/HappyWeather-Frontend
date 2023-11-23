import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-twenty-four-hour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './twenty-four-hour.component.html',
  styleUrl: './twenty-four-hour.component.css'
})
export class TwentyFourHourComponent implements OnInit {

  constructor(private service: WeatherService) {

  }
  ngOnInit() {
    this.detailedWeatherForecast();
  }

  detailedWeatherForecast() {
    this.service.hourlyWeatherForecast().subscribe(data => {
      console.log(data);

    });
  }

}
