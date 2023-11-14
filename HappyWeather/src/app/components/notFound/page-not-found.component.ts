import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) {

  }
  ngOnInit() {
    setTimeout(() => {
      return this.router.navigate(['/']);
    }, 7000)
  }

}