import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserGuard } from './user.guard';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

describe('UserGuard', () => {
  let userGuard: UserGuard;
  let loginServiceMock: Partial<LoginService>;
  let routerMock: Partial<Router>;

  beforeEach(() => {
    loginServiceMock = {
      userLoggedIn: jasmine.createSpy('userLoggedIn')
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        UserGuard,
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    userGuard = TestBed.inject(UserGuard);
  });

  it('should return true and allow activation when user is logged in', () => {
    (loginServiceMock.userLoggedIn as jasmine.Spy).and.returnValue(true);

    const canActivate: boolean = userGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivate).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should return false, navigate to login page, and display a message when user is not logged in', () => {
    (loginServiceMock.userLoggedIn as jasmine.Spy).and.returnValue(false);

    const canActivate: boolean = userGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivate).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/api/v1.0/moviebooking/login']);
    expect(Swal.fire).toHaveBeenCalledWith('Login required', 'To Book Movie Login First', 'info');
  });

});
