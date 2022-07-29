import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToDo } from '../models/to-do.model';

type CreateTodoBody = {
  title: String;
  task: String;
  userId: Number;
};

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  serverUrl: string = `${environment.apiUrl}/todo`;
  todoSub = new Subject();

  constructor(private http: HttpClient) {}

  todoWatch() {
    return this.todoSub.asObservable();
  }

  getTodo(userId: number) {
    return this.http.get<ToDo[]>(`${this.serverUrl}/${userId}`);
  }

  createTodo(body: CreateTodoBody) {
    return this.http.post<ToDo>(this.serverUrl, body);
  }

  updateTodo(toDoId: number, body: { isFinished: boolean; token: string }) {
    return this.http.patch<ToDo>(`${this.serverUrl}/${toDoId}`, body);
  }

  deleteTodo(toDoId: number, token: string) {
    return this.http.delete<ToDo>(`${this.serverUrl}/${toDoId}`, {
      body: { token: token },
    });
  }
}
