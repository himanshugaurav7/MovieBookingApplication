import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';
// @NgModule({
//   imports: [],
//   exports: [AppComponent],
//   declarations: [AppComponent],
//   providers: [],
// })
@Component({
  selector: 'app-update-ticket-status',
  templateUrl: './update-ticket-status.component.html',
  styleUrls: ['./update-ticket-status.component.css']
})
export class UpdateTicketStatusComponent {
  constructor(private userService:UserService,private router:Router){}
  ngOnInit() : void {}
  public clicked: {[key: number]: boolean} = {};
  public onToggle(i:number,value:string): void {
    // Switch between red and green.
    this.clicked[i] = !this.clicked[i];
    alert("value = "+ value);
 }
}

