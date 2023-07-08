import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  constructor(private userService:UserService){}
  public user = {
    loginId: '',
    password:''
  }

  ngOnInit():void {}

  formSubmit(){
    if(this.user.loginId == ''|| this.user.loginId == null){
      alert("Enter Username !");
    }
    if(this.user.password == ''|| this.user.password == null || this.user.password.length < 7){
      alert("Enter valid password !");
    }
    console.log(this.user)
    this.userService.forgot(this.user).subscribe(
      (data:any)=>{
        //sucess
        console.log(data);
        Swal.fire('Success','Password for user '+this.user.loginId +' is Changed','success');
      },
      (error)=>{
        //failure
        console.log(error)
        Swal.fire('Oops!', 'Something went wrong, password is not changed!','error');
      }
    );
  }
}
