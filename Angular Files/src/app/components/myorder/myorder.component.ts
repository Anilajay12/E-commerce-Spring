
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/model/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  public deliveredOrders : Orders[] = [];


  constructor(private orderservice:OrdersService) { }

  ngOnInit(): void {
    this.getAllDeliveredOrders();
  }
  public userId = localStorage.getItem('id');
  public status = true;

  dummy : any;
  


  getAllDeliveredOrders(){
    this.orderservice.getAllDeliveredOrders(this.dummy).subscribe(
      (response : Orders[]) => {
        this.deliveredOrders = response;
      }
    )
  }
}
