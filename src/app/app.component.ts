import { Component } from '@angular/core';
declare var $: any;
declare function appInit([]): any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Julio Shop';
  constructor() {
    setTimeout(() => {
      appInit($);
    }, 50); 
  }
}
