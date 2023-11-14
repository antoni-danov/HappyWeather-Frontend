import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { DailyWeatherForecast } from 'src/app/interfaces/DailyForecast/dailyWeatherForecast';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.css']
})
export class FiveDaysForecastComponent implements AfterViewInit {

  fivedaysForecast!: DailyWeatherForecast;
  unit!: string;
  converted: boolean = false;

  minTemperature!: number;
  maxTemperature!: number;
  weatherIndex!: number;
  weatherDescription!: string;
  weatherIcon!: string;

  constructor(private service: WeatherService, private cdref: ChangeDetectorRef) {

  }
  ngAfterViewInit() {
    this.getFiveDaysWeatherForecast();
    this.temperatureUnit();

  }
  getFiveDaysWeatherForecast() {
    this.service.fiveDaysData$.subscribe(data => {
      this.fivedaysForecast = data;
    });
    this.cdref.detectChanges();
  }
  private temperatureUnit() {
    this.service.unitChoice$.subscribe(data => {
      if (data) {
        this.converted = !this.converted;
        this.unit = data;
      }
    });
  }
  // setIcon(data: number): any {

  //   var currentTime = new Date().getHours();

  //   this.service.getIconFileNames().subscribe(files => {
  //     console.log(files);

  //     // var currentIconNames = files.map((file, index) => (file.substring(5)
  //     //   .replaceAll('_', ' ')
  //     //   .trimStart().startsWith(data.toString().toLocaleLowerCase()) ? index : -1))
  //     //   .filter(index => index !== -1);

  //     // if (currentTime > 6 && currentTime < 19) {
  //     //   this.weatherIcon = environement.weatherIconPath + files[currentIconNames[0]];
  //     //   console.log(this.weatherIcon);

  //     // } else {
  //     //   this.weatherIcon = environement.weatherIconPath + files[currentIconNames[1]];
  //     //   console.log(this.weatherIcon);

  //     // }

  //   });
  // }
  setIcon(data: any): any {
    console.log(data);

  }
}
