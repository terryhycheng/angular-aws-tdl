import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss'],
})
export class LoginBoxComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    reconfirm: new FormControl(''),
  });
  isRegister: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.watchLogin().subscribe();
  }

  onLogin() {
    this.isRegister = false;
  }

  onRegister() {
    this.isRegister = true;
  }

  login() {
    const authData = {
      username: this.authForm.value.username,
      password: this.authForm.value.password,
    };
    console.log(authData);
    this.authService.login();
    this.authForm.reset();
    this.router.navigate(['']);
  }
}
