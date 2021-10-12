import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/model/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  constructor(private orderService:OrdersService) { }

  ngOnInit(): void {
    this.getAllUserOrders();
  }

  public orders: any;
  public order!: Orders;
  public allOrders : Orders[] = [];

  getAllUserOrders(){
    this.orderService.getAllOrders(this.orders).subscribe(
      (response: Orders[]) => {
        this.allOrders = response;
      }
    )
  }

  deliverProduct(product : Orders){
    this.orderService.getUpdateProduct(product).subscribe(
      (response:Orders)=> {
        this.order = response;
        this.getAllUserOrders();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
