import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  #errorConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };
  constructor(private _snackBar: MatSnackBar) {}
  error(message: string, action = 'Ok', config = this.#errorConfig) {
    this._snackBar.open(message, action, this.#errorConfig);
  }
}
