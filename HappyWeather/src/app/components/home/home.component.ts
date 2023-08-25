import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weatherService/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form!: FormGroup;
  constructor(private service: WeatherService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      cityName: new FormControl('', Validators.required)
    });
  }

  getCurrentCity(cityName: string) {
    console.log(cityName);

    //this.service.getCurrentCity('Sofia').subscribe(data => console.log(data));
  }

}
