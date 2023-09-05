import { AfterViewInit, Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { weatherResultDto } from 'src/app/interfaces/weatherResultDto';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements AfterViewInit {
  @Output() dataEmitter = new EventEmitter<weatherResultDto>();

  @ViewChild('inputField') inputField!: ElementRef;
  autocomplete: google.maps.places.Autocomplete | undefined;
  options = {
    types: ['(cities)'],
  };
  result: boolean = true;

  constructor(private service: WeatherService) {
  }

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement, this.options);
  }

  currentCityOnEnter() {
    this.service.getCurrentCity(this.inputField.nativeElement.value).subscribe(data => {
      this.dataEmitter.emit(data);
    });

    this.inputField.nativeElement.value = '';

  }
  currentCityOnClick() {
    // this.service.getCurrentCity(cityName).subscribe(data => {
    //   console.log(data);
    //   this.weatherData = data;
    // });
    this.inputField.nativeElement.value = '';


  }
}
