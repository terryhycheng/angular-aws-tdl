import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit {
  isTask: boolean = true;
  isLogin: boolean = this.authService.isLogin;
  isError: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.watchLogin().subscribe((value) => (this.isLogin = value));
  }

  onTask() {
    if (!this.isTask) this.isTask = true;
  }

  onFinished() {
    if (this.isTask) this.isTask = false;
  }
}
