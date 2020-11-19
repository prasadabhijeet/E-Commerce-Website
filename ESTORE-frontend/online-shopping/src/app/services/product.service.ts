import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Product, Review} from '../models/models';
import {Router} from '@angular/router';
import {catchError, retry, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + 'products/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient, private router: Router) {
  }

  public findAll() {
    return this.http.get<Product[]>(this.apiUrl, {observe: 'response'});
  }

  public findAllBySeller() {
    return this.http.get<Product[]>(this.apiUrl + 'seller', {observe: 'response'});
  }

  public findById(id: string) {
    return this.http.get<Product>(this.apiUrl + id, {observe: 'response'});
  }

  public update(id: string, product: Product) {
    return this.http.put<Product>(this.apiUrl + id, JSON.stringify(product), this.httpOptions);
  }

  public create(product: Product){
    return this.http.post<Product>(this.apiUrl, JSON.stringify(product), this.httpOptions);
  }

  public delete(id: string){
    return this.http.delete<Product>(this.apiUrl + id);
  }

  public createReview(id: string, review: Review) {
    return this.http.put<Product>(this.apiUrl + 'reviews/add/' + id, JSON.stringify(review), this.httpOptions);
  }


}
