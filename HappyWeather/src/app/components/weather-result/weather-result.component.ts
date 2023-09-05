import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent {
  @Input() sharedData: any;
}
