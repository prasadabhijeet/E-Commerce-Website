import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { IService, ApiResponse } from '../models/models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSellers(): Observable<ApiResponse> {
    const isApproved = 0;
    return this.http.get<ApiResponse>(this.apiUrl + 'users/SellerByStatus/' + isApproved)
      .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }

  approveUser(userId: String, isApprove: Number): Observable<ApiResponse> {
    const ApprovedUser = { "ApprovedUser": isApprove };
    return this.http.put<ApiResponse>(this.apiUrl + 'users/approveUser/' + userId, ApprovedUser)
    .pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

  getReviews(): Observable<ApiResponse> {
    const isApproved = 0;
    return this.http.get<ApiResponse>(this.apiUrl + 'products/reviews')
      .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }

  approveReview(prodctId: String, userId: String): Observable<ApiResponse> {
    const ApproveReview = { "prodctId": prodctId, "userId": userId };
    return this.http.put<ApiResponse>(this.apiUrl + 'products/approve-review', ApproveReview)
    .pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }

}
