import { AfterViewInit, Component, ElementRef, ViewChild, Renderer2, Input, ChangeDetectorRef, HostListener, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/modules/material.module';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css'],

})
export class WeatherSearchComponent implements OnInit, AfterViewInit {
  @Input() units: string = 'metric';

  @ViewChild('inputField') inputField!: ElementRef;
  showClearButton: boolean = false;
  autocomplete: google.maps.places.Autocomplete | undefined;
  options = {
    types: ['(cities)'],
  };
  smallScreenSize: boolean | number = false;

  constructor(private service: WeatherService,
    private renderer2: Renderer2,
    private cdref: ChangeDetectorRef) {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.smallScreenSize = WeatherUtilities.checkScreenSize();
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    if (!this.autocomplete) {
      this.renderer2.selectRootElement(this.inputField.nativeElement).focus();
    }

    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement, this.options);

    this.autocomplete?.addListener('place_changed', () => {

      const place = this.autocomplete?.getPlace().formatted_address;
      if (place) {
        this.currentCityOnChoose(place);
      }
    });
    this.cdref.detectChanges();
  }

  onInputChange(event: any) {
    this.showClearButton = event.target.value ? true : false;
  }
  currentCityOnEnter(event: any) {
    this.service.realTimeCurrentCity(this.inputField.nativeElement.value, this.units);
    this.renderer2.selectRootElement(this.inputField.nativeElement).blur();

    this.clearCityOnClick();
  }
  currentCityOnClick() {
    this.service.realTimeCurrentCity(this.inputField.nativeElement.value, this.units);
    this.renderer2.selectRootElement(this.inputField.nativeElement).blur();

    this.clearCityOnClick();
  }
  currentCityOnChoose(data: string) {
    this.service.realTimeCurrentCity(data, this.units);
    this.renderer2.selectRootElement(this.inputField.nativeElement).blur();

    this.clearCityOnClick();
  }
  clearCityOnClick() {
    this.inputField.nativeElement.value = '';
    this.showClearButton = false;
  }
}
