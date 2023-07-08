import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  constructor(private userService:UserService,private router:Router){}

  public clicked : boolean[] = [];
  public onToggle(i:number,value:string): void {
    // Switch between red and green.
    if(this.clicked[i]== true){
      this.clicked[i] = false;
      this.temp[i] = "$"
    }
    else{
      this.clicked[i] = true;
      if(!this.temp.includes(value))
      this.temp[i] =value;
    }
 }
  public temp: string[] = []
  public user = {
    loginId: localStorage.getItem("username"),
    movieName : localStorage.getItem("movieToBook"),
    theatreName: "",
    noOfTickets: 0,
    seatNumber: this.temp,
  }

  ngOnInit():void {
    this.userService.searchMovie(this.user.movieName).subscribe(
      (data:any)=>{
        this.user.theatreName = data[0].theatreName;
        this.user.movieName = data[0].movieName;
      },
      (error)=>{
        console.log("Something went wrong!");
      }
    )
  }

  formSubmit(){
    let seats: any = [];
    this.temp.forEach(function (value : string){
        if(value != "$" && value != "")
          seats.push(value);
    });
    this.user.seatNumber = seats;
    this.user.noOfTickets = this.user.seatNumber.length;
    if(this.user.seatNumber.length != 0){
      console.log("movie Name = "+this.user.movieName);
      console.log("theatre Name = "+this.user.theatreName);
      console.log("no of tikets ="+this.user.noOfTickets);
      console.log("Login Id = "+this.user.loginId);
      console.log("seatNumber = "+this.user.seatNumber);
      console.log("Submitted");
      this.userService.bookTicket(this.user).subscribe(
        (data: any)=>{
          Swal.fire('Booked',data,'success');
          console.log(data);
          this.router.navigate(['/api/v1.0/moviebooking/all']);
        },
        (error: any)=>{
          Swal.fire('Error Occured',error.error ,'info');
          console.log(JSON.stringify(error));
          this.router.navigate(['/api/v1.0/moviebooking/add']);
        }
      );
      this.clicked = [];
      this.user.seatNumber = [];
      this.temp = [];
    }
    else{
      Swal.fire('Provide Input','Select Seats of the Movies','info')
    }
  }
  remove(){
    this.clicked = [];
    this.user.seatNumber = [];
    this.temp = []
  }
}
