import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs';
import { INVALID_CRED } from 'src/app/app.constants';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = {
    userName: '',
    password: '',
  };
  subscribers: Subscription[] = [];
  @BlockUI() blockUI!: NgBlockUI;
  constructor(
    private loginApi: LoginService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.subscribers.push(
      this.loginApi.loginError.subscribe((err) => {
        const msg = err == INVALID_CRED ? 'Invalid credentials entered!!' : err;
        msg ? this.snackBar.error(msg) : '';
      })
    );
  }
  login(eve: Event) {
    eve.stopPropagation();
    this.loginApi.login(this.loginForm);
  }
  ngOnDestroy(): void {
    this.subscribers.forEach((sub) => sub.unsubscribe());
  }
}
