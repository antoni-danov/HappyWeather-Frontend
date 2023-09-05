import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from 'src/app/environements/environement';
import { weatherResultDto } from 'src/app/interfaces/weatherResultDto';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getCurrentCity(cityName: string): Observable<weatherResultDto> {
    return this.http.get<weatherResultDto>(environement.localhost + `/${cityName.split(',')[0]}`);
  }
}
