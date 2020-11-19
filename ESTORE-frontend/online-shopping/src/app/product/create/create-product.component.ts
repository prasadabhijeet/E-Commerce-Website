import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/models';
import {HttpResponse} from '@angular/common/http';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  model: Product = new Product();
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(f) {
    this.productService.create(f.value).subscribe(value => {
      console.log('Product created');
      this.router.navigate(['seller/products']);
    });
  }

}
