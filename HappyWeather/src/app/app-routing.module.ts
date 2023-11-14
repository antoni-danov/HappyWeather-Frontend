import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/notFound/page-not-found.component';
import { TechincalErrorComponent } from './components/techincal-error/techincal-error.component';
import { ConnectionErrorComponent } from './components/connection-error/connection-error.component';

const routes: Routes = [{
  title: "Happy weather", path: '', component: HomeComponent
}, {
  title: "Not Found", path: 'pageNotFound', component: PageNotFoundComponent
}, {
  title: "Error connection", path: 'connectionError', component: ConnectionErrorComponent
},
{
  title: "Error", path: 'error', component: TechincalErrorComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
