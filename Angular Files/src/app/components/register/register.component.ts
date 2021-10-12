import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
declare let alertify: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onRegister(registerForm: NgForm){
    console.log(registerForm.value);
    const result = this.validateEmail(registerForm.value.email);
    if(!result){
      alertify.error('Enter valid email id');
    }
    else{
      if(registerForm.value.password !== registerForm.value.confirmpass){
        alertify.error("password doesn't match");
      }
      else if(registerForm.value.password.length < 8){
        alertify.error("password length must be 8digit length");
      }
      else{
        
        
        
        this.userService.addUser(registerForm.value).subscribe(
          (response : User) => {
            if(response.email != null){
              this.router.navigate(['login']);
              alertify.success("Account Registered Successfully");
            }
          },
          (error : HttpErrorResponse) => {
            alertify.error("Email Id Already Exists!!");
            this.router.navigate(['register']);
          }
        );
        
      }
    }
  }


  validateEmail(email: string){
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }
 
}
