import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

export class handleError {

    constructor(error: any, snackBar: MatSnackBar) {
        let message: string;
        if (error instanceof HttpErrorResponse) {
            message = (error.status) ? error.message : 'The service is currently unavailable. \nPlease try again later.';
        }
        else if (error) {
            message = error;
        }
        else {
            message = 'The service is currently unavailable. \nPlease try again later.'
        }
        let errMsg = `Sorry, ${message}`;
        if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)/i)) {
            snackBar.open(errMsg, "Close", { duration: 4000 });
        }
        else {
            alert(errMsg);
        }
    }

}


