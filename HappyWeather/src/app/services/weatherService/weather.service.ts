import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environement } from 'src/app/environements/environement';
import { DailyWeatherForecast } from 'src/app/interfaces/DailyForecast/dailyWeatherForecast';
import { weatherLocation } from 'src/app/interfaces/weatherLocation';
import { WeatherResult } from 'src/app/interfaces/weatherResult';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherData!: WeatherResult;
  fiveDaysWeather!: DailyWeatherForecast;

  unitChoice: Subject<string> = new Subject<string>();
  unitChoice$ = this.unitChoice.asObservable();

  private dataBehaviorSubject = new BehaviorSubject<WeatherResult>(this.weatherData);
  public data$ = this.dataBehaviorSubject.asObservable();

  private fiveDaysSubject = new BehaviorSubject<DailyWeatherForecast>(this.fiveDaysWeather);
  public fiveDaysData$ = this.fiveDaysSubject.asObservable();

  location!: string;

  constructor(private http: HttpClient) {
  }

  realTimeCurrentCity(cityName: string, units: string) {
    this.location = cityName.replaceAll(',', '');
    var params = new HttpParams().set('unit', units);

    this.fiveDaysForecast(this.location, units);

    return this.http.get<WeatherResult>(environement.localhost + `/${this.location}`, { params }).subscribe(data => {
      if (data) {
        this.weatherData = data;
        this.dataBehaviorSubject.next(data);
      }
    });
  }
  fiveDaysForecast(cityName: string, units: string) {

    var params = new HttpParams().set('unit', units).set('timeStep', '1d');
    return this.http.get<DailyWeatherForecast>(environement.localhost + `/${cityName}/days`, { params }).subscribe(data => {
      this.fiveDaysSubject.next(data);
    });
  }
  getIconFileNames() {
    return this.http.get<string[]>(environement.jsonIconsList);
  }
  setUnitChoice(value: string) {
    this.unitChoice.next(value);
  }
  getLocationTime(coordinates: weatherLocation) {
    return this.http.get(environement.googleTimeZone + `${coordinates.latitude}%2C${coordinates.longitude}&timestamp=0&key=${environement.googleMapsApiKey}`);
  }
}
