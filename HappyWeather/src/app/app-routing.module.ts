import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/notFound/page-not-found.component';
import { TechincalErrorComponent } from './components/techincal-error/techincal-error.component';
import { ConnectionErrorComponent } from './components/connection-error/connection-error.component';
import { TwentyFourHourComponent } from './components/twenty-four-hour/twenty-four-hour.component';
import { FiveDaysForecastComponent } from './components/five-days-forecast/five-days-forecast.component';
import { WeatherResultComponent } from './components/weather-result/weather-result.component';
import { DayDetailsComponent } from './components/dayDetails/day-details/day-details.component';

const routes: Routes = [{
  title: "Happy weather", path: '', component: HomeComponent
}, {
  path: 'result/:searchString', component: WeatherResultComponent
}, {
  title: "24 hours", path: 'twenty-four-hours-forecast', component: TwentyFourHourComponent
}, {
  title: "Five days", path: 'five-days-forecast', component: FiveDaysForecastComponent
}, {
  path: "details/:id", component: DayDetailsComponent
}, {
  title: "Not Found", path: 'pagenotfound', component: PageNotFoundComponent
}, {
  title: "Error connection", path: 'connectionerror', component: ConnectionErrorComponent
},
{
  title: "Coffee break", path: 'coffeebreak', component: TechincalErrorComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
