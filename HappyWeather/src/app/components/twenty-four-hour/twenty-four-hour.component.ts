import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { HourlyUnit } from 'src/app/interfaces/HourlyForecast/hourlyUnit';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';
import { environement } from 'src/app/environements/environement';


@Component({
  selector: 'app-twenty-four-hour',
  standalone: true,
  templateUrl: './twenty-four-hour.component.html',
  styleUrl: './twenty-four-hour.component.css',
  imports: [
    CommonModule,
    TemperatureConversionPipe,
    NumberPipe,
    DateFormatPipe,
  ]
})
export class TwentyFourHourComponent implements OnInit {
  details!: HourlyUnit[];

  converted: boolean = false;
  unit!: string;
  iconPath!: string | undefined;
  realTimeDescription: string[] = [];
  iconPaths: string[] = [];
  timeOfTheDay: string[] = [];
  locationHour!: string | number;
  locationTime!: string;
  showButton: boolean = false;

  constructor(private service: WeatherService) {
  }

  ngOnInit() {
    this.detailedWeatherForecast();
    this.temperatureUnit();
  }
  @HostListener('window:scroll', [])

  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showButton = scrollPosition > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  detailedWeatherForecast() {
    //Get location current time
    this.getLocationTime();

    //Get 24 hours data for the location
    this.service.hourlyWeatherForecast().subscribe(data => {

      //Extract only 24 hours records starting from the location current time
      var extractedData = Object.values(data.timeLines.hourly)
        .findIndex(file => file.time.split('T')[1].split(':')[0] == this.locationHour.toString());
      this.details = Object.values(data.timeLines.hourly).splice(extractedData, 25);

      //Set weather icon for every record
      this.setWeatherIcon();
    });
  }

  //Set weatherIcon
  setWeatherIcon() {

    for (let index = 0; index <= this.details.length; index++) {

      var iconInfo = WeatherUtilities.setIcon(this.details[index]);
      this.realTimeDescription.push(iconInfo.weatherDescription.replaceAll('_', ' '));
      this.iconPaths.push(environement.weatherIconPath + iconInfo.iconPath);
    }
  }
  //Set weather temperature in celsius or farenheit
  private temperatureUnit() {
    this.service.unitChoice$.subscribe(data => {
      if (data) {
        this.converted = !this.converted;
        this.unit = data;
      }
    });

  }
  //Get location time
  private getLocationTime() {

    this.service.locationTimeData$
      .subscribe((timezoneData: any) => {
        //Get time zone
        const timeZoneId = timezoneData.timeZoneId;
        const currentUTC = new Date();
        const localTime = new Date(currentUTC.toLocaleString('en-US', { timeZone: timeZoneId }));
        //Get hour
        this.locationHour = localTime.getHours() < 10 ? '0' + `${localTime.getHours()}` : localTime.getHours();
        //Add values to variables
        this.locationTime = `${this.locationHour}:00`;
      });
  }

}
