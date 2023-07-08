import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SearchMovieComponent } from './search-movie.component';

describe('SearchMovieComponent', () => {
  let component: SearchMovieComponent;
  let fixture: ComponentFixture<SearchMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      declarations: [ SearchMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
