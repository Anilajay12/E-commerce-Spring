import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Orders } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  private apiUrl =environment.apiBaseUrl;
  public userId = localStorage.getItem('id');
  public pending = false;
  public delivered = true;

  getAllPendingOrders(orders: any):Observable<Orders[]>{
    return this.http.post<Orders[]>(`${this.apiUrl}/orders/${this.userId}/${this.pending}`,orders);
  }

  getAllDeliveredOrders(orders: any):Observable<Orders[]>{
    return this.http.post<Orders[]>(`${this.apiUrl}/orders/${this.userId}/${this.delivered}`,orders);
  }


  getAllOrders(orders:any):Observable<Orders[]>{
    return this.http.post<Orders[]>(`${this.apiUrl}/orders/${this.pending}`,orders);
  }

  getUpdateProduct(order: Orders): Observable<Orders>{
    return this.http.put<Orders>(`${this.apiUrl}/manageOrder`,order);
  }
}
