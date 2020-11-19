import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInfo, User, ApiResponse, Roles } from '../models/models';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedInUserEvent: EventEmitter<any> = new EventEmitter();
  private apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService ) { }

  login(loginInfo: LoginInfo, ischeckOutPage: boolean) {
    let body = { "username": loginInfo.username, "password": loginInfo.password };
    this.http.post<ApiResponse>(this.apiUrl + 'signin', body, { responseType: 'json' })
    .subscribe(
      res => {
      if (res.status === 200) {
        if(res.result.user.isApprovedUser == 1)
        {
          this.setSession(res.result);
          if(ischeckOutPage){
            this.router.navigate(['checkout']);
          } else{
            this.router.navigate(['home']);
          }
          
        }
        else{
          this.logout();
          this.notificationService.showError('Your account is not approved yet', 'Error');
        }
         
      }
      else {
        this.notificationService.showError('Invaild username or password!', 'Error');
      }
    },
      error => {
          this.getLoggedInUserEvent.emit(null);
          this.notificationService.showError(error.error.result.err, 'Error');
      });
  }

  signUp(user: User) {

    this.http.post<ApiResponse>(this.apiUrl + 'signup', user)
    .subscribe(
      res => {
        if(res.status == 200) {
          this.setSession(res.result);
          this.notificationService.showSuccess('Registration successful', 'Success');
          this.router.navigate(['login']);
        }
      },
      error => {
          this.notificationService.showError(error.error.result.err, 'Error');
      });
  }

  private setSession(authResult: any) {
    this.setLoggedInUser(authResult.user);
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expiresIn', authResult.expiresIn);
    this.getLoggedInUserEvent.emit(authResult.user);
  }
  ngOnDestroy() {
    document.body.className = "";
  }

  getExpiration() {
    const expiration: string = localStorage.getItem("expiresIn") || '';
    const expiresAt = expiration && JSON.parse(expiration);
    return new Date(expiresAt);
  }

  logout() {
    this.getLoggedInUserEvent.emit(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    this.removeLoggedInUser();
  }

  setLoggedInUser(userParam: any) {
      let user: User = new User();
          user = userParam;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser(): User {
    if (localStorage['loggedInUser']) {
      return <User>JSON.parse(localStorage['loggedInUser']);
    }
    else {
      this.logout();
      return null;
    }
  }

  removeLoggedInUser() {
    window.localStorage.removeItem('loggedInUser');
  }

  getToken(): String {
    if (localStorage['token']) {
      return window.localStorage['token'];
    }
    else {
      this.logout();
      return null;
    }
  }

  destroyToken() {
    window.localStorage.removeItem('token');
  }

  public updateUser(id: string, user: User) {
    return this.http.put<User>(this.apiUrl + 'users/' + id, JSON.stringify(user), this.httpOptions);
  }

}
