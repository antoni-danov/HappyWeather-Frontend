import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-local-time',
  templateUrl: './local-time.component.html',
  styleUrls: ['./local-time.component.css'],
  standalone: true
})
export class LocalTimeComponent implements AfterViewInit {

  @Input() localTime!: string;
  hour!: string;

  ngAfterViewInit() {
    this.hour = this.localTime.split(':')[0];
  }
}
