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
  isLogin: boolean = this.authService.isLogin;
  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private toDoService: ToDoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Need Change : Get the usrId from token
    this.toDoService.getTodo(4).subscribe((res: ToDo[]) => (this.toDos = res));
    this.authService.watchLogin().subscribe((value) => (this.isLogin = value));
    this.toDoService
      .todoWatch()
      .subscribe(() =>
        this.toDoService
          .getTodo(4)
          .subscribe((res: ToDo[]) => (this.toDos = res))
      );
    this.authService.authCheck();
    !this.authService.isLogin && this.router.navigate(['auth']);
  }

  onTask() {
    if (!this.isTask) this.isTask = true;
  }

  onFinished() {
    if (this.isTask) this.isTask = false;
  }

  updateTodo(event: { id: number; status: boolean }) {
    this.toDoService
      .updateTodo(event.id, { isFinished: !event.status })
      .subscribe(() => this.toDoService.todoSub.next(null));
  }

  deleteTodo(id: number) {
    this.toDoService
      .deleteTodo(id)
      .subscribe(() => this.toDoService.todoSub.next(null));
  }
}
