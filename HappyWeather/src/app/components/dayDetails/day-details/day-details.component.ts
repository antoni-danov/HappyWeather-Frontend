import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { DayUnit } from 'src/app/interfaces/DailyForecast/dayUnit';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from 'src/app/pipes/stringSplit/date-format.pipe';

@Component({
  selector: 'app-day-details',
  standalone: true,
  imports: [
    CommonModule,
    DateFormatPipe],
  templateUrl: './day-details.component.html',
  styleUrl: './day-details.component.css'
})
export class DayDetailsComponent implements OnInit {

  dayDetails!: DayUnit[];
  index!: number;
  day!: string;

  constructor(
    private service: WeatherService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.index = params['id'];
    });
    this.detailedInformation();
  }

  detailedInformation() {
    this.service.fiveDaysData$.subscribe(data => {
      var singleUnit = Object.values(data.timeLines.daily).splice(this.index, 1);
      this.dayDetails = singleUnit;
      console.log(this.dayDetails);

    });
  }


}
