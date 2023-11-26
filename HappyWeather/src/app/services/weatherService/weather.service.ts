import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environement } from 'src/app/environements/environement';
import { DayUnit } from 'src/app/interfaces/DailyForecast/dayUnit';
import { HourlyUnit } from 'src/app/interfaces/HourlyForecast/hourlyUnit';
import { WeatherForecast } from 'src/app/interfaces/WeatherForecast/weatherForecast';
import { WeatherLocation } from 'src/app/interfaces/weatherLocation';
import { WeatherResult } from 'src/app/interfaces/weatherResult';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherData!: WeatherResult;
  fiveDaysWeather!: WeatherForecast<DayUnit>;
  hourlyWeather!: WeatherForecast<HourlyUnit>;
  private isLoading = new Subject<boolean>();

  private unitChoice: Subject<string> = new Subject<string>();
  public unitChoice$ = this.unitChoice.asObservable();

  private dataBehaviorSubject = new BehaviorSubject<WeatherResult>(this.weatherData);
  public data$ = this.dataBehaviorSubject.asObservable();

  private fiveDaysSubject = new BehaviorSubject<WeatherForecast<DayUnit>>(this.fiveDaysWeather);
  public fiveDaysData$ = this.fiveDaysSubject.asObservable();

  location!: string;
  units!: string;

  test: any;
  constructor(private http: HttpClient) {
  }

  realTimeCurrentCity(cityName: string, units: string) {
    this.location = cityName.replaceAll(',', '');
    this.units = units;
    var params = new HttpParams().set('unit', units);
    this.setSpinner(true);

    return this.http.get<WeatherResult>(environement.localhost + `/${this.location}`, { params }).subscribe(data => {
      if (data) {
        this.setSpinner(false);
        this.weatherData = data;

        this.dataBehaviorSubject.next(data);
      }
    });
  }
  fiveDaysForecast(cityName: string, units: string) {

    var params = new HttpParams().set('unit', units).set('timeStep', '1d');
    return this.http.get<WeatherForecast<DayUnit>>(environement.localhost + `/${cityName}/dailyforecast`, { params }).subscribe(data => {
      this.fiveDaysSubject.next(data);
    });
  }
  hourlyWeatherForecast(): Observable<WeatherForecast<HourlyUnit>> {
    var params = new HttpParams().set('unit', this.units).set('timeStep', '1h');
    return this.http.get<WeatherForecast<HourlyUnit>>(environement.localhost + `/${this.location}/hourlyforecast`, { params });
  }
  getIconFileNames() {
    return this.http.get<string[]>(environement.jsonIconsList);
  }
  setUnitChoice(value: string) {
    this.unitChoice.next(value);
  }
  getLocationTime(coordinates: WeatherLocation) {
    return this.http.get(environement.googleTimeZone + `${coordinates.latitude}%2C${coordinates.longitude}&timestamp=0&key=${environement.googleMapsApiKey}`);

  }
  setSpinner(value: boolean) {
    this.isLoading.next(value);
  }
  getSpinner() {
    return this.isLoading.asObservable();
  }
  // sessionStorage(data: WeatherResult) {
  //   sessionStorage.clear();
  //   sessionStorage.setItem('data', JSON.stringify(data));
  // }
}
