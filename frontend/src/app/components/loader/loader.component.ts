import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="container">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
      Loading...
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
