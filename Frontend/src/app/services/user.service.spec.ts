import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should register a user', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };

    userService.register(user).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/moviebooking/register');
    expect(req.request.method).toBe('POST');
    req.flush({}); // Simulate a successful response
  });

  it('should send forgot password request', () => {
    const user = { loginId: 'john@example.com' };

    userService.forgot(user).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/moviebooking/john@example.com/forgot');
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' }); // Simulate a successful response
  });

  it('should get all movies', () => {
   
    userService.allMovies().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/moviebooking/all');
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });

  it('search for a movie', () => {

    const movieName="movie1";
      userService.searchMovie(movieName).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/moviebooking/movies/search/movie1');
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });

  it('update ticket status for a movie', () => {

    const movieName="movie1";
      userService.updateTicketStatus(movieName).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/moviebooking/movie1/update');
    expect(req.request.method).toBe('PUT');
    req.flush({}); // Simulate a successful response
  });


  it('should delete a movie', () => {
    const movieName = 'Avengers';
    userService.deleteMovie(movieName).subscribe(response => {
      expect(response).toBeTruthy();
    });   

    const req = httpTestingController.expectOne(`http://localhost:8080/api/v1.0/moviebooking/Avengers/delete`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Success');
  });

  it('should book a ticket', () => {
    const user = { movieName: 'Avengers', name: 'John Doe' };
    userService.bookTicket(user).subscribe(response=>{
      expect(response).toBeTruthy();
    })

    const req = httpTestingController.expectOne(`http://localhost:8080/api/v1.0/moviebooking/Avengers/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    req.flush('Success');
  });

  it('should get all booked tickets for a movie', () => {
    const movieName = 'Avengers';

    userService.getallbookedtickets(movieName).subscribe(response => {
      expect(response).toEqual([{ id: 1, seat: 'A1' }, { id: 2, seat: 'B2' }]);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/v1.0/moviebooking/getallbookedtickets/Avengers`);
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, seat: 'A1' }, { id: 2, seat: 'B2' }]);
  });

});
