import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss'],
})
export class LoginBoxComponent implements OnInit {
  isLogin: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  onLogin() {
    if (!this.isLogin) this.isLogin = true;
  }

  onRegister() {
    if (this.isLogin) this.isLogin = false;
  }
}
