import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [SnackBarService, { provide: MatSnackBar, useValue: spy }],
    });
    service = TestBed.inject(SnackBarService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snack bar with error message and default action', () => {
    const errorMessage = 'Something went wrong!';
    const expectedAction = 'Ok';
    const config: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    };

    service.error(errorMessage);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      errorMessage,
      expectedAction,
      config
    );
  });

  it('should open a snack bar with error message, custom action, and custom configuration', () => {
    const errorMessage = 'Error message';
    const customAction = 'Retry';
    const customConfig: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    };

    service.error(errorMessage, customAction, customConfig);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      errorMessage,
      customAction,
      customConfig
    );
  });
});
