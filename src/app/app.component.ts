import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { userDetails } from './user-module/user.module';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userDetails:userDetails =  {
    userName: "",
    email: "",
    password: "",
  } 
  login:boolean = true;
  signup:boolean = false;
  checkUser:any;
  localUserData:userDetails [] = [];
  constructor(){
    localStorage.clear();
  }
  ngOnInit(){
  
   }
  switchForm(){
    this.login = !this.login;
    this.signup = !this.signup;
    this.userDetails =  {
      userName: "",
      email: "",
      password: "",
    }
  } 
 ifUserExists(){
     const checkLocalData = localStorage.getItem("Local-User-Data");
     if(checkLocalData){
      this.localUserData = JSON.parse(checkLocalData);
      this.checkUser = this.localUserData.find((cld) => cld.email == this.userDetails.email || cld.password == this.userDetails.password);
    }
     
   }

  registerUser(){
  this.ifUserExists();
  if(this.checkUser == undefined){
    this.localUserData.push(this.userDetails);
    localStorage.setItem("Local-User-Data", JSON.stringify(this.localUserData));
    alert("Registration Successfull");
    this.userDetails =  {
      userName: "",
      email: "",
      password: "",
    } 
   
  }
    else{alert( 'Email or Password already in use');console.log(this.checkUser)};
  }
  loginUser(){
   
    const localData = localStorage.getItem("Local-User-Data");
    if(localData){
      this.localUserData = JSON.parse(localData);
      const userFound = this.localUserData.find(ld => ld.email == this.userDetails.email && ld.password == this.userDetails.password); 
      if(userFound != undefined){
        alert("Login Successfull");
        this.userDetails =  {
          userName: "",
          email: "",
          password: "",
        }
      }
      else{alert("User not found");
       
      }; 
      }
      else{
        alert("User not found");
      }
  }


  
}
