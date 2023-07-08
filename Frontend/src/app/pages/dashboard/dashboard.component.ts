import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private userService:UserService){}
  public movieName ="";
  public deleteMovieName ="";
  tickets : {
    position: number,
    loginId: string,
    movieName: string,
    theaterName: string,
    noOfTickets: number
    seatNumber: string[],
    }[] = [];
  ngOnInit():void {
    this.tickets = [];
  }
  onSubmitDelete(){
    console.log(" delete movie ="+this.deleteMovieName);
    if(this.deleteMovieName == '' || this.deleteMovieName == null){
      Swal.fire('No Input','Enter Movie Name','info');
    }
    else{
      this.userService.deleteMovie(this.deleteMovieName).subscribe(
      (data:any) =>{
        Swal.fire('Sucess',data,'success');
        console.log(data);
        this.deleteMovieName="";
      },
      (error:any) =>{
        Swal.fire('Movie not found!!','error');
        console.log("something went wrong!!"+JSON.stringify(error));
      }
      );
    }
  }
  onSubmitUpdate(){
    if(this.movieName == '' || this.movieName == null){
      Swal.fire('No Input','Enter Movie Name','info');
    }
    else{
      console.log(" update status = "+ this.movieName);
      this.userService.searchMovie(this.movieName).subscribe(
        (data:any) =>{
          let movie = ''
          console.log("from dashboard Componenet == "+data[0].movieName+" == "+JSON.stringify(data[0]._id));
          movie = data[0].movieName;
          this.userService.updateTicketStatus(data[0].movieName).subscribe(
            (data)=>{
              console.log(" data after updateTicketStatus() fun");
              Swal.fire('Updated',movie+' movie Status is Updated','success');
            },
            (error)=>{
              console.log(" Error occured after updateTicketStatus() fun !"+ JSON.stringify(error));
              Swal.fire('Error Occured','Something went wrong!!','error');
            }
          );
        },
        (error)=>{
          Swal.fire('Moive not found to update','error');
          console.log("from dashboard Componenet :"+error);
        }
      );
      this.movieName = ""
    }
  }
  public movieNameTicket = '';
  onSubmitViewTickets(){
    if(this.movieNameTicket != '' || this.movieNameTicket != undefined){
      this.userService.getallbookedtickets(this.movieNameTicket).subscribe(
        (data:any)=>{
          let count = data.length;
          let i=1
          while(i <= count){
            this.tickets.push({
              position: i, movieName: data[i-1].movieName, theaterName: data[i-1].theatreName, loginId: data[i-1].loginId,noOfTickets:data[i-1].noOfTickets,seatNumber:data[i-1].seatNumber
            });
            console.log("all the tickets of movie "+this.movieNameTicket);
            i++;
          }
          Swal.fire('','Displaying Booked Ticekets of '+this.movieNameTicket,'success')
        },
        (error)=>{
          console.log(error)
        }
      )
      this.tickets = [];
    }
    // this.movieNameTicket = ''
  }
  reset(){
    this.tickets = [];
    this.movieNameTicket = "";
  }
}
