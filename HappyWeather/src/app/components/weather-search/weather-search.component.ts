import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  autocomplete: google.maps.places.Autocomplete | undefined;
  userInput: string = '';
  options = {
    types: ['(cities)'],
  };


  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement, this.options);
  }
  currentCityOnEnter() {
    console.log('User pressed Enter. Value entered:', this.autocomplete?.getPlace());
    this.inputField.nativeElement.value = '';
    // this.service.getCurrentCity(cityName).subscribe(data => {
    //   console.log(data);
    //   this.weatherData = data;
    // });

  }
  currentCityOnClick() {
    console.log('User clicked. Value entered:', this.autocomplete?.getPlace());
    this.inputField.nativeElement.value = '';


  }
}
