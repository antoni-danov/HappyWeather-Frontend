import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherSearchComponent } from '../../weather-search/weather-search.component';

@Component({
  selector: 'app-video-carousel',
  standalone: true,
  imports: [
    CommonModule,
    WeatherSearchComponent
  ],
  templateUrl: './video-carousel.component.html',
  styleUrl: './video-carousel.component.css'
})
export class VideoCarouselComponent {
  videos: string[] = [
    '../../../../assets/videos/pexels_videos_4100 (720p).mp4',
    '../../../../assets/videos/pexels_videos_1409899 (720p).mp4',
    '../../../../assets/videos/pexels-dc-productions-11266561 (720p).mp4',
    '../../../../assets/videos/pexels-german-korb-5644053 (720p).mp4',
  ];

  currentIndex = 0;
  nextVideo(): void {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
  }
}
