import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Orders } from 'src/app/model/order';
import { CartService } from 'src/app/services/cart.service';
declare let alertify: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  public products : any = [];
  public product : any = [];
  
  public cartProducts : Orders[] = [];
  public grandTotal !: number;
  orders: Orders[] = [];
  constructor(private cartService : CartService,private router:Router) { }

  public productName : string = "";
  public price : string = "";
  public quantity : string = "";
  public total : string = "";
  public description : string = "";  
  re!: string;
  reg!: RegExp;
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
        
        this.productName = JSON.stringify(this.products[0].title);
        this.re=///gi
        this.productName=this.productName.replace(this.re," ");
        this.price = JSON.stringify(this.products[0].price);
        this.description = JSON.stringify(this.products[0].description);
        this.description=this.description.replace(this.re," ");
        this.quantity = JSON.stringify(this.products[0].quantity);
        this.total = JSON.stringify(this.products[0].total);
        this.reg=/"/gi;
        
        this.productName=this.productName.replace(this.reg," ");
        this.description=this.description.replace(this.reg," ");

        this.reg=/\s/gi;
        this.productName=this.productName.replace(this.reg,"");
        this.description=this.description.replace(this.reg,"");
    }
    
    )
    
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  placeOrder(order: NgForm){
    this.cartService.placeOrder(order.value).subscribe(
      (response : Orders) => {
        alertify.success("Your Order Placed Successfully");
        this.emptycart();
      }
    )
  }

}
