import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-add-task-box',
  templateUrl: './add-task-box.component.html',
  styleUrls: ['./add-task-box.component.scss'],
})
export class AddTaskBoxComponent implements OnInit {
  newTodo = new FormGroup({
    title: new FormControl('', Validators.required),
    task: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private toDoService: ToDoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    !this.authService.isLogin && this.router.navigate(['auth']);
  }

  onSubmit() {
    const data = {
      title: this.newTodo.value.title!,
      task: this.newTodo.value.task!,
      userId: this.authService.getToken().id,
      token: localStorage.getItem('authToken'),
    };
    this.toDoService.createTodo(data).subscribe();
    this.newTodo.reset();
    this.router.navigate(['']);
  }
}
