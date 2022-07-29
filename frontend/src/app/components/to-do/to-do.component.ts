import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDo } from 'src/app/models/to-do.model';
import { AuthService } from 'src/app/services/auth.service';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit {
  toDos: ToDo[] = [];
  isTask: boolean = true;
  isLogin: boolean = false;
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private toDoService: ToDoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Need Change : Get the usrId from token
    this.authService.authCheck();
    if (this.authService.isLogin) {
      this.isLogin = this.authService.isLogin;
      const userId: number = this.authService.getToken().id;
      this.toDoService
        .getTodo(userId)
        .subscribe((res: ToDo[]) => (this.toDos = res));
      this.authService
        .watchLogin()
        .subscribe((value) => (this.isLogin = value));
      this.toDoService
        .todoWatch()
        .subscribe(() =>
          this.toDoService
            .getTodo(userId)
            .subscribe((res: ToDo[]) => (this.toDos = res))
        );
    } else {
      return;
    }
  }

  onTask() {
    if (!this.isTask) this.isTask = true;
  }

  onFinished() {
    if (this.isTask) this.isTask = false;
  }

  updateTodo(event: { id: number; status: boolean }) {
    this.toDoService
      .updateTodo(event.id, {
        isFinished: !event.status,
        token: localStorage.getItem('authToken')!,
      })
      .subscribe(() => this.toDoService.todoSub.next(null));
  }

  deleteTodo(id: number) {
    this.toDoService
      .deleteTodo(id, localStorage.getItem('authToken')!)
      .subscribe(() => this.toDoService.todoSub.next(null));
  }
}
