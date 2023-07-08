import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UpdateTicketStatusComponent } from './update-ticket-status.component';
import { AppComponent } from 'src/app/app.component';

describe('UpdateTicketStatusComponent', () => {
  let component: UpdateTicketStatusComponent;
  let fixture: ComponentFixture<UpdateTicketStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      declarations: [UpdateTicketStatusComponent,AppComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UpdateTicketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
