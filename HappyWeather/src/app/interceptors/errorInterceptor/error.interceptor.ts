import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occured: ', error.error.message);
          this.router.navigate(['/connectionerror']);
        } else {
          if (error.status == 0 || (error.status == 500 && error.statusText == 'OK')) {
            this.router.navigate(['/connectionerror']);
          }
          else if (error.status === 400 || error.status === 404) {
            console.error('Network error: ', error.status);
            this.router.navigate(['/pagenotfound']);
          } else if (error.status == 429) {
            this.router.navigate(['/coffeebreak']);
          }
          else {
            console.error(`Backend returned code ${error.status} body was: ${error.error}`);
          }
        }
        return throwError(error);
      })
    );
  }
}
