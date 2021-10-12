import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  


  onLoginUser(loginForm: NgForm){
    
    this.userService.loginUser(loginForm.value).subscribe(
      (response : User) => {
        localStorage.setItem('id',response.id.toString());
        localStorage.setItem('token',response.email);
        localStorage.setItem('roles',response.role);
        
        alertify.success("Successfully Logged In");
        this.router.navigate(['home']);
      },
      (error : HttpErrorResponse) => {
        alertify.error("Invalid Credentials Try Again!!");
        this.router.navigate(['login']);
      }
    );
      
  }
}
