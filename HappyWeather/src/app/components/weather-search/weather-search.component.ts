import { AfterViewInit, Component, ElementRef, ViewChild, Renderer2, Input, ChangeDetectorRef } from '@angular/core';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements AfterViewInit {
  @Input() units!: string;

  @ViewChild('inputField') inputField!: ElementRef;
  showClearButton: boolean = false;
  autocomplete: google.maps.places.Autocomplete | undefined;
  options = {
    types: ['(cities)'],
  };

  constructor(private service: WeatherService,
    private renderer2: Renderer2,
    private cdref: ChangeDetectorRef) {
  }
  onInputChange(event: any) {
    this.showClearButton = event.target.value ? true : false;
  }
  ngAfterViewInit() {
    this.renderer2.selectRootElement(this.inputField.nativeElement).focus();
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement, this.options);
    this.cdref.detectChanges();
  }
  currentCityOnEnter(event: any) {
    this.service.realTimeCurrentCity(this.inputField.nativeElement.value, this.units);
    this.clearCityOnClick()
  }
  currentCityOnClick() {
    this.service.realTimeCurrentCity(this.inputField.nativeElement.value, this.units);
    this.clearCityOnClick()
  }
  clearCityOnClick() {
    this.inputField.nativeElement.value = '';
    this.showClearButton = false;
  }
}
