import { Component, HostListener, OnInit } from '@angular/core';
import { DayUnit } from 'src/app/interfaces/DailyForecast/dayUnit';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { CommonModule } from '@angular/common';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';
import { environement } from 'src/app/environements/environement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.css'],
  standalone: true,
  imports: [
    TemperatureConversionPipe,
    NumberPipe,
    DateFormatPipe,
    CommonModule
  ],
  animations: []
})
export class FiveDaysForecastComponent implements OnInit {

  fivedaysForecast!: DayUnit[];
  unit!: string;
  dayUnit!: string;
  dayTimeDescription: string[] = [];
  iconPath!: string | undefined;
  iconPaths: string[] = [];

  minTemperature!: number;
  maxTemperature!: number;
  weatherIndex!: number;
  weatherDescription!: string;
  weatherIcon!: string;

  locationTime!: string;
  location!: string;
  externalLink!: string;
  showButton: boolean = false;
  smallScreenSize: boolean | number = false;

  constructor(
    private service: WeatherService,
    private router: Router) {

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.smallScreenSize = WeatherUtilities.checkScreenSize();
  }
  @HostListener('window:scroll', [])

  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showButton = scrollPosition > 100;
  }
  ngOnInit() {
    this.smallScreenSize = WeatherUtilities.checkScreenSize();

    this.fiveDaysWeatherForecast();
    this.temperatureUnit();
  }
  ngAfterContentChecked() {
    this.temperatureUnit();
  }

  fiveDaysWeatherForecast() {
    this.service.fiveDaysForecast();

    this.service.fiveDaysData$.subscribe(data => {

      this.location = this.service.location;
      this.externalLink = environement.locationSearch + this.location;

      this.getLocationTime();
      this.fivedaysForecast = Object.values(data.timeLines.daily).splice(0, data.timeLines.daily.length - 1);
      this.setWeatherIcon();
    });
  }
  //Set weatherIcon
  setWeatherIcon() {

    for (let index = 0; index <= this.fivedaysForecast.length; index++) {
      const hour = this.locationTime;
      var iconInfo = WeatherUtilities.setIcon(this.fivedaysForecast[index], hour);

      this.dayTimeDescription.push(iconInfo.weatherDescription.replaceAll('_', ' '));
      this.iconPaths.push(environement.weatherIconPath + iconInfo.iconPath);
    }

  }
  navigateToDetails(index: number, day: any) {
    this.router.navigate(['/details', index]);
  }
  private temperatureUnit() {
    this.unit = this.service.units;
    this.dayUnit = this.service.dayUnit;
  }
  //Get location real time
  private getLocationTime() {

    this.service.locationTimeData$
      .subscribe((timezoneData: any) => {
        this.locationTime = WeatherUtilities.getLocationTime(timezoneData).locationTime;
      });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
