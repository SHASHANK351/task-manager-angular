import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { BehaviorSubject } from 'rxjs';
import { BlockUIModule } from 'ng-block-ui';
import { LoginObj } from '../../app.model';
import { INVALID_CRED } from '../../app.constants';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BlockUIModule.forRoot()],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate successfully', () => {
    const mockLoginObj: LoginObj = {
      userName: 'admin',
      password: 'password',
    };
    const mockResponse: LoginObj = {
      userName: 'admin',
      password: 'password',
    };

    spyOn(service['blockUI'], 'start');
    spyOn(service['blockUI'], 'stop');

    service.login(mockLoginObj);

    const req = httpTestingController.expectOne('/login');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);

    expect(service['blockUI'].start).toHaveBeenCalledWith('Authenticating...');
    let detectVal;
    // @ts-ignore
    service['#authenticated'] = new BehaviorSubject(false);
    // @ts-ignore
    (service['#authenticated'] as BehaviorSubject<boolean>).next(true);
    service.authenticated.subscribe((val) => (detectVal = val));
    expect(detectVal).toBeTrue;
    expect(service['blockUI'].stop).toHaveBeenCalled();
  });

  it('should handle authentication failure', () => {
    const mockLoginObj: LoginObj = {
      userName: 'testuser',
      password: 'wrongpassword',
    };

    spyOn(service['blockUI'], 'start');
    spyOn(service['blockUI'], 'stop');

    service.login(mockLoginObj);

    const req = httpTestingController.expectOne('/login');
    expect(req.request.method).toEqual('GET');
    req.flush({ userName: 'admin', password: 'password' }); // Simulate incorrect credentials

    expect(service['blockUI'].start).toHaveBeenCalledWith('Authenticating...');
    let detectVal;
    // @ts-ignore
    service['#authenticated'] = new BehaviorSubject(false);
    // @ts-ignore
    (service['#authenticated'] as BehaviorSubject<boolean>).next(false);
    service.authenticated.subscribe((val) => (detectVal = val));
    expect(detectVal).toBeFalse;
    let errorVal = '';
    // @ts-ignore
    service['#loginError'] = new BehaviorSubject('');
    // @ts-ignore
    (service['#loginError'] as BehaviorSubject<string>).next(INVALID_CRED);
    service.loginError.subscribe((val) => (errorVal = val));
    expect(errorVal).toEqual(INVALID_CRED);
    expect(service['blockUI'].stop).toHaveBeenCalled();
  });

  it('should handle authentication error', () => {
    const mockLoginObj: LoginObj = {
      userName: 'testuser',
      password: 'password123',
    };

    spyOn(service['blockUI'], 'start');
    spyOn(service['blockUI'], 'stop');

    service.login(mockLoginObj);

    const req = httpTestingController.expectOne('/login');
    expect(req.request.method).toEqual('GET');
    req.error(new ErrorEvent('error')); // Simulate HTTP error

    expect(service['blockUI'].start).toHaveBeenCalledWith('Authenticating...');
    let errorVal = '';
    // @ts-ignore
    service['#loginError'] = new BehaviorSubject('');
    // @ts-ignore
    (service['#loginError'] as BehaviorSubject<string>).next(
      'Error occurred in authentication'
    );
    service.loginError.subscribe((val) => (errorVal = val));
    expect(errorVal).toEqual('Error occurred in authentication');
    expect(service['blockUI'].stop).toHaveBeenCalled();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
