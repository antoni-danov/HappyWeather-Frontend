import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MatIconRegistry } from '@angular/material/icon';
import { WeatherResultComponent } from './components/weather-result/weather-result.component';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FiveDaysForecastComponent } from './components/five-days-forecast/five-days-forecast.component';
import { GlobalErrorHandling } from './shared/globalErrorHandler';
import { PageNotFoundComponent } from './components/notFound/page-not-found.component';
import { TechincalErrorComponent } from './components/techincal-error/techincal-error.component';
import { ErrorInterceptor } from './interceptors/errorInterceptor/error.interceptor';
import { DateFormatPipe } from './pipes/stringSplit/date-format.pipe';
import { NumberPipe } from './pipes/roundNumber/number.pipe';
import { TemperatureConversionPipe } from './pipes/temperature/temperature-conversion.pipe';
import { LocalTimeComponent } from './components/localTime/local-time/local-time.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { TwentyFourHourComponent } from './components/twenty-four-hour/twenty-four-hour.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherResultComponent,
    WeatherSearchComponent,
    NavbarComponent,
    FiveDaysForecastComponent,
    PageNotFoundComponent,
    TechincalErrorComponent,
    DateFormatPipe,
    NumberPipe,
    TemperatureConversionPipe,
    LocalTimeComponent,
    CountdownTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoadingSpinnerComponent
  ],
  providers: [DatePipe,
    DateFormatPipe,
    NumberPipe,
    TemperatureConversionPipe,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandling
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' },
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
