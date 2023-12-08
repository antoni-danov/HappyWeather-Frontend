import { Component, OnInit } from '@angular/core';
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
export class DayDetailsComponent implements OnInit {

  dayDetails!: DayUnit[];
  index!: number;
  day!: string;
  weatherIcon!: string;
  locationTime!: string;
  unit!: string;
  converted: boolean = false;
  windDirection!: string;

  constructor(
    private service: WeatherService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.index = params['id'];
    });
    this.detailedInformation();
    this.temperatureUnit();

  }

  detailedInformation() {
    this.service.fiveDaysData$.subscribe(data => {
      this.getLocationTime();
      var singleUnit = Object.values(data.timeLines.daily).splice(this.index, 1);
      this.dayDetails = singleUnit;
      this.setWeatherIcon();

      this.windDirection = WeatherUtilities.getWindDirection(this.dayDetails[0].values.windDirection);
      this.dayDetails[0].values.sunrise = this.transofrmTime(this.dayDetails[0].values.sunrise);
      this.dayDetails[0].values.sunset = this.transofrmTime(this.dayDetails[0].values.sunset);
      this.dayDetails[0].values.moonRise = this.transofrmTime(this.dayDetails[0].values.moonRise);
      this.dayDetails[0].values.moonSet = this.transofrmTime(this.dayDetails[0].values.moonSet);
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

    var iconInfo = WeatherUtilities.setIcon(this.dayDetails[0], this.locationTime);

    this.weatherIcon = environement.weatherIconPath + iconInfo.iconPath;

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
  //Get location real time
  private getLocationTime() {

    this.service.locationTimeData$
      .subscribe((timezoneData: any) => {
        //Get time zone
        const timeZoneId = timezoneData.timeZoneId;
        const currentUTC = new Date();
        const localTime = new Date(currentUTC.toLocaleString('en-US', { timeZone: timeZoneId }));
        //Get day, month and date
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(localTime);
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(localTime);
        const date = localTime.getDate();
        //Get hour and minutes
        const minutes = localTime.getMinutes() < 10 ? '0' + `${localTime.getMinutes()}` : localTime.getMinutes();
        const hours = localTime.getHours() < 10 ? '0' + `${localTime.getHours()}` : localTime.getHours();
        //Add values to variables
        this.locationTime = `${hours}:${minutes}`;
        // this.dateFormat = `${day}, ${date} ${month}`;
      });
  }
}
