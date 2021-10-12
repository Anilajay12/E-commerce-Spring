import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Orders } from 'src/app/model/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orderrequests',
  templateUrl: './orderrequests.component.html',
  styleUrls: ['./orderrequests.component.css']
})
export class OrderrequestsComponent implements OnInit {

  public pendingOrders : Orders[] = [];


  constructor(private orderservice:OrdersService) { }

  ngOnInit(): void {
    this.getAllPendingOrders();
  }
  public userId = localStorage.getItem('id');
  public status = false;

  dummy : any;
  


  getAllPendingOrders(){
    this.orderservice.getAllPendingOrders(this.dummy).subscribe(
      (response : Orders[]) => {
        this.pendingOrders = response;
      }
    )
  }

}
