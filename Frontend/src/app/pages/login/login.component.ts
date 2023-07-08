import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService:LoginService,private router:Router){}
  public user = {
    loginId: '',
    password:''
  }

  ngOnInit():void {}
  formSubmit(){
    let flag=false;
    if(this.user.loginId == ''|| this.user.loginId == null){
      alert("Enter Username !");
      flag=true;
    }
    if(this.user.password == ''|| this.user.password == null){
      alert("Enter password !");
      flag=true;
    }
    if(!flag){
      console.log(this.user)
      this.loginService.login(this.user).subscribe(
      (data:any)=>{
        //sucess
        console.log(JSON.stringify(data));
        this.loginService.setUsername(data.username);
        this.loginService.saveToken(data.accessToken);
        this.loginService.setRole(data.roles[0]);
        console.log("role from localstorage -"+this.loginService.getRole())
        console.log("username from localstorage -"+this.loginService.getUsername())
        console.log("token from localstorage -"+this.loginService.getToken())
        Swal.fire('Login Succesful',this.user.loginId+' is Login','success');
        if(this.loginService.getRole() == "admin"){
          this.router.navigate(['/api/v1.0/moviebooking/update']);
        }
        else if(this.loginService.getRole() == "user"){
          this.router.navigate(['/api/v1.0/moviebooking/all']);
        }
        else{
          this.loginService.logout();
        }
       
      },
      (error)=>{
        //failure
        console.log(error)
        Swal.fire('Invalid Credentials', 'Something went wrong while login!','error');
        }
      );
    }
  }
}
