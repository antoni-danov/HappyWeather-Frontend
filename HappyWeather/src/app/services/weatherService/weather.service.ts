import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environement } from 'src/app/environements/environement';
import { WeatherResult } from 'src/app/interfaces/weatherResult';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherData!: WeatherResult;

  private dataBehaviorSubject = new BehaviorSubject<WeatherResult>(this.weatherData);
  public data$ = this.dataBehaviorSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  realTimeCurrentCity(cityName: string, units: string) {
    var convertCityName = cityName.replaceAll(',', '');
    var params = new HttpParams().set('unit', units);

    return this.http.get<WeatherResult>(environement.localhost + `/${convertCityName}`, { params }).subscribe(data => {
      if (data) {
        this.dataBehaviorSubject.next(data);
      }
    });
  }
  getIconFileNames() {
    return this.http.get<string[]>(environement.jsonIconsList);
  }
}
