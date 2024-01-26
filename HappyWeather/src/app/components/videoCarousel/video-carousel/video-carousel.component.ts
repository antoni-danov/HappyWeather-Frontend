import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-video-carousel',
  templateUrl: './video-carousel.component.html',
  styleUrl: './video-carousel.component.css'
})
export class VideoCarouselComponent implements OnInit {
  videos: string[] = [
    '../../../../assets/videos/pexels_videos_4100 (720p) (online-video-cutter.com).mp4',
    '../../../../assets/videos/pexels_videos_1409899 (720p) (online-video-cutter.com).mp4',
    '../../../../assets/videos/pexels-fearless-dreams-5598973 (540p) (online-video-cutter.com).mp4',
    '../../../../assets/videos/pexels-german-korb-5644053 (720p) (online-video-cutter.com).mp4',
  ];

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  currentIndex = 0;

  ngOnInit() {
    window.addEventListener('load', () => {
      this.playCurrentVideo();
      this.videoPlayer.nativeElement.addEventListener('ended', () => this.nextVideo());
    });
  }

  nextVideo() {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
    this.playCurrentVideo();
  }

  playCurrentVideo() {
    this.videoPlayer.nativeElement.src = this.videos[this.currentIndex];
    this.videoPlayer.nativeElement.load();
    this.videoPlayer.nativeElement.play();
  }
}
