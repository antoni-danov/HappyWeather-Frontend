import { Component, Input } from '@angular/core';
import { weatherResultDto } from 'src/app/interfaces/weatherResultDto';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent {
  @Input() sharedData!: weatherResultDto;
}
