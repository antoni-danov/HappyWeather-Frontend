import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-local-time',
  templateUrl: './local-time.component.html',
  styleUrls: ['./local-time.component.css']
})
export class LocalTimeComponent {
  @Input() localTime!: string;
}
