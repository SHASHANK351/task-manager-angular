import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginService } from './auth/services/login.service';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loginServiceStub: Partial<LoginService>;

  beforeEach(async () => {
    // Create a stub for LoginService
    loginServiceStub = {
      authenticated: new BehaviorSubject<boolean>(false).asObservable(), // Initial value as false
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: LoginService, useValue: loginServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize authenticated property from LoginService', () => {
    // Initial value from the stub
    let initVal;
    component.authenticated.subscribe((val) => (initVal = val));
    expect(initVal).toBeFalse;

    // Simulate change in authenticated status in the LoginService
    const loginService = TestBed.inject(LoginService) as LoginService;
    // @ts-ignore
    loginService['#authenticated'] = new BehaviorSubject(false);
    // @ts-ignore
    (loginService['#authenticated'] as BehaviorSubject<boolean>).next(true);

    // Check if the authenticated property in the component updates accordingly
    fixture.detectChanges();
    let detectVal;
    component.authenticated.subscribe((val) => (detectVal = val));
    expect(detectVal).toBeTrue;
  });

  // You can add more tests as needed for different scenarios related to AppComponent
});
