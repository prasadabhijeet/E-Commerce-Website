import {Component, Input, OnInit} from '@angular/core';
import {Review, User} from '../models/models';
import {ProductService} from '../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  @Input() productId: string;
  @Input() buyer: User;
  model: Review = new Review();

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router, private notification: NotificationService) {
  }

  ngOnInit(): void {

  }

  onSubmit(f) {
    const review = f.value;
    console.log(review);
    review.buyer = this.buyer;
    console.log(review);
    this.productService.createReview(this.productId, review).subscribe(value => {
      console.log('Review created');
      this.notification.showSuccess("Review successfully sent!", "Review was sent");
    });
  }

}
