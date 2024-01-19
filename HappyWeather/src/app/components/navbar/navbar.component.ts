import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, DoCheck {
  units: string = "metric";
  isChoosed: boolean = false;
  haveResult: boolean = false;
  location!: string;
  haveSessionStorage!: number;

  constructor(private service: WeatherService, private router: Router) {
  }

  ngOnInit() {
    this.checkForResult();
  }

  ngDoCheck() {
    if (this.router.url.includes('/result/')) {
      this.location = this.router.url;
    }
  }

  checkForResult() {
    this.haveSessionStorage = sessionStorage.length;

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
