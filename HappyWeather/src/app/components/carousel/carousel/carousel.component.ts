import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  images = ['../assets/images/home/aaron-burden-5AiWn2U10cw-unsplash.jpg',
    '../assets/images/home/arno-smit-sKJ7zSylUao-unsplash.jpg',
    '../assets/images/home/noaa-kcvlb727mn8-unsplash.jpg',
    '../assets/images/home/sean-oulashin-KMn4VEeEPR8-unsplash.jpg',
    '../assets/images/home/vision-webagency-LSF8WGtQmn8-unsplash.jpg'];

  customOptions: OwlOptions = {
    dots: true,
    loop: true,
    navSpeed: 7000,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    items: 1,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn'
  }
}
