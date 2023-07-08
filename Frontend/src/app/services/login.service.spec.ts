import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let loginService: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('should send login request', () => {
    const user = { username: 'john@example.com', password: 'password' };

    loginService.login(user).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/moviebooking/login');
    expect(req.request.method).toBe('POST');
    req.flush({}); 
  });

  it('should save token to local storage', () => {
    const token = 'sample-token';

    const result = loginService.saveToken(token);

    expect(result).toBeTrue();
    expect(localStorage.getItem('token')).toBe(token);
  });

  it('should check if token exists', () => {
    localStorage.setItem('token', 'sample-token');

    let result = loginService.checkToken();
    expect(result).toBeTrue();

    localStorage.removeItem('token');

    result = loginService.checkToken();
    expect(result).toBeFalse();
  });

  it('should clear token on logout', () => {
    localStorage.setItem('token', 'abcd1234');
    localStorage.setItem('username', 'john');
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('movieToBook', 'Avengers');
    localStorage.setItem('movieName', 'Avengers');
    localStorage.setItem('seat', 'A1');
    localStorage.setItem('seatNumber', '1');
    localStorage.setItem('role', 'admin');

    expect(loginService.logout()).toBeTrue();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
    expect(localStorage.getItem('userRole')).toBeNull();
    expect(localStorage.getItem('movieToBook')).toBeNull();
    expect(localStorage.getItem('movieName')).toBeNull();
    expect(localStorage.getItem('seat')).toBeNull();
    expect(localStorage.getItem('seatNumber')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });

  it('should get token from local storage', () => {
    const token = 'abcd1234';
    localStorage.setItem('token', token);

    expect(loginService.getToken()).toBe(token);
  });

  it('should set username to local storage', () => {
    const username = 'john';

    loginService.setUsername(username);
    expect(localStorage.getItem('username')).toBe(username);
  });

  it('should set _id to local storage', () => {
    const id = '12345';

    loginService.setId(id);
    expect(localStorage.getItem('_id')).toBe(id);
  });

  it('should set user role to local storage', () => {
    const role = 'ROLE_ADMIN';

    loginService.setRole(role);
    expect(localStorage.getItem('role')).toBe('admin');
  });

  it('should get username from local storage', () => {
    const username = 'john';
    localStorage.setItem('username', username);

    expect(loginService.getUsername()).toBe(username);
  });

  it('should get role from local storage', () => {
    const role = 'ROLE_USER';
    loginService.setRole(role)
    expect(loginService.getRole()).toBe('user');
  });
});
