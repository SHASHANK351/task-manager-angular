import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BehaviorSubject } from 'rxjs';
import { LoginObj } from '../../app.model';
import { INVALID_CRED } from '../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  #authenticated = new BehaviorSubject<boolean>(false);
  authenticated = this.#authenticated.asObservable();
  #loginError = new BehaviorSubject<string>('');
  loginError = this.#loginError.asObservable();
  @BlockUI() blockUI!: NgBlockUI;
  constructor(private http: HttpClient) {}

  async login({ userName, password }: LoginObj) {
    this.blockUI.start('Authenticating...');
    this.http.get<LoginObj>('/login').subscribe(
      ({ userName: key, password: val }) => {
        if (userName === key && password === val) {
          this.#authenticated.next(true);
        } else {
          this.#authenticated.next(false);
          this.#loginError.next(INVALID_CRED);
        }
        this.blockUI.stop();
      },
      (err) => {
        this.blockUI.stop();
        this.#loginError.next('Error occurred in authentication');
      }
    );
  }
}
