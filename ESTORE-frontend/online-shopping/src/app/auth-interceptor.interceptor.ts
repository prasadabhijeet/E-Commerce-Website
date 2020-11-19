import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';
import {User} from './models/models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const idToken = localStorage.getItem("token");
    if (idToken)
    request = request.clone({headers: request.headers.set("Authorization","Bearer " + idToken)});
    return next.handle(request).pipe(
    catchError(error => {
    // Checking if it is an Authentication Error (401)
    if (error.status === 401) {
    this.notificationService.showError('Access Denied', 'Error');
    // <Log the user out of your application code>
    this.router.navigate(['login']);
    return throwError(error);
    }
    // If it is not an authentication error, just throw it
    return throwError(error);
    })
    );
  }
}
