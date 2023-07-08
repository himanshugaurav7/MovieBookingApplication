import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  //login
  public login(user: any){
    return this.http.post('http://localhost:8080/api/v1.0/moviebooking/login',user)
  }

  //Storing token to local
  public saveToken(token: any){
    localStorage.setItem('token',token);
    return true;
  }
  //check user login token
  public checkToken(){
    let tokenStr=localStorage.getItem("token")
    if(tokenStr == null|| tokenStr == ''|| tokenStr == undefined){
      return false;
    }else{
      return true;
    }
  }
  //logout : clear token
  public logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userRole")
    localStorage.removeItem("movieToBook")
    localStorage.removeItem("movieName")
    localStorage.removeItem("seat")
    localStorage.removeItem("seatNumber")
    localStorage.removeItem("role")
    return true;
  }
  //get token
  public getToken(){
    return localStorage.getItem('token');
  }

  //set user to local
  public setUsername(username:any){
    localStorage.setItem('username',username);
  }
  //set _id
  public setId(id:any){
    localStorage.setItem('_id',id);
  }
  //set user role to local
  public setRole(role:string){
    localStorage.setItem('role',role.substring(5).toLowerCase())
  }
  //get user
  public getUsername(){
    let userStr = localStorage.getItem("username");
    if(userStr != null){
      return userStr;
    }
    else{
      this.logout();
      return null;
    }
  }
  //get user role
  public getRole(){
    return localStorage.getItem("role");
  }
  //check user is logged in
  public userLoggedIn(){
    if(this.getRole() == "user" && this.checkToken() && this.getUsername() != null ){
        return true;
    }
    return false;
  }
  //check admin is logged in
  public adminLoggedIn(){
    if(this.getRole() == "admin" && this.checkToken() && this.getUsername() != null ){
        return true;
    }
    return false;
  }
}
