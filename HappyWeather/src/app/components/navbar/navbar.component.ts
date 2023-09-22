import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  units: string = "metric";
  isChoosed: boolean = false;

  unitChoice() {
    this.isChoosed = !this.isChoosed;
    this.units = this.isChoosed === false ? "metric" : "imperial";
  }
}
