import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/notFound/page-not-found.component';

const routes: Routes = [{
  title: "Happy weather", path: '', component: HomeComponent
}, {
  title: "Not Found", path: 'error', component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
