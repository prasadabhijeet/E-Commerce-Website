import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {OrderStatus, Product} from '../models/models';
import {ProductService} from '../services/product.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.productService.findAllBySeller().subscribe((res: HttpResponse<Product[]>) => {
      this.products = res.body;
    });
  }

  delete(id) {
    if(window.confirm('Are you sure?')) {
      this.productService.delete(id).subscribe(res => {
        this.notificationService.showSuccess(res, 'Success');
        console.log(res)
        this.load();
      },
      err=> {
        this.notificationService.showError(err.error.message, 'Error');
      });
    }
  }

}
