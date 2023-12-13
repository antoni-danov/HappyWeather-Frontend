import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel/carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CarouselComponent]
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}