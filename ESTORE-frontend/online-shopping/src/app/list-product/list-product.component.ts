import {Component, OnInit} from '@angular/core';
import {Product} from '../models/models';
import {ProductService} from '../services/product.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.findAll().subscribe((res: HttpResponse<Product[]>) => {
      console.log(res);
      this.products = res.body;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

}
