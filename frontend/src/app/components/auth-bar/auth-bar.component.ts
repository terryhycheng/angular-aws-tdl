import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-bar',
  templateUrl: './auth-bar.component.html',
  styleUrls: ['./auth-bar.component.scss'],
})
export class AuthBarComponent implements OnInit {
  name: string = '';
  isLogin: boolean = this.authService.isLogin;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.watchLogin().subscribe((value) => (this.isLogin = value));
    const token = this.authService.getToken();
  }

  logout() {
    this.authService.logout();
  }
}
