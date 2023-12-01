import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  units: string = "metric";
  isChoosed: boolean = false;
  haveResult: boolean = false;

  constructor(private service: WeatherService) {

  }
  ngOnInit() {
    this.haveResult = false;
    this.checkForResult();
  }

  checkForResult() {
    this.service.data$.subscribe(data => {
      if (data) {
        this.haveResult = true;
      }
    });
  }

  unitChoice() {
    this.isChoosed = !this.isChoosed;
    this.units = this.isChoosed === false ? "metric" : "imperial";
    this.service.setUnitChoice(this.units);
  }
}
