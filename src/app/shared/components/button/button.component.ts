import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  type = input<'submit' | 'button'>()
  title = input<string>()
  icon = input<string>()
}
