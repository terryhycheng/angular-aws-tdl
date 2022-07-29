import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from 'src/app/models/authData.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss'],
})
export class LoginBoxComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    password: new FormControl('', Validators.required),
  });
  regForm = new FormGroup({
    username: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    password: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.email, Validators.required])
    ),
  });
  isRegister: boolean = false;
  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.watchLogin().subscribe();
    this.authService.authCheck();
    this.authService.isLogin && this.router.navigate(['']);
  }

  onLogin() {
    this.isRegister = false;
  }

  onRegister() {
    this.isRegister = true;
  }

  onSubmit() {}

  login() {
    const authData: AuthData = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
    this.authService.login(authData);
    if (!localStorage.getItem('authToken')) this.isError = true;
    this.loginForm.reset();
  }

  register() {
    const authData: AuthData = {
      username: this.regForm.value.username!,
      password: this.regForm.value.password!,
      email: this.regForm.value.email!,
    };
    this.authService.register(authData);
    this.regForm.reset();
  }

  cancelError() {
    this.isError = false;
  }
}
