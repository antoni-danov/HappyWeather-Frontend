import { Component, ElementRef, ViewChild } from '@angular/core';
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
    '../../../../assets/videos/pexels_videos_4100 (720p) (online-video-cutter.com).mp4',
    '../../../../assets/videos/pexels_videos_1409899 (720p) (online-video-cutter.com).mp4',
    '../../../../assets/videos/pexels-fearless-dreams-5598973 (540p) (online-video-cutter.com).mp4',
    '../../../../assets/videos/pexels-german-korb-5644053 (720p) (online-video-cutter.com).mp4',
  ];

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  currentIndex = 0;

  ngAfterViewInit(): void {
    this.videoPlayer.nativeElement.addEventListener('ended', () => this.nextVideo());
    this.playCurrentVideo();
  }

  nextVideo(): void {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
    this.playCurrentVideo();
  }

  playCurrentVideo(): void {
    this.videoPlayer.nativeElement.src = this.videos[this.currentIndex];
    this.videoPlayer.nativeElement.load();
    this.videoPlayer.nativeElement.play();
  }
}
