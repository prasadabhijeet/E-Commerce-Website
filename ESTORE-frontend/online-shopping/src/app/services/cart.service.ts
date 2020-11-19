import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Product, ApiResponse, Cart} from '../models/models';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';
import {catchError, retry, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.apiUrl + 'cart';
  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {
  }

  public getCart() {
    return this.http.get<Cart>(this.apiUrl, {observe: 'response', withCredentials: true})
      .pipe(retry(3), catchError(this.handleError));

  }

  public addOnCart(id: string) {
    return this.http.get<any>(this.apiUrl + '/add/' + id, {observe: 'response', withCredentials: true})
      .pipe(retry(3), catchError(this.handleError));

  }

  public clear() {
    return this.http.get<Cart>(this.apiUrl + '/clear', {observe: 'response', withCredentials: true})
      .pipe(retry(3), catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      alert(error.error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
