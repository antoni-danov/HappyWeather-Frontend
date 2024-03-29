import { AfterContentChecked, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { HourlyUnit } from 'src/app/interfaces/HourlyForecast/hourlyUnit';
import { TemperatureConversionPipe } from 'src/app/pipes/temperature/temperature-conversion.pipe';
import { NumberPipe } from 'src/app/pipes/roundNumber/number.pipe';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';
import { environement } from 'src/app/environements/environement';
import { ModalTwentyFourHoursComponent } from '../modalTwentyFourHours/modal-twenty-four-hours/modal-twenty-four-hours.component';


@Component({
  selector: 'app-twenty-four-hour',
  standalone: true,
  templateUrl: './twenty-four-hour.component.html',
  styleUrl: './twenty-four-hour.component.css',
  imports: [
    CommonModule,
    ModalTwentyFourHoursComponent,
    TemperatureConversionPipe,
    NumberPipe,
    DateFormatPipe,
  ]
})
export class TwentyFourHourComponent implements OnInit, AfterContentChecked {
  details!: HourlyUnit[];

  hourUnit!: string;
  unit!: string;
  iconPath!: string | undefined;
  realTimeDescription: string[] = [];
  iconPaths: string[] = [];
  timeOfTheDay: string[] = [];
  locationHour!: string | number;
  locationTime!: string;
  location!: string;
  externalLink!: string;

  showButton: boolean = false;
  smallScreenSize: boolean | number = false;
  initialUnit!: string;
  modalOpen: boolean = false;
  currentIndex!: number;

  constructor(private service: WeatherService) {
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
    this.detailedWeatherForecast();
    this.temperatureUnit();
  }
  ngAfterContentChecked() {
    this.temperatureUnit();
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
      this.location = this.service.location;
      this.externalLink = environement.locationSearch + this.location;
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
  toggleModal(index: number) {
    this.currentIndex = index;
    this.modalOpen = !this.modalOpen;
  }
  //Set weather temperature in celsius or farenheit
  private temperatureUnit() {
    this.unit = this.service.units;
    this.hourUnit = this.service.hourUnit;
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
