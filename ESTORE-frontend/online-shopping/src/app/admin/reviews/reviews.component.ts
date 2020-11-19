import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { NotificationService } from 'src/app/services/notification.service';
import { ApprovalService } from 'src/app/services/approval.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  products: Array<any> = [];

  constructor(private approvalService: ApprovalService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {

    this.approvalService.getReviews().subscribe(res => {
      this.products = res.result;
    },
    err => {
      this.notificationService.showError(err.error.result.err, 'Error');
     });
  }

  approveReview(product: any, review: any){
    this.approvalService.approveReview(product._id, review.buyer).subscribe(res => {
      this.notificationService.showSuccess(res.message, 'Success');
      this.getReviews();
    },
    err => {
      this.notificationService.showError(err.message, 'Error');
     });
  }

}

