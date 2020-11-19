import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User, Order } from '../models/models';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../services/notification.service';
import { HttpResponse } from '@angular/common/http';
import html2canvas from 'html2canvas'; 
import * as jspdf from 'jspdf';  
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @ViewChild('contentToConvert', {static: false}) contentToConvert: ElementRef;

  userModel: User = new User();
  userLoggedIn: boolean = false;
  order: Order = new Order();
  orders: Order[] = new Array();
  
  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private orderService: OrderService, 
    private notificationService: NotificationService,) { 

      if(authService.getLoggedInUserEvent)
    authService.getLoggedInUserEvent.subscribe(user => this.checkLoggedInUser(user));
    }

  ngOnInit(): void {

    this.orders = new Array();
    this.userModel = this.authService.getLoggedInUser();
    this.checkLoggedInUser(this.userModel);

    this.orderService.GetByUser().subscribe((res: HttpResponse<Order[]>) => {
      this.orders = res.body;
    });

  }

  printReceipt() {
    const doc = new jspdf();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.contentToConvert.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 208,
      'elementHandlers': specialElementHandlers
    });
    let guid = this.createGuid(); 
    doc.save('../reports/' + guid + '.pdf');
  }

  createGuid(){  
    function S4() {  
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
    }  
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
 }  
   
 

  checkLoggedInUser(user: User){    
    if(user){
      this.userLoggedIn = true;
    }
  }

}
