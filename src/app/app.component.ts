import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  Signup_data: any =  {
    Username: "",
    Email: "",
    Password: "",
    Role:"Admin"
  } 
  Login:boolean = true;
  Signup:boolean = false;
  stored_value : any;
  Signup_user_data: any [] = [];
  Check_Signup_user_data: any [] = [];
  Switch_form(){
    this.Login = !this.Login;
    this.Signup = !this.Signup;
  } 
 If_user_exists(){
     const check_local_data = localStorage.getItem("Signup_user_data");
     if(check_local_data){
      this.Check_Signup_user_data = JSON.parse(check_local_data);
      this.stored_value = this.Check_Signup_user_data.find((cld) => cld.Email == this.Signup_data.Email || cld.Password == this.Signup_data.Password);
    }
     
   }

   ngOnInit(){
    const local_data_null_check = localStorage.getItem("Signup_user_data");
    if(local_data_null_check != null){
      this.Signup_user_data = JSON.parse(local_data_null_check);
    }

   }

  Signup_data_store(){
  this.If_user_exists();
  const local_data = localStorage.getItem("Signup_user_data");
  if(this.Signup && this.stored_value == undefined){
    this.Signup_user_data.push(this.Signup_data);
    localStorage.setItem("Signup_user_data", JSON.stringify(this.Signup_user_data));
    this.Signup_data =  {
     Username: "",
     Email: "",
     Password: "",
     Role:"Admin"
   } 
   
  }
  else if(local_data && this.Login){
    this.Signup_user_data = JSON.parse(local_data);
    const user_found = this.Signup_user_data.find(ld => ld.Email == this.Signup_data.Email && ld.Password == this.Signup_data.Password); 
    if(user_found != undefined){
      alert("Login");
    }
    else{alert("user not found")}; 
    }
    else{alert( 'Email or Password already in use')};
  }


  
}
