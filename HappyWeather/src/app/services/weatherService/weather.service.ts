import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environement } from 'src/app/environements/environement';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getCurrentCity(cityName: string) {
    return this.http.get(environement.localhost + `/${cityName.split(',')[0]}`);
  }
}
