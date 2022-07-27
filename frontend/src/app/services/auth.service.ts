import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: boolean = false;
  private loginSub: Subject<any> = new Subject();

  constructor() {}

  watchLogin(): Observable<boolean> {
    return this.loginSub.asObservable();
  }

  login() {
    this.isLogin = true;
    console.log('1');
    this.loginSub.next(this.isLogin);
  }

  logout() {
    this.isLogin = false;
    this.loginSub.next(this.isLogin);
  }
}
