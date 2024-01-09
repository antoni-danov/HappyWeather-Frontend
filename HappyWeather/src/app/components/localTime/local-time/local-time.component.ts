import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { WeatherUtilities } from 'src/app/shared/weatherUtilities';

@Component({
  selector: 'app-local-time',
  templateUrl: './local-time.component.html',
  styleUrls: ['./local-time.component.css'],
  standalone: true
})
export class LocalTimeComponent implements OnInit, AfterViewInit {

  @Input() localTime!: string;
  hour!: string;
  smallScreenSize: boolean | number = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.smallScreenSize = WeatherUtilities.checkScreenSize();
  }

  ngOnInit() {
    this.smallScreenSize = WeatherUtilities.checkScreenSize();
  }
  ngAfterViewInit() {
    this.hour = parseInt(this.localTime.split(':')[0]) > 12 ? (parseInt(this.localTime.split(':')[0]) - 12).toString() : this.localTime.split(':')[0];
  }
}
