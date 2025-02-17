import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button-open-add',
  imports: [],
  templateUrl: './button-open-add.component.html',
  styleUrl: './button-open-add.component.scss'
})
export class ButtonOpenAddComponent {
  type = input<'button' | 'submit'>('button')
}
