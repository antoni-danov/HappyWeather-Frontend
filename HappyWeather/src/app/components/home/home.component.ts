import { Component, OnInit } from '@angular/core';
import { VideoCarouselComponent } from '../videoCarousel/video-carousel/video-carousel.component';
import { WeatherSearchComponent } from '../weather-search/weather-search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    VideoCarouselComponent,
    WeatherSearchComponent
  ]
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}