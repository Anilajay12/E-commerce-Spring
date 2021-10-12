import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
declare let alertify: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const userid = Number(localStorage.getItem('id'));
    this.findUser(userid);
  }


  public userProfile!: User;

  findUser(id: number) {
    this.userService.findUser(id).subscribe(
      (response: User) => {
        this.userProfile = response;
      },
      (error: HttpErrorResponse) => {
        alertify.error("Invalid Credentials Try Again!!");
        this.router.navigate(['login']);
      }
    );

  }




  updateProfile(profile: NgForm) {
    this.userService.updateUser(profile.value).subscribe(
      (response: User) => {
        alertify.success('Profile updated Successfully');
        this.userProfile = response;
        this.router.navigate(['profile']);
        profile.reset();
      },
      (error: HttpErrorResponse) => {
        alertify.error("There is a some issue please try again");
        this.router.navigate(['profile']);
      })
  }


}











