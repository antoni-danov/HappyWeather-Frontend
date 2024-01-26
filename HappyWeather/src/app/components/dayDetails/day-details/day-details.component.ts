import { AfterContentChecked, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { DayUnit } from 'src/app/interfaces/DailyForecast/dayUnit';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';
import { environement } from 'src/app/environements/environement';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';

@Component({
  selector: 'app-day-details',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatPipe,
    TemperatureConversionPipe,
    NumberPipe
  ],
  templateUrl: './day-details.component.html',
  styleUrl: './day-details.component.css'
})
export class DayDetailsComponent implements OnInit, AfterContentChecked {

  dayDetails!: DayUnit;
  index!: number;
  day!: string;
  weatherIcon!: string;
  locationTime!: string;
  location!: string;
  externalLink!: string;
  unit!: string;
  dayUnit!: string;
  windDirection!: string;
  smallScreenSize: boolean | number = false;

  constructor(
    private service: WeatherService,
    private route: ActivatedRoute) {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.smallScreenSize = WeatherUtilities.checkScreenSize();
  }

  ngOnInit() {
    this.smallScreenSize = WeatherUtilities.checkScreenSize();
    this.route.params.subscribe(params => {
      this.index = params['id'];
    });
    this.detailedInformation();
    this.temperatureUnit();
  }
  ngAfterContentChecked() {
    this.temperatureUnit();
    this.setWeatherIcon();
  }

  detailedInformation() {
    this.service.fiveDaysData$.subscribe(data => {
      if (data) {
        this.location = this.service.location;
        this.externalLink = environement.locationSearch + this.location;

        this.getLocationTime();
        this.dayDetails = Object.values(data.timeLines.daily).splice(this.index, 1)[0];

        this.windDirection = WeatherUtilities.getWindDirection(this.dayDetails.values.windDirection);
        this.dayDetails.values.sunrise = this.transofrmTime(this.dayDetails.values.sunrise);
        this.dayDetails.values.sunset = this.transofrmTime(this.dayDetails.values.sunset);
        this.dayDetails.values.moonRise = this.transofrmTime(this.dayDetails.values.moonRise);
        this.dayDetails.values.moonSet = this.transofrmTime(this.dayDetails.values.moonSet);
        this.setWeatherIcon();

      }

    });
  }
  //Extract only time from sunset, sunrise, moonset, moonrise
  private transofrmTime(data: string): string {
    var timeOfTheDay = data.split('T')[1].substring(0, 5);
    return timeOfTheDay;
  }
  //Set weather icon
  private setWeatherIcon() {

    WeatherUtilities.twentyFourHourDayTime(this.locationTime);
    const hour = this.locationTime;
    var iconInfo = WeatherUtilities.setIcon(this.dayDetails, hour);

    this.weatherIcon = environement.weatherIconPath + iconInfo.iconPath;

  }
  //Set weather temperature in celsius or farenheit
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
}
