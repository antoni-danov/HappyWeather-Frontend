import { Component } from '@angular/core';
import { environement } from './environements/environement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HappyWeather';
  apiKey = environement.googleMapsApiKey;
}
