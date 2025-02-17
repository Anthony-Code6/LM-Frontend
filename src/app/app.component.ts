import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'legion-master-frontend';
  ToasterPosition = ToasterPosition;
}
