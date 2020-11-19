import { Component, OnInit } from '@angular/core';
import {Order, OrderStatus} from '../models/models';
import {OrderService} from '../services/order.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './buyer-orders.component.html',
  styleUrls: ['./buyer-orders.component.css']
})
export class BuyerOrdersComponent implements OnInit {
  orders: Order[];
  orderStatus = OrderStatus;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.orderService.getBuyerOrders().subscribe((res: HttpResponse<Order[]>) => {
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

}
