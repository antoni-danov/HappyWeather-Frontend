import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class GlobalErrorHandling implements ErrorHandler {

    constructor(private zone: NgZone, private router: Router) {

    }

    handleError(error: any): void {
        // this.zone.run(() => {
        //     this.router.navigate(['/error']);
        // });
    }
}