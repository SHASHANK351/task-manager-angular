import { Component } from '@angular/core';
import { LoginService } from './auth/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  authenticated = this.login.authenticated;
  constructor(private login: LoginService) {}
}
