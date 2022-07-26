import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name: string = 'terryhycheng';
  isTask: boolean = true;

  constructor() {}

  onTask() {
    if (!this.isTask) this.isTask = true;
  }

  onFinished() {
    if (this.isTask) this.isTask = false;
  }
}
