import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public loginService:LoginService,private router:Router){}
  ngOnInit():void {}
  userLogout(){
    Swal.fire('Sign Out',this.loginService.getUsername()+' is log out','success');
    this.loginService.logout();
    this.router.navigate(["api/v1.0/moviebooking/home"]);
  }
  home(){
    this.router.navigate(['api/v1.0/moviebooking/home']);
  }
  dashboard(){
    this.router.navigate(['api/v1.0/moviebooking/update']);
  }
  search(){
    this.router.navigate(['api/v1.0/moviebooking/search']);
  }
  movies(){
    this.router.navigate(['api/v1.0/moviebooking/all']);
  }
  resetPassword(){
    this.router.navigate(['api/v1.0/moviebooking/forgot']);
  }
  login(){
    this.router.navigate(['api/v1.0/moviebooking/login']);
  }
}
