import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environement';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getCurrentCity(cityName: string) {
    console.log(cityName);
    console.log(environment.localhost + `/cityName`);
    return this.http.get(`environment.localhost/${cityName}`);
  }
}
