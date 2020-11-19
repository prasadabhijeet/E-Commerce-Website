import { Component, OnInit } from '@angular/core';
import {Order, OrderStatus, Product} from '../models/models';
import {OrderService} from '../services/order.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {
  orders: Order[];
  orderStatus = OrderStatus;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.orderService.getSellerOrders().subscribe((res: HttpResponse<Order[]>) => {
        this.orders = res.body;
      }
    );
  }

  cancel(id){
    if(window.confirm('Are you sure?')){

      this.orderService.Put(id, {status: OrderStatus.CANCELED}).subscribe(res => {
        this.load();
      });
    }
  }

  ship(id){
    if(window.confirm('Are you sure?')){

      this.orderService.Put(id, {status: OrderStatus.SHIPPED}).subscribe(res => {
        this.load();
      });
    }
  }

  deliver(id){
    if(window.confirm('Are you sure?')){

      this.orderService.Put(id, {status: OrderStatus.DELIVERED}).subscribe(res => {
        this.load();
      });
    }
  }

}
