import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.css'
})
export class CountdownTimerComponent implements OnInit {

  private durationInSeconds: number = 600;
  timeRemaining!: number;
  timer: any;
  minutes!: number;
  seconds!: number;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.timeRemaining = this.durationInSeconds;

    this.timer = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }
  updateCountdown() {
    this.minutes = Math.floor(this.timeRemaining / 60);
    this.seconds = this.timeRemaining % 60;

    this.timeRemaining--;

    if (this.timeRemaining < 0) {
      clearInterval(this.timer);
      this.router.navigate(['']);
    }
  }
  formatMinutes() {
    return this.padZero(Math.floor(this.timeRemaining / 60));
  }

  formatSeconds() {
    return this.padZero(this.timeRemaining % 60);
  }

  padZero(val: number): string {
    return val < 10 ? `0${val}` : `${val}`;
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }
}

