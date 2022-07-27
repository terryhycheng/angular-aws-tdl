import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const data = {
      title: this.newTodo.value.title,
      task: this.newTodo.value.task,
    };
    console.log(data);
    this.newTodo.reset();
    this.router.navigate(['']);
  }
}
