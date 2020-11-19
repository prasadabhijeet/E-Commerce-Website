import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';
import { NotificationService } from 'src/app/services/notification.service';
import { ApprovalService } from 'src/app/services/approval.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: Array<User> = [];

  constructor(private approvalService: ApprovalService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {

    this.approvalService.getSellers().subscribe(res => {
      this.users = res.result;
    },
    err => {
      this.notificationService.showError(err.error.result.err, 'Error');
     });
  }

  approveUser(user: User){
    this.approvalService.approveUser(user._id, user.isApprovedUser = 1).subscribe(res => {
      this.users = res.result;
      this.notificationService.showSuccess(res.message, 'Success');
      this.getUsers();
    },
    err => {
      this.notificationService.showError(err.error.result.err, 'Error');
     });
  }

}
