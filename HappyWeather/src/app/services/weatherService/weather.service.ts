import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
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
  locationTime!: any;
  private isLoading = new Subject<boolean>();

  private unitChoice: Subject<string> = new Subject<string>();
  public unitChoice$ = this.unitChoice.asObservable();

  private dataBehaviorSubject = new BehaviorSubject<WeatherResult>(this.weatherData);
  public data$ = this.dataBehaviorSubject.asObservable();

  private fiveDaysSubject = new BehaviorSubject<WeatherForecast<DayUnit>>(this.fiveDaysWeather);
  public fiveDaysData$ = this.fiveDaysSubject.asObservable();

  private locationTimeSubject = new BehaviorSubject<any>(this.locationTime);
  public locationTimeData$ = this.locationTimeSubject.asObservable();

  location!: string;
  units!: string;
  realtimeUnit!: string;
  dayUnit!: string;
  hourUnit!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
  }

  realTimeCurrentCity(cityName: string, unitChoice: string) {
    this.location = cityName.replaceAll(',', '');
    this.units = this.units != undefined ? this.units : unitChoice;

    this.realtimeUnit = this.units;

    var params = new HttpParams().set('unit', this.units);
    this.setSpinner(true);

    return this.http.get<WeatherResult>(environement.localhost + `${this.location}`, { params }).subscribe(data => {
      if (data) {
        this.setSpinner(false);
        this.weatherData = data;

        this.getLocationTime(data.location);

        this.ngZone.run(() => {
          this.router.navigate(['/result', cityName.split(', ')[0].toLowerCase()]);
          this.dataBehaviorSubject.next(data);
        });


      }
    });
  }
  fiveDaysForecast() {
    this.dayUnit = this.units;
    var params = new HttpParams().set('unit', this.units).set('timeStep', '1d');
    return this.http.get<WeatherForecast<DayUnit>>(environement.localhost + `${this.location}/dailyforecast`, { params })
      .subscribe(data => {
        if (data) {
          this.fiveDaysSubject.next(data);
        }
      });
  }
  hourlyWeatherForecast(): Observable<WeatherForecast<HourlyUnit>> {
    this.hourUnit = this.units;
    var params = new HttpParams().set('unit', this.units).set('timeStep', '1h');
    return this.http.get<WeatherForecast<HourlyUnit>>(environement.localhost + `${this.location}/hourlyforecast`, { params });
  }
  getIconFileNames() {
    return this.http.get<string[]>(environement.jsonIconsList);
  }
  setUnitChoice(value: string) {
    this.units = value;
  }
  getLocationTime(coordinates: WeatherLocation) {
    return this.http.get(environement.googleTimeZone + `${coordinates.latitude}%2C${coordinates.longitude}&timestamp=0&key=${environement.googleMapsApiKey}`)
      .subscribe(data => {
        this.locationTimeSubject.next(data);
      });

  }
  setSpinner(value: boolean) {
    this.isLoading.next(value);
  }
  getSpinner() {
    return this.isLoading.asObservable();
  }
}
