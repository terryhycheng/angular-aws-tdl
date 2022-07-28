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
  authForm = new FormGroup({
    username: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    password: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.email),
  });
  isRegister: boolean = false;

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

  login() {
    const authData: AuthData = {
      username: this.authForm.value.username!,
      password: this.authForm.value.password!,
    };
    if (this.authForm.value.email) authData.email = this.authForm.value.email;
    //Send to server
    console.log(authData);
    //Check login status
    this.authService.login(authData);
    this.authForm.reset();
  }
}
