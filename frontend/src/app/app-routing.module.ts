import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskBoxComponent } from './components/add-task-box/add-task-box.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginBoxComponent } from './components/login-box/login-box.component';
import { ToDoComponent } from './components/to-do/to-do.component';

const routes: Routes = [
  { path: '', component: ToDoComponent },
  { path: 'auth', component: LoginBoxComponent },
  { path: 'create', component: AddTaskBoxComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
