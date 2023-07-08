
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminGuard } from './admin.guard';
import { LoginService } from './login.service';

describe('AdminGuard', () => {
  let adminGuard: AdminGuard;
  let loginServiceMock: Partial<LoginService>;
  let routerMock: Partial<Router>;

  beforeEach(() => {
    loginServiceMock = {
      adminLoggedIn: jasmine.createSpy('adminLoggedIn')
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    adminGuard = TestBed.inject(AdminGuard);
  });

  it('should return true and allow activation when admin is logged in', () => {
    (loginServiceMock.adminLoggedIn as jasmine.Spy).and.returnValue(true);

    const canActivate: boolean = adminGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivate).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should return false and navigate to login page when admin is not logged in', () => {
    (loginServiceMock.adminLoggedIn as jasmine.Spy).and.returnValue(false);

    const canActivate: boolean = adminGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivate).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/api/v1.0/moviebooking/login']);
  });

});