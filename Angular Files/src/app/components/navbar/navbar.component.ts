import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
declare let alertify: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private cartservice:CartService) { }

  public totalItem : number = 0;

  ngOnInit(): void {
    this.cartservice.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }

  loggedIn(){
    return localStorage.getItem('token');
  }

  loggedUser = localStorage.getItem('roles');

  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('id');
    this.router.navigate(['login']);
    alertify.success('Successfully Logged Out');

  }

}
