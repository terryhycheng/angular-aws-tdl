import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { LoginBoxComponent } from './components/login-box/login-box.component';
import { AddTaskBoxComponent } from './components/add-task-box/add-task-box.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MessageBoxComponent,
    LoginBoxComponent,
    AddTaskBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
