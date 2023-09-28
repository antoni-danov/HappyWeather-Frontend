import { Component, Input } from '@angular/core';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  units: string = "metric";
  isChoosed: boolean = false;
  constructor(private service: WeatherService) {

  }
  unitChoice() {
    this.isChoosed = !this.isChoosed;
    this.units = this.isChoosed === false ? "metric" : "imperial";
    this.service.setUnitChoice(this.units);
  }
}
