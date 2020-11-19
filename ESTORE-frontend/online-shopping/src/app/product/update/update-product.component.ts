import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/models';
import {HttpResponse} from '@angular/common/http';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  model: Product = new Product();
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.findById(id).subscribe((res: HttpResponse<Product>) => {
      console.log(res);
      this.model = res.body;
    });
  }

  onSubmit(f) {
    this.productService.update(this.model._id, f.value).subscribe(res => {
      this.route.navigate(['seller/products']);
    });
  }

}
