import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthData } from '../models/authData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: boolean = false;
  serverUrl: string = 'http://localhost:5000';
  private loginSub: Subject<any> = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  watchLogin(): Observable<boolean> {
    return this.loginSub.asObservable();
  }

  authCheck() {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isLogin = true;
        this.loginSub.next(this.isLogin);
        this.router.navigate(['']);
      }
    } catch (error) {
      this.isLogin = false;
      this.loginSub.next(this.isLogin);
      this.router.navigate(['auth']);
    }
  }

  login(authData: AuthData) {
    this.http
      .post<{ token: string }>(`${this.serverUrl}/login`, authData)
      .subscribe(
        (res) => {
          localStorage.setItem('authToken', res.token);
          this.isLogin = true;
          this.loginSub.next(this.isLogin);
          this.router.navigate(['']);
        },
        (error) => {}
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLogin = false;
    this.router.navigate(['']);
    this.loginSub.next(this.isLogin);
  }

  getToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const userData = JSON.parse(window.atob(token.split('.')[1]));
      return userData;
    } else {
      return null;
    }
  }

  register(authData: AuthData) {
    this.http
      .post<{ token: string }>(`${this.serverUrl}/register`, authData)
      .subscribe(
        (res) => {
          localStorage.setItem('authToken', `${res.token}`);
          this.isLogin = true;
          this.loginSub.next(this.isLogin);
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
