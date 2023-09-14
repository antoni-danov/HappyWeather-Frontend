import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environement } from 'src/app/environements/environement';
import { weatherResultDto } from 'src/app/interfaces/weatherResultDto';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherData!: weatherResultDto;

  private dataBehaviorSubject = new BehaviorSubject<weatherResultDto>(this.weatherData);
  public data$ = this.dataBehaviorSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getCurrentCity(cityName: string) {
    this.http.get<weatherResultDto>(environement.localhost + `/${cityName.split(',')[0]}`).subscribe(data => {
      this.dataBehaviorSubject.next(data);
    });
  }
}
