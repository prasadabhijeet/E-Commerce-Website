import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {OrderService} from '../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../models/models';
import html2canvas from 'html2canvas'; 
import * as jspdf from 'jspdf';  
@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  @ViewChild('contentToConvert', {static: false}) contentToConvert: ElementRef;
  order: Order = new Order();
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.orderService.GetById(id).subscribe(res => {
      this.order = res.result;
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

}
