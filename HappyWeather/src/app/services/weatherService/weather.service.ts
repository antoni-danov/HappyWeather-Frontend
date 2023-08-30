import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environement } from 'src/app/environements/environement';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getCurrentCity(cityName: string) {
    console.log(cityName);
    console.log(environement.localhost + `/cityName`);
    return this.http.get(`environment.localhost/${cityName}`);
  }
}
